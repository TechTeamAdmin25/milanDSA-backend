import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { ENV } from "./config/env";

const PORT = Number(process.env.PORT) || 8080;
const HOST = "0.0.0.0";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

app.listen(PORT, HOST, () => {
  console.log(
    `🚀 ${ENV.SERVICE_NAME} running in ${ENV.NODE_ENV} mode on port ${PORT}`
  );
});
