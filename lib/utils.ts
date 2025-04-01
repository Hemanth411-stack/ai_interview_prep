import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import Vapi from "@vapi-ai/web";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



let vapiInstance: any = null;

if (typeof window !== "undefined") { // Only initialize on client-side
  const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
  if (!apiKey) {
    console.error("VAPI_API_KEY is not set in environment variables");
  } else {
    vapiInstance = new Vapi(apiKey);
  }
}

export const vapi = vapiInstance;