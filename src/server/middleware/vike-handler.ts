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
      async start(controller) {
        // write initial HTML immediately
        if (body) {
          controller.enqueue(encoder.encode(body))
        }

        // write lazy chunks as they resolve
        if (stream) {
          try {
            const reader = stream.getReader()
            while (true) {
              const { done, value } = await reader.read()
              if (done) break
              controller.enqueue(
                typeof value === "string" ? encoder.encode(value) : value
              )
            }
          } catch (err) {
            controller.error(err)
          } finally {
            controller.close()
          }
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
