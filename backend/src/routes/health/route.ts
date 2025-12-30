import { Router, Request, Response } from "express";

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Sanity health check
 *     description: >
 *       Liveness endpoint. Does not call database or external services.
 *     responses:
 *       200:
 *         description: Service is up
 */
router.get("/", (_req: Request, res: Response) => {
  const hasSupabase =
    Boolean(process.env.SUPABASE_URL) && Boolean(process.env.SUPABASE_ANON_KEY);

  const hasAuth0 =
    Boolean(process.env.AUTH0_AUDIENCE) &&
    Boolean(process.env.AUTH0_ISSUER_BASE_URL) &&
    Boolean(process.env.AUTH0_TOKEN_ALG);

  res.status(200).json({
    status: "ok",
    service: "milanDSA-backend",
    environment: process.env.NODE_ENV ?? "development",
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),

    services: {
      api: {
        status: "up",
      },

      database: {
        provider: "supabase",
        configured: hasSupabase,
        status: hasSupabase ? "configured" : "missing_env",
      },

      auth: {
        provider: "auth0",
        configured: hasAuth0,
        status: hasAuth0 ? "configured" : "missing_env",
      },
    },
  });
});

export default router;
