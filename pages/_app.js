// pages/_app.js

import '@/styles/globals.css';
import { useState } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/components/layout/Header';
import { Montserrat, Lato } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

// Configuração das fontes
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
});

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => supabase);
  const router = useRouter();

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <div className={`${montserrat.variable} ${lato.variable} flex flex-col min-h-screen font-sans bg-background`}>
        <Header />

        {/* A tag <main> deve vir antes da animação */}
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {/* A animação envolve apenas o componente da página que está mudando */}
            <motion.div
              key={router.route}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </main>
        
      </div>
    </SessionContextProvider>
  );
}

export default MyApp;