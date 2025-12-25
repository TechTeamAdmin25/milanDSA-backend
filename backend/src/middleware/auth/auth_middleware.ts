import express from "express";
const app = express();
import { auth } from "express-oauth2-jwt-bearer";

const port = process.env.PORT || 8080;

const jwtCheck = auth({
  audience: "milanauthapi",
  issuerBaseURL: "https://dev-70t4tgy5bscjagaa.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// enforce on all endpoints
app.use(jwtCheck);

app.get("/authorized", function (req, res: any) {
  res.send("Secured Resource");
});

app.listen(port);

console.log("Running on port ", port);
