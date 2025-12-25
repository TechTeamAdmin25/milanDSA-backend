import { Router } from "express";
import { timeStamp } from "node:console";

const router = Router();
/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Auth check
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "auth-service",
    uptime: process.uptime(),
    timeStamp: new Date().toDateString(),
  });
});
export default router;
