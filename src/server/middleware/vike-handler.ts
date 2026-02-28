import { renderPage } from "vike/server"
import type { Get, UniversalHandler } from "@universal-middleware/core"

const encoder = new TextEncoder()

export const vikeHandler: Get<[], UniversalHandler> =
  () => async (request, context, runtime) => {
    const { httpResponse, stream } = await renderPage({
      ...context,
      ...runtime,
      urlOriginal: request.url,
      headersOriginal: request.headers,
    })

    if (!httpResponse) return undefined as unknown as Response

    const { body, statusCode, headers } = httpResponse

    const readable = new ReadableStream<Uint8Array>({
      start(controller) {
        // write initial HTML immediately
        if (body) {
          controller.enqueue(encoder.encode(body))
        }

        // write lazy chunks as they resolve
        if (stream) {
          stream.on("data", (chunk) => controller.enqueue(chunk))
          stream.on("end", () => controller.close())
          stream.on("error", (err) => controller.error(err))
        } else {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      status: statusCode,
      headers,
    })
  }
