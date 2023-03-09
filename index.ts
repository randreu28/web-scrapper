import { serve } from "https://deno.land/std@0.157.0/http/server.ts";
import {
  DOMParser,
  HTMLDocument,
} from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";

async function handler(_request: Request): Promise<Response> {
  const urlRequest = new URL(_request.url);

  const url = urlRequest.searchParams.get("url");
  const filterType = urlRequest.searchParams.get("filter-type");
  const fitler = urlRequest.searchParams.get("filter");

  if (!url || !filterType || !fitler) {
    return new Response(
      JSON.stringify({
        error: "Please provide the required search parameters",
      }),
      {
        status: 400,
      }
    );
  }
  let dom: HTMLDocument | null;

  try {
    const rawData = await fetch(url);
    const data = await rawData.text();
    dom = new DOMParser().parseFromString(data, "text/html");

    if (!dom) {
      return new Response(
        JSON.stringify({
          error: "The url provided is not valid",
        }),
        {
          status: 400,
        }
      );
    }
  } catch {
    return new Response(
      JSON.stringify({
        error: "The url provided is not valid",
      }),
      {
        status: 400,
      }
    );
  }

  switch (filterType) {
    case "id": {
      const scraps = dom.getElementById(fitler)?.textContent;

      return new Response(JSON.stringify(scraps), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });
    }

    case "class": {
      const scraps = dom
        .getElementsByClassName(fitler)
        .map((e) => e.textContent);

      return new Response(JSON.stringify(scraps), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });
    }

    case "tag": {
      const scraps = dom.getElementsByTagName(fitler).map((e) => e.textContent);

      return new Response(JSON.stringify(scraps), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });
    }

    default:
      return new Response(
        JSON.stringify({
          error: "The filter type provided is not valid",
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        }
      );
  }
}

serve(handler);
