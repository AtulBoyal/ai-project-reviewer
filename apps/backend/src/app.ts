import express from "express";
import cors from "cors";

import analyzeRouter from "./routes/analyze.js";
import healthRouter from "./routes/health.js";
import progressRouter from "./routes/progress.js";
import multer from "multer";

const app = express();

/* ---------- Request Logger (TEMPORARY) ---------- */
app.use((req, _res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url}`,
  );

  next();
});
/* ----------------------------------------------- */

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:5173",
  }),
);

app.use(express.json());

app.use("/api", analyzeRouter);

app.use("/api/progress", progressRouter);

app.use("/api/health", healthRouter);

app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (
      err instanceof multer.MulterError &&
      err.code === "LIMIT_FILE_SIZE"
    ) {
      return res.status(413).json({
        success: false,
        error: "UPLOAD_TOO_LARGE",
        message:
          "Maximum upload size is 500 MB.",
      });
    }

    next(err);
  },
);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

export default app;