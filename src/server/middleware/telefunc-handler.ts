import { Telefunc, telefunc } from "telefunc"
import type { Get, UniversalHandler } from "@universal-middleware/core"

export const telefuncHandler: Get<[], UniversalHandler> =
  () => async (request, context, runtime) => {
    const { pathname } = new URL(request.url)
    const httpResponse = await telefunc({
      url: pathname,
      method: request.method,
      body: await request.text(),
      context: {
        ...(context as Telefunc.Context),
        ...runtime,
      },
    })
    const { body, statusCode, contentType } = httpResponse
    return new Response(body, {
      status: statusCode,
      headers: {
        "content-type": contentType,
      },
    })
  }
