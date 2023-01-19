import '@/styles/globals.css';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { CookiesProvider } from 'react-cookie';

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <CookiesProvider>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>ACA</title>
        <meta
          name="description"
          content="Projeto de estudo Next.js com Supabase"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}
