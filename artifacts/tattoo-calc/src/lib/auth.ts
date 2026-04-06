import { supabase } from "@/lib/supabase";

export async function register(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  if (!email.trim() || !password) {
    return { success: false, error: "Preencha todos os campos." };
  }
  if (password.length < 6) {
    return { success: false, error: "A senha deve ter pelo menos 6 caracteres." };
  }

  const { error } = await supabase.auth.signUp({ email: email.trim().toLowerCase(), password });
  if (error) {
    if (error.message.includes("already registered") || error.message.includes("already exists")) {
      return { success: false, error: "Este e-mail ja esta cadastrado." };
    }
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  if (!email.trim() || !password) {
    return { success: false, error: "Preencha todos os campos." };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });
  if (error) {
    return { success: false, error: "E-mail ou senha incorretos." };
  }
  return { success: true };
}

export async function logout(): Promise<void> {
  await supabase.auth.signOut();
}
