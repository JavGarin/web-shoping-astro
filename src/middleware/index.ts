import type { MiddlewareHandler } from 'astro';
import { supabase } from '../lib/supabase';

export const onRequest: MiddlewareHandler = async ({ locals, cookies }, next) => {
  const accessToken = cookies.get('sb-access-token');
  const refreshToken = cookies.get('sb-refresh-token');

  if (accessToken && refreshToken) {
    const { data, error } = await supabase.auth.setSession({
      refresh_token: refreshToken.value,
      access_token: accessToken.value,
    });

    if (error) {
      // Don't worry about errors here, supabase client will handle it
      cookies.delete('sb-access-token', { path: '/' });
      cookies.delete('sb-refresh-token', { path: '/' });
    }
    
    locals.user = data?.user ?? null;

    if(data?.session) {
        const { access_token, refresh_token } = data.session;

        cookies.set('sb-access-token', access_token, {
            path: '/',
            httpOnly: true,
            secure: import.meta.env.PROD,
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        cookies.set('sb-refresh-token', refresh_token, {
            path: '/',
            httpOnly: true,
            secure: import.meta.env.PROD,
            maxAge: 60 * 60 * 24 * 30 // 30 days
        });
    }
  } else {
    locals.user = null;
  }

  return next();
};
