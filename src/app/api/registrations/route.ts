import { createRegistrationHandler } from "@/lib/registration/handler";
import { createStoreFromEnv } from "@/lib/registration/store";

// Never statically optimised or cached: this carries confidential patient data.
export const dynamic = "force-dynamic";

// `createStoreFromEnv` returns null until every activation gate in
// docs/registration-deployment.md is satisfied, which makes POST answer 503.
const handle = createRegistrationHandler({
  store: createStoreFromEnv(),
  clinicId: process.env.CLINIC_LOCATION_ID?.trim() || "main",
});

export async function POST(request: Request) {
  return handle(request);
}
