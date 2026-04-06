const USERS_KEY = "tattoo_calc_users";
const SESSION_KEY = "tattoo_calc_session";

interface User {
  email: string;
  passwordHash: string;
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

function loadUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function register(email: string, password: string): { success: boolean; error?: string } {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password) {
    return { success: false, error: "Preencha todos os campos." };
  }
  if (password.length < 6) {
    return { success: false, error: "A senha deve ter pelo menos 6 caracteres." };
  }
  const users = loadUsers();
  if (users.find((u) => u.email === normalizedEmail)) {
    return { success: false, error: "Este e-mail ja esta cadastrado." };
  }
  users.push({ email: normalizedEmail, passwordHash: simpleHash(password) });
  saveUsers(users);
  setSession(normalizedEmail);
  return { success: true };
}

export function login(email: string, password: string): { success: boolean; error?: string } {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password) {
    return { success: false, error: "Preencha todos os campos." };
  }
  const users = loadUsers();
  const user = users.find(
    (u) => u.email === normalizedEmail && u.passwordHash === simpleHash(password)
  );
  if (!user) {
    return { success: false, error: "E-mail ou senha incorretos." };
  }
  setSession(normalizedEmail);
  return { success: true };
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

function setSession(email: string): void {
  sessionStorage.setItem(SESSION_KEY, email);
}

export function getSession(): string | null {
  return sessionStorage.getItem(SESSION_KEY);
}

export function isLoggedIn(): boolean {
  return !!getSession();
}
