export function isAuthenticated() {
  return sessionStorage.getItem("adminAuth") === "true";
}

export function login() {
  sessionStorage.setItem("adminAuth", "true");
}

export function logout() {
  sessionStorage.removeItem("adminAuth");
}
