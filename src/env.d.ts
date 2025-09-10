/// <reference types="astro/client" />

declare namespace App {
  interface Locals extends astroHTML.Locals {
    user: import('@supabase/supabase-js').User | null;
  }
}
