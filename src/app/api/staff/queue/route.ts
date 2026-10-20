import { handlers } from "@/lib/staff/instance";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return handlers.listQueue(request);
}

export async function POST(request: Request) {
  return handlers.updateQueue(request);
}
