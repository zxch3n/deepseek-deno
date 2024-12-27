const OPENAI_API_URL = "https://api.deepseek.com";

// Helper function to add CORS headers
function addCorsHeaders(headers: Headers) {
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With",
  );
  headers.set("Access-Control-Max-Age", "86400");
  return headers;
}

async function handler(req: Request): Promise<Response> {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: addCorsHeaders(
        new Headers({
          "Content-Length": "0",
          "Content-Type": "text/plain",
        }),
      ),
    });
  }

  const url = new URL(req.url);
  const path = url.pathname;
  const textBody = await req.text();
  try {
    let bodyText = textBody;
    try {
      const body = JSON.parse(textBody);
      console.log("Request body:", JSON.stringify(body, null, 2));
      // Replace the model with deepseek-chat
      if (body.model) {
        const originalModel = body.model;
        body.model = "deepseek-chat";
        console.log(`Model changed from "${originalModel}" to "deepseek-chat"`);
      }
      bodyText = JSON.stringify(body);
    } catch (_) {
      bodyText = textBody;
    }

    // Forward the request to OpenAI
    console.log(`Forwarding request to ${OPENAI_API_URL}${path}`);
    const response = await fetch(`${OPENAI_API_URL}${path}`, {
      headers: req.headers,
      method: req.method,
      redirect: "follow",
      body: req.method === "GET" || req.method === "HEAD"
        ? undefined
        : bodyText,
    });

    // Create a new response with CORS headers while preserving the original response
    const responseHeaders = new Headers(response.headers);
    addCorsHeaders(responseHeaders);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "Unknown error occurred";
    console.error("Error occurred:", errorMessage);
    if (error instanceof Error && error.stack) {
      console.error("Stack trace:", error.stack);
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: addCorsHeaders(
        new Headers({
          "Content-Type": "application/json",
        }),
      ),
    });
  }
}

Deno.serve(handler);
