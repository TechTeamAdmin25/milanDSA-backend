import fs from "fs";
import path from "path";
import { Application } from "express";

export const registerRoutes = (app: Application) => {
  const routesDir = path.join(__dirname, "../routes");

  fs.readdirSync(routesDir).forEach((folder) => {
    const tsRoute = path.join(routesDir, folder, "route.ts");
    const jsRoute = path.join(routesDir, folder, "route.js");

    const routeFile = fs.existsSync(tsRoute)
      ? tsRoute
      : fs.existsSync(jsRoute)
      ? jsRoute
      : null;

    if (!routeFile) {
      console.warn(`⚠️ No route file found in /${folder}`);
      return;
    }

    const imported = require(routeFile);

    // ✅ THIS IS THE IMPORTANT FIX
    const router = imported.default || imported;

    if (typeof router !== "function") {
      console.error(`❌ Invalid router export in /${folder}`);
      return;
    }

    app.use(`/${folder}`, router);
    console.log(`✅ Mounted /${folder}`);
  });
};
