import app from "./app.js";
import { env } from "./config/env.js";

const PORT = Number(process.env.PORT ?? 5000);

app.listen(PORT, () => {
  console.log("🚀 AI Project Reviewer Lite Backend");
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🤖 Gemini Model: ${env.GEMINI_MODEL}`);
});