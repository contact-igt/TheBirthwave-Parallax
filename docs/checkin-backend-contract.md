# Check-in backend contract (numbering, tokens, queue)

The check-in app never creates a daily number, a patient token, a queue
position or a waiting time. The clinic's **approved, access-restricted backend**
owns all four and the app only validates and displays what it returns.
`tests/support/fake-backend.mjs` is an executable specification of these
semantics (used by the automated tests; it is not shipped).

All calls are `POST` over HTTPS with `Authorization: Bearer <token>`. Redirects are not followed.

## 1. Save a registration — `REGISTRATION_STORE_URL`

Request: `{ "record": RegistrationRecord, "idempotencyKey": "<uuid>", "clinicId": "main" }`
(`RegistrationRecord` is defined in `src/lib/registration/rules.ts`).

Response `200/201`:

```json
{
  "ok": true,
  "id": "BW-20261020-0018",
  "token": "Xk3_9fQ-aB7vLm2ZpR8sTw",
  "sequence": 18,
  "dayTotal": 18,
  "checkedInAt": "2026-10-20T07:40:00Z",
  "clinicDate": "2026-10-20",
  "clinicId": "main"
}
```

Required: `ok:true`, `id`. Everything else is optional; the app drops any field it
cannot verify and falls back to showing the reference `id`:

- `sequence` is shown only if it is an integer 1–99999, `checkedInAt` is a valid time,
  `clinicDate` equals the **Asia/Kolkata** date of `checkedInAt` **and** today's clinic date,
  and `clinicId` matches the app's `CLINIC_LOCATION_ID`.
- `dayTotal` is shown only if ≥ `sequence`.
- `token` must be ≥128 bits of CSPRNG output encoded as base64url
  (`^[A-Za-z0-9_-]{22,128}$`). Never derive it from the sequence, name, phone or time.

### Atomic daily numbering

Assign `sequence` **inside the same transaction** as the record insert, keyed by
`(clinic_id, clinic_date)` where `clinic_date` is the Asia/Kolkata calendar date
(it therefore resets at local midnight, not UTC midnight). The idempotency key is
unique, so a retry or refresh returns the same record and number and never
consumes a new one. Postgres reference:

```sql
create table registration_counters (
  clinic_id   text not null,
  clinic_date date not null,
  last_seq    integer not null default 0,
  primary key (clinic_id, clinic_date)
);

create table registrations (
  id               text primary key,                 -- e.g. BW-20261020-0018
  idempotency_key  text not null unique,
  clinic_id        text not null,
  clinic_date      date not null,
  sequence         integer not null,
  token_hash       bytea not null unique,            -- store only a hash of the token
  state            text not null default 'registered',
  queue_order      bigint generated always as identity,
  checked_in_at    timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  record           jsonb not null,                   -- encrypt at rest; restrict access
  unique (clinic_id, clinic_date, sequence)
);

-- one transaction per registration
begin;
-- Serialise identical retries so a duplicate can never consume a number.
select pg_advisory_xact_lock(hashtextextended($1, 0));      -- $1 = idempotency key

select * from registrations where idempotency_key = $1;      -- found? commit and return it unchanged

-- not found: take the next number for (clinic, IST date) atomically, then insert
insert into registration_counters (clinic_id, clinic_date, last_seq)
values ($2, (now() at time zone 'Asia/Kolkata')::date, 1)    -- $2 = clinic id
on conflict (clinic_id, clinic_date)
do update set last_seq = registration_counters.last_seq + 1
returning last_seq, clinic_date;                             -- row lock makes concurrent bumps queue up

insert into registrations (id, idempotency_key, clinic_id, clinic_date, sequence, token_hash, record)
values ('BW-' || to_char($clinic_date, 'YYYYMMDD') || '-' || lpad($last_seq::text, 4, '0'),
        $1, $2, $clinic_date, $last_seq, digest($3, 'sha256'), $4);   -- $3 = new token, $4 = record
commit;
```

`queue_order` (insertion order) is separate from `sequence`. Return the token only from the
transaction that created the record; a replayed request returns the stored receipt fields (without the token if only its hash is stored).
If the transaction fails the counter bump rolls back too, so no number is ever skipped or reused.

## 2. Patient status — `REGISTRATION_STATUS_URL` (optional)

Request `{ "token": "<token>" }` → `404` if unknown, else:

```json
{ "ok": true, "status": {
  "reference": "BW-20261020-0018", "sequence": 18, "dayTotal": 25,
  "checkedInAt": "2026-10-20T07:40:00Z", "clinicDate": "2026-10-20", "clinicId": "main",
  "state": "waiting", "updatedAt": "2026-10-20T07:55:00Z",
  "queue": { "live": true, "confirmedByStaff": true, "ahead": 3,
             "estimateMinutes": { "min": 15, "max": 30 }, "updatedAt": "2026-10-20T07:55:00Z" }
} }
```

`state` is one of `registered, checked_in, waiting, called, in_consultation, completed`.
Return **no** name, phone, concern, address or other patient's data.

`queue` may be sent only when staff manage the queue live. The app shows it only when
`live` and `confirmedByStaff` are both `true`, `ahead` is an integer 0–500 and
`updatedAt` is valid:

- `ahead` = patients genuinely ahead in **today's active queue** (`queue_order` of
  registered/checked-in/waiting patients before this one). It is never `sequence − 1`
  and never derived from `dayTotal`.
- `estimateMinutes` (optional, only while `state = waiting`) is a **broad range** computed from
  real operational data: patients ahead, clinic location, available clinician capacity and
  staff-confirmed status. Integers, `0 ≤ min ≤ max ≤ 240`. Omit it unless you can stand behind it;
  the patient then sees "Our reception team will update you".
- The 10–20 minutes in the patient copy describes a typical **consultation**, not waiting time;
  do not multiply registrations by it.

## 3. Staff queue — `QUEUE_ADMIN_URL` (optional)

- `{ "action": "list", "clinicId": "main", "clinicDate": "2026-10-20" }` →
  `{ "ok": true, "entries": [ { "id", "reference", "sequence", "displayName", "state", "checkedInAt", "updatedAt" } ] }`
- `{ "action": "update", "id": "<id>", "state": "<state>" }` → `{ "ok": true, "entry": { … } }`

`displayName` should be a first name only. Only the check-in app's authenticated staff console
calls this endpoint, with `QUEUE_ADMIN_TOKEN`.

## Security requirements for the backend

Encryption at rest, least-privilege access, audit log of staff state changes, token stored
hashed, no analytics/third-party calls, retention and deletion policy agreed with the clinic.
