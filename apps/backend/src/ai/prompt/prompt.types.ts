export interface PromptSpec {
  systemInstruction: string;
  userInstruction: string;

  responseMimeType: "application/json";
}