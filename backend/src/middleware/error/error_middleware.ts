import { Request, Response, NextFunction } from "express";

/* ──────────────────────────────────────────────
   🚫 METHOD NOT ALLOWED (NORMAL MIDDLEWARE)
   Used directly in routes
────────────────────────────────────────────── */
export const methodNotAllowed =
  (allowedMethods: string[]) =>
  (req: Request, res: Response, _next: NextFunction) => {
    return res.status(405).json({
      status: "error",
      type: "METHOD_NOT_ALLOWED",
      message: `Cannot ${req.method} ${req.originalUrl}`,
      allowedMethods,
      suggestion: "Check Swagger docs at /docs for the correct HTTP method.",
    });
  };

/* ──────────────────────────────────────────────
   💥 GLOBAL ERROR HANDLER (ERROR MIDDLEWARE)
   Used once in app.ts
────────────────────────────────────────────── */
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(`❌ Error on ${req.method} ${req.originalUrl}:`, err?.message);

  /**
   * 🔐 Authentication / Authorization Errors
   */
  if (err?.name === "UnauthorizedError" || err?.status === 401) {
    return res.status(401).json({
      status: "error",
      type: "AUTH_ERROR",
      message: "This is a protected route.",
      instruction: "Use Swagger UI (/docs) and provide a valid Bearer token.",
    });
  }

  /**
   * 🚫 Route Not Found
   */
  if (err?.status === 404) {
    return res.status(404).json({
      status: "error",
      type: "ROUTE_NOT_FOUND",
      message: `Cannot ${req.method} ${req.originalUrl}`,
      hint: "The route may exist but the HTTP method might be incorrect.",
      suggestion:
        "Check Swagger docs at /docs for the correct endpoint and method.",
    });
  }

  /**
   * 💥 Fallback (500)
   */
  return res.status(err?.status || 500).json({
    status: "error",
    type: "INTERNAL_ERROR",
    service: process.env.SERVICE_NAME || "backend-service",
    message: err?.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && { stack: err?.stack }),
  });
};
