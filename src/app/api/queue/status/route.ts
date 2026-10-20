import { createStatusHandler } from "@/lib/registration/status-handler";
import { createStatusClientFromEnv } from "@/lib/registration/store";

export const dynamic = "force-dynamic";

const handle = createStatusHandler({
  client: createStatusClientFromEnv(),
  clinicId: process.env.CLINIC_LOCATION_ID?.trim() || "main",
});

export async function POST(request: Request) {
  return handle(request);
}
