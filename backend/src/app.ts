// src/app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { registerRoutes } from "./utils/routeReg";
import { setupSwagger } from "./config/swagger";
import { ENV } from "./config/env";
import { debugAuthHeader } from "./middleware/debugAuth";
import { errorMiddleware } from "./middleware/error/error_middleware";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.status(200).json({
    service: ENV.SERVICE_NAME,
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

if (ENV.NODE_ENV !== "production") {
  setupSwagger(app);
  app.use(debugAuthHeader);
}

// Register API Routes
registerRoutes(app);

/* ------------------------------
   404 & Error Handlers (MUST BE LAST)
-------------------------------- */

// 1. Catch-all for undefined routes
app.use((req, _res, next) => {
  const error: any = new Error(`Route ${req.originalUrl} not found`);
  error.status = 404;
  next(error);
});

// 2. Global Error Middleware
app.use(errorMiddleware);

export default app;
