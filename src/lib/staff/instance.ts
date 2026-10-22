import { createAdminClient } from "./admin";
import { loadStaffConfig } from "./auth";
import { createStaffHandlers } from "./handlers";

/** One process-wide set of handlers, built from the deployment's environment. */
export const staffConfig = loadStaffConfig();

export const handlers = createStaffHandlers({
  config: staffConfig,
  admin: staffConfig ? createAdminClient() : null,
  clinicId: process.env.CLINIC_LOCATION_ID?.trim() || "main",
});
