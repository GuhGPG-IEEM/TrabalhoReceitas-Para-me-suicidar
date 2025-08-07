// pages/login.js

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // Se o login for bem-sucedido, redireciona para a home
      router.push('/');

    } catch (err) {
      console.error('Erro no login:', err);
      setError(err.message || 'E-mail ou senha inválidos.');
      setSubmitting(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    supabase.auth.signInWithOAuth({ provider });
  };

  return (
    <div className="container mx-auto max-w-md py-10 px-4">
      <h1 className="font-heading text-4xl font-bold text-text-primary mb-8 text-center">Fazer Login</h1>
      <form onSubmit={handleLogin} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-secondary">E-mail</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent" required />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-secondary">Senha</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent" required />
        </div>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        
        <div>
          <button type="submit" disabled={submitting} className="w-full rounded-md bg-accent px-4 py-3 text-base font-medium text-white transition-colors hover:bg-accent-hover disabled:bg-gray-400">
            {submitting ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-text-secondary">Ou continue com</span>
          </div>
        </div>

        <div>
          <button type="button" onClick={() => handleOAuthLogin('google')} className="w-full flex justify-center items-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-text-secondary shadow-sm hover:bg-gray-50">
            {/* Adicione um ícone do Google se desejar */}
            <span>Google</span>
          </button>
        </div>

        <div className="text-center text-sm">
          <p className="text-text-secondary">
            Não tem uma conta?{' '}
            <Link href="/register" className="font-medium text-accent hover:underline">
              Cadastre-se.
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;