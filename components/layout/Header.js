// components/layout/Header.js

import Link from 'next/link';
import { PlusCircle, LogOut } from 'lucide-react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const Header = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.push('/'); // Redireciona para a home após o logout
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-heading font-bold tracking-tight text-text-primary">
            📚🍽️ Catálogo de Receitas
          </span>
        </Link>

        {/* --- Lado Direito do Cabeçalho --- */}
        <div className="flex items-center gap-4">
          {user ? (
            // Se o usuário ESTIVER logado
            <>
              <Link href="/add-recipe" className="flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
                <PlusCircle size={18} />
                <span>Adicionar Receita</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-gray-200"
                aria-label="Sair"
              >
                <LogOut className="h-6 w-6 text-text-secondary" />
              </button>
            </>
          ) : (
            // Se o usuário NÃO ESTIVER logado (ESTA PARTE FOI ALTERADA)
            <>
              <Link href="/login">
                <span className="rounded-md border border-accent px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white">
                  Login
                </span>
              </Link>
              <Link href="/register">
                <span className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
                  Cadastre-se
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
