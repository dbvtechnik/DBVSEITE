import { createClient } from "npm:@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const NOTIFICATION_EMAIL = "info@dbv-veranstaltungstechnik.de";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { inquiry } = await req.json();
    if (!inquiry || !inquiry.name || !inquiry.email) {
      return new Response(
        JSON.stringify({ error: "Missing inquiry data" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const subject = `Neue Anfrage: ${inquiry.package ?? "Event"} – ${inquiry.name}`;

    const bodyLines = [
      `Neue Anfrage über das Kontaktformular:`,
      ``,
      `Paket: ${inquiry.package ?? "—"}`,
      `Name: ${inquiry.name}`,
      `E-Mail: ${inquiry.email}`,
      inquiry.phone ? `Telefon: ${inquiry.phone}` : null,
      inquiry.event_date ? `Eventdatum: ${inquiry.event_date}` : null,
      inquiry.event_location ? `Event-Ort: ${inquiry.event_location}` : null,
      ``,
      `Nachricht:`,
      inquiry.message ?? "(keine Nachricht angegeben)",
      ``,
      `Diese Anfrage ist auch im Admin-Bereich unter /admin einsehbar.`,
    ].filter(Boolean);

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "DBV Veranstaltungstechnik <onboarding@resend.dev>",
        to: [NOTIFICATION_EMAIL],
        subject,
        text: bodyLines.join("\n"),
      }),
    });

    if (!emailResponse.ok) {
      const errText = await emailResponse.text();
      return new Response(
        JSON.stringify({ error: "Email send failed", detail: errText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
