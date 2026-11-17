import { DefaultErrorShape } from "@trpc/server/unstable-core-do-not-import";
import { getTranslations } from "next-intl/server";

export type BackendServerTranslator = Awaited<
  ReturnType<typeof getTranslations<"Backend">>
>;
export type BackendKey = Parameters<BackendServerTranslator>[0];

export const getErrorMessage = (
  errorShape: DefaultErrorShape,
  t?: BackendServerTranslator,
): string => {
  if (errorShape.data.code === "INTERNAL_SERVER_ERROR") {
    return t?.("internalServerError") || "Internal server error";
  }

  try {
    const parsedMessage = JSON.parse(errorShape.message);
    if (
      Array.isArray(parsedMessage) &&
      parsedMessage.length > 0 &&
      Object.hasOwn(parsedMessage[0], "message")
    ) {
      return t?.(parsedMessage[0].message) || "Internal server error";
    }
  } catch {
    // Ignore JSON parse errors
  }

  return t?.(errorShape.message as BackendKey) || "Internal server error";
};
