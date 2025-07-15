export async function safeParseJSON<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    try {
      return (await response.json()) as T
    } catch {
      const text = await response.text()
      throw new Error(`Failed to parse JSON response: ${text}`)
    }
  }

  const text = await response.text()
  throw new Error(`Expected JSON response but got: ${text}`)
}

export async function getErrorMessage(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    try {
      const json = await response.json()
      return String(json.message || json.error || JSON.stringify(json))
    } catch {
      return await response.text()
    }
  }

  return await response.text()
}

export async function safeParseResponse<T>(
  response: Response,
): Promise<T | string> {
  const contentType = response.headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    try {
      return (await response.json()) as T
    } catch {
      return await response.text()
    }
  }

  return await response.text()
}
