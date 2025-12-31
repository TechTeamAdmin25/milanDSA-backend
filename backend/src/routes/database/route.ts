import { Router } from "express";
import { requireAuth } from "../../middleware/auth/auth_middleware";
import { methodNotAllowed } from "../../middleware/error/error_middleware";
import { syncUserController } from "../../controllers/database/database_controller";

const router = Router();

/**
 * @swagger
 * /database/sync-user:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Sync Auth0 user into database
 *     responses:
 *       200:
 *         description: User synced successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Method not allowed
 *     responses:
 *       405:
 *         description: Method Not Allowed
 */
router.post("/sync-user", requireAuth, syncUserController);

// 🔐 Catch accidental browser GET / PUT / DELETE
router.all("/sync-user", methodNotAllowed(["POST"]));

export default router;
