// @ts-nocheck
import { json } from "@sveltejs/kit";
import fetch from "node-fetch";

export async function GET() {
  try {
    const response = await fetch("https://ineedtotouchgrass.wasteof.me/");
    if (!response.ok) {
      return json({ error: "0/0/0" }, response.status);
    }
    const data = await response.json();
    return json(data, response.status);
  } catch (error) {
    console.error(error);
    return json({ error: "error :(" }, 500);
  }
}
