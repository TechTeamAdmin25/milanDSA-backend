import { Express } from "express";
import fs from "fs";
import path from "path";

export const registerRoutes = (app: Express) => {
  const routesPath = path.join(__dirname, "..", "routes");
  console.log("Registering routes from:", routesPath);

  fs.readdirSync(routesPath).forEach((routeFolder) => {
    const routeFile = path.join(routesPath, routeFolder, "route");

    if (
      !fs.existsSync(routeFile + ".ts") &&
      !fs.existsSync(routeFile + ".js")
    ) {
      return;
    }

    const router = require(routeFile).default;

    if (!router) {
      console.warn(`⚠️ No default export in ${routeFolder}/route.ts`);
      return;
    }

    app.use(`/${routeFolder}`, router);
    console.log(`✅ Mounted /${routeFolder}`);
  });
};
