import fs from "node:fs/promises";
import path from "node:path";

import { LOG_DIRECTORY } from "./logger.constants.js";

import type {
  LogEntry,
} from "./logger.types.js";

class LoggerService {
  private sessionDirectory = "";

  async startSession() {
    const timestamp = new Date()
      .toISOString()
      .replace(/:/g, "-");

    this.sessionDirectory = path.join(
      LOG_DIRECTORY,
      timestamp,
    );

    await fs.mkdir(
      this.sessionDirectory,
      {
        recursive: true,
      },
    );
  }

  private async write(
    file: string,
    entry: LogEntry,
  ) {
    const line = [
      `[${new Date().toISOString()}]`,
      `[${entry.level}]`,
      entry.message,
      "",
      entry.data
        ? JSON.stringify(
            entry.data,
            null,
            2,
          )
        : "",
      "",
    ].join("\n");

    await fs.appendFile(
      path.join(
        this.sessionDirectory,
        file,
      ),
      line,
    );
  }

  async info(
    message: string,
    data?: unknown,
  ) {
    await this.write("app.log", {
      level: "INFO",
      message,
      data,
    });
  }

  async warn(
    message: string,
    data?: unknown,
  ) {
    await this.write("app.log", {
      level: "WARN",
      message,
      data,
    });
  }

  async error(
    message: string,
    data?: unknown,
  ) {
    await this.write("error.log", {
      level: "ERROR",
      message,
      data,
    });
  }

  async prompt(prompt: string) {
    await fs.writeFile(
      path.join(
        this.sessionDirectory,
        "prompt.txt",
      ),
      prompt,
    );
  }

  async geminiResponse(
    response: unknown,
  ) {
    await fs.writeFile(
      path.join(
        this.sessionDirectory,
        "gemini-response.json",
      ),
      JSON.stringify(
        response,
        null,
        2,
      ),
    );
  }

  async validatedReport(
    report: unknown,
  ) {
    await fs.writeFile(
      path.join(
        this.sessionDirectory,
        "validated-report.json",
      ),
      JSON.stringify(
        report,
        null,
        2,
      ),
    );
  }

  async markdown(
    markdown: string,
  ) {
    await fs.writeFile(
      path.join(
        this.sessionDirectory,
        "engineering-report.md",
      ),
      markdown,
    );
  }
}

export const logger =
  new LoggerService();