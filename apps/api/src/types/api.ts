type ErrorCode =
  "USER_NOT_FOUND" | "CHAT_NOT_FOUND" | "MESSAGE_NOT_FOUND" | "INVALID_BODY"

type Error = { code: ErrorCode, message: string }
export type Response = { ok: boolean, data: object | null, error: Error | null }
