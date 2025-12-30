// src/middleware/error/error_middleware.ts
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(`❌ Error on ${req.method} ${req.url}:`, err.message);

  // Handle specific Auth0 / JWT Errors
  if (err.name === "UnauthorizedError" || err.status === 401) {
    return res.status(401).json({
      status: "error",
      message: "🔐 This is a protected route.",
      instruction:
        "Please use Swagger UI (at /docs) with a valid Bearer token to access this data.",
    });
  }

  // Handle standard 404 (if manually forwarded) or other 500 errors
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: "error",
    service: process.env.SERVICE_NAME || "backend-service",
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
