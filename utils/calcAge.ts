export function calcAge(date: Date) {
  const diff = Date.now() - date.getTime();
  const age = new Date(diff).getUTCFullYear() - 1970;
  return age;
}
