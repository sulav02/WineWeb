import { createRes } from "../utils/message.js";

export const asyncHandler = (expressHandler) => {
  return async function oakHandler(context) {
    const body = context.request.hasBody === true ? await context.request.body.json() : {};

    // Simulate `req` and `res`
    const req = {
      body: body,
      headers: context.request.headers,
      method: context.request.method,
      url: context.request.url,
      params: context.params,
      query: Object.fromEntries(context.request.url.searchParams),
      raw: context.request
    };

    // Create res object tied to Oak context
    const res = createRes(context);

    // Call your handler with (req, res, context)
    await expressHandler(req, res, context);
  };
}

export const authAsyncHandler = (handler) => {
  return async (context, next) => {
    const body = context.request.hasBody === true ? await context.request.body.json() : {};

    const req = {
      body: body,
      headers: context.request.headers,
      method: context.request.method,
      url: context.request.url,
      params: context.params,
      query: Object.fromEntries(context.request.url.searchParams),
      raw: context.request,
    };

    const res = createRes(context);

    // Define next function that calls Oak's next middleware
    const customNext = async () => {
      await next();  // continue Oak middleware chain
    };

    try {
      // Pass req, res, and next to your handler
      await handler(req, res, customNext);
    } catch (err) {
      // Global error handling, send 500 if unhandled
      console.error("Middleware error:", err);
      context.response.status = 500;
      context.response.body = {
        success: false,
        message: "Internal Server Error",
      };
    }
  };
};


export default asyncHandler;
