"use client";

import { track } from "@vercel/analytics";

export type ConversionEvent = "whatsapp_click" | "quote_submit_success" | "quote_submit_error";
export type ConversionSource = "header" | "mobile_menu" | "mobile_sticky" | "quote_form" | "quote_error";

export function trackConversion(event: ConversionEvent, source: ConversionSource) {
  try {
    track(event, { source });
  } catch {
    // Analytics must never block the conversion flow.
  }
}
