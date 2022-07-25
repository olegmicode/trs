export function truncate(str, length = 160) {
  let trimmedString = str.substr(0, length);
  
  //re-trim if we are in the middle of a word
  trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
  return str.length > length ? `${trimmedString}...` : str
}
