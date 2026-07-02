import app from "./app.js";
import { env } from "./config/env.js";

const PORT = Number(process.env.PORT ?? 5000);

app.listen(PORT, () => {
  console.log("🚀 AI Project Reviewer Backend");
  console.log(`🚪 Listening on port ${PORT}`);
  console.log(`🤖 Gemini Model: ${env.GEMINI_MODEL}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV ?? "development"}`);
});