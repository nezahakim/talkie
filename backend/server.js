// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";
// import userRoutes from "./routes/users.js";
// import sessionRoutes from "./routes/sessions.js";
// import communityRoutes from "./routes/communities.js";
// import errorHandler from "./utils/errorHandler.js";
// import logger from "./utils/logger.js";

// const app = express();
// const PORT = process.env.PORT || 3010;

// app.set("trust proxy", 1);

// app.use(cors());
// app.use(helmet());
// app.use(express.json());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// app.use("/api/users", userRoutes);
// app.use("/api/sessions", sessionRoutes);
// app.use("/api/communities", communityRoutes);

// // Test endpoint for streaming
// app.get("/", (req, res) => {
//   res.sendFile(new URL("./test/index.html", import.meta.url).pathname);
// });

// app.use(errorHandler);

// app.listen(PORT, () => {
//   logger.info(`Server running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import userRoutes from "./routes/users.js";
import sessionRoutes from "./routes/sessions.js";
import communityRoutes from "./routes/communities.js";
import errorHandler from "./utils/errorHandler.js";
import logger from "./utils/logger.js";

const app = express();
const PORT = process.env.PORT || 3010;

app.set("trust proxy", 1);
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true, // Start with helmet's defaults
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
        scriptSrcElem: ["'self'", "https://cdn.jsdelivr.net"],
        scriptSrcAttr: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'", "wss:"],
      },
    },
  }),
);

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use("/api/users", userRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/communities", communityRoutes);

// Test endpoint for streaming
app.get("/", (req, res) => {
  res.sendFile(new URL("./test/index.html", import.meta.url).pathname);
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
