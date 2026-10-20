import { handlers } from "@/lib/staff/instance";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handlers.login(request);
}
