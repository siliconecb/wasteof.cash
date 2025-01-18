// @ts-nocheck
import { json } from "@sveltejs/kit";

export async function GET() {
  const fetch = await import("node-fetch").then((m) => m.default);
  return json({ message: "hello, world!" }, 200);
}
