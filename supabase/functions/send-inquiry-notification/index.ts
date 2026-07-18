import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RECIPIENT_EMAIL = "info@dbv-veranstaltungstechnik.de";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(data: {
  name: string;
  email: string;
  phone?: string;
  event_date?: string;
  event_location?: string;
  package: string;
  message?: string;
}): string {
  const rows = [
    { label: "Name", value: data.name },
    { label: "E-Mail", value: data.email },
    { label: "Telefon", value: data.phone || "nicht angegeben" },
    { label: "Eventdatum", value: data.event_date || "nicht angegeben" },
    { label: "Event-Ort", value: data.event_location || "nicht angegeben" },
    { label: "Paket", value: data.package },
    { label: "Nachricht", value: data.message || "keine Nachricht" },
  ];

  const rowsHtml = rows
    .map(
      (row) => `
        <tr>
          <td style="padding:8px 16px 8px 0;font-weight:600;color:#1a1a1a;vertical-align:top;white-space:nowrap;">${escapeHtml(row.label)}</td>
          <td style="padding:8px 0;color:#333;vertical-align:top;">${escapeHtml(row.value)}</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <tr>
          <td style="background:#0a0a0a;padding:24px 32px;">
            <span style="font-size:20px;font-weight:700;color:#ffffff;">DBV<span style="color:#e5b805;">.</span></span>
            <span style="font-size:13px;color:#a1a1aa;margin-left:12px;">Veranstaltungstechnik</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0a0a0a;">Neue Anfrage erhalten</h1>
            <p style="margin:0 0 24px;font-size:14px;color:#71717a;">Jemand hat das Kontaktformular auf Ihrer Website ausgefüllt.</p>
            <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;">
              ${rowsHtml}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px 24px;border-top:1px solid #e4e4e7;">
            <p style="margin:0;font-size:12px;color:#a1a1aa;">Diese E-Mail wurde automatisch von der DBV Veranstaltungstechnik Website generiert.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildEmailText(data: {
  name: string;
  email: string;
  phone?: string;
  event_date?: string;
  event_location?: string;
  package: string;
  message?: string;
}): string {
  return `Neue Anfrage - DBV Veranstaltungstechnik

Name: ${data.name}
E-Mail: ${data.email}
Telefon: ${data.phone || "nicht angegeben"}
Eventdatum: ${data.event_date || "nicht angegeben"}
Event-Ort: ${data.event_location || "nicht angegeben"}
Paket: ${data.package}
Nachricht: ${data.message || "keine Nachricht"}
`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "E-Mail-Service nicht konfiguriert (RESEND_API_KEY fehlt)" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();

    const required = ["name", "email", "package"];
    for (const field of required) {
      if (!body[field] || typeof body[field] !== "string" || !body[field].trim()) {
        return new Response(
          JSON.stringify({ error: `Feld "${field}" fehlt oder ist leer` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const inquiry = {
      name: body.name.trim(),
      email: body.email.trim(),
      phone: typeof body.phone === "string" ? body.phone.trim() : undefined,
      event_date: typeof body.event_date === "string" ? body.event_date.trim() : undefined,
      event_location: typeof body.event_location === "string" ? body.event_location.trim() : undefined,
      package: body.package.trim(),
      message: typeof body.message === "string" ? body.message.trim() : undefined,
    };

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "DBV Veranstaltungstechnik <onboarding@resend.dev>",
        to: [RECIPIENT_EMAIL],
        subject: `Neue Anfrage von ${inquiry.name} - ${inquiry.package}`,
        html: buildEmailHtml(inquiry),
        text: buildEmailText(inquiry),
      }),
    });

    if (!emailResponse.ok) {
      const errText = await emailResponse.text();
      return new Response(
        JSON.stringify({ error: "E-Mail-Versand fehlgeschlagen", details: errText }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const result = await emailResponse.json();

    return new Response(
      JSON.stringify({ success: true, messageId: result.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Interner Fehler", details: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
