// src/middleware/auth/auth_middleware.ts
import { Request, Response, NextFunction } from "express";
import { authMiddleware } from "../../config/auth";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Manually check for the header to provide a custom "Protected" message
  if (!req.headers.authorization) {
    return res.status(401).json({
      status: "error",
      message: "🔐 This is a protected route.",
      instruction:
        "Please use Swagger UI (at /docs) and use the 'Authorize' button with a valid Bearer token to access this data.",
    });
  }

  // 2. If header exists, let the Auth0/JWT middleware handle actual validation
  return authMiddleware(req, res, next);
};
