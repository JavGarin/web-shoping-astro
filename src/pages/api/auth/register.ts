import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email y contraseña son requeridos' }), { status: 400 });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  // Supabase sends a confirmation email. We can let the user know.
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return new Response(JSON.stringify({ message: 'El usuario ya existe. Por favor, inicia sesión.' }), { status: 409 });
  }

  return new Response(JSON.stringify({ message: '¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.' }), { status: 200 });
};