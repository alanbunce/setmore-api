export function queryStringify(obj: Record<string, any>) {
  return Object.entries(obj)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => key + "=" + encodeURIComponent(typeof value === "string" ? value : JSON.stringify(value)))
    .join("&");
}
