export function padSingleCharWithZero(s: string) {
  if (s.length == 1) {
    return "0" + s;
  }
  return s;
}
