// pages/register.js (Versão Melhorada com Verificação de Usuário)

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const RegisterPage = () => {
  const user = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      router.push('/'); 
    } else if (user === null) {
      setLoading(false);
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (signUpError) throw signUpError;
      
      if (data.user) {
        setSuccess(true);
      }

    } catch (err) {
      console.error('Erro no cadastro:', err);
      setError(err.message || 'Ocorreu um erro. Verifique seus dados e tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-text-secondary">Carregando...</div>;
  }

  return (
    <div className="container mx-auto max-w-md py-10 px-4">
      <h1 className="font-heading text-4xl font-bold text-text-primary mb-8 text-center">Criar Conta</h1>
      
      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center">
          <h2 className="font-bold text-lg">Cadastro realizado com sucesso!</h2>
          <p className="mt-2">Enviamos um link de confirmação para o seu e-mail. Por favor, verifique sua caixa de entrada para ativar sua conta.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-text-secondary">Nome Completo</label>
            <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary">E-mail</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary">Senha (mínimo 6 caracteres)</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent" required />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <button type="submit" disabled={submitting} className="w-full rounded-md bg-accent px-4 py-3 text-base font-medium text-white transition-colors hover:bg-accent-hover disabled:bg-gray-400">
              {submitting ? 'Cadastrando...' : 'Criar minha conta'}
            </button>
          </div>
          <div className="text-center text-sm">
            <p className="text-text-secondary">
              Já tem uma conta?{' '}
              <Link href="/login" className="font-medium text-accent hover:underline">
                Faça Login.
              </Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;