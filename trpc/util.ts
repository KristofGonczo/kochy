import { DefaultErrorShape } from "@trpc/server/unstable-core-do-not-import";

export const getErrorMessage = (errorShape: DefaultErrorShape): string => {
  if (errorShape.data.code === "INTERNAL_SERVER_ERROR") {
    return "Internal server error";
  }

  try {
    const parsedMessage = JSON.parse(errorShape.message);
    if (
      Array.isArray(parsedMessage) &&
      parsedMessage.length > 0 &&
      Object.hasOwn(parsedMessage[0], "message")
    ) {
      return parsedMessage[0].message;
    }
  } catch {
    // Ignore JSON parse errors
  }

  return errorShape.message;
};
