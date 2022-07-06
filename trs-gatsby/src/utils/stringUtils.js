export function truncate(str, length = 160) {
  return str.length > 10 ? str.substring(0, length) : str
}
