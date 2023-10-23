export function validateEmail(mail) {
  const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  return regex.test(mail);
}
