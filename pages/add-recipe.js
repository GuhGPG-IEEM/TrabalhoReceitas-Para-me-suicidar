// pages/add-recipe.js

import { useState, useEffect } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';

const AddRecipePage = () => {
  const user = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('salgado');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Efeito para proteger a página
  useEffect(() => {
    // Se o estado de usuário já foi carregado e não há usuário...
    if (user === null) {
      router.push('/'); // Redireciona para a home
    } else if (user !== undefined) {
      // Se o usuário existe, para o carregamento
      setLoading(false);
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !category || !ingredients || !instructions) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      // Formata os ingredientes para o formato JSON
      const ingredientsJson = ingredients.split('\n').map(line => {
        const [quantity, ...itemParts] = line.split(' ');
        return { quantity: quantity || '', item: itemParts.join(' ') || '' };
      });

      const { data, error: insertError } = await supabase.from('recipes').insert({
        name,
        image_url: imageUrl,
        category,
        ingredients: ingredientsJson,
        instructions,
        author_id: user.id, // Associa a receita ao usuário logado
      }).select().single();

      if (insertError) throw insertError;

      // Redireciona para a página da nova receita
      router.push(`/recipe/${data.id}`);

    } catch (err) {
      console.error('Erro ao criar receita:', err);
      setError('Ocorreu um erro ao criar a receita. Tente novamente.');
      setSubmitting(false);
    }
  };

  // Se estiver carregando ou o usuário não foi verificado, mostra uma tela de espera
  if (loading) {
    return <div className="text-center py-20">Verificando autorização...</div>;
  }

  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
      <h1 className="font-heading text-4xl font-bold text-text-primary mb-8">Adicionar Nova Receita</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-secondary">Nome da Receita</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent" required />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-text-secondary">URL da Imagem (Opcional)</label>
          <input type="url" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-text-secondary">Categoria</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent" required>
            <option value="salgado">Salgado</option>
            <option value="doce">Doce</option>
            <option value="fitness">Fitness</option>
          </select>
        </div>
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-text-secondary">Ingredientes (um por linha, ex: "2 xícaras Farinha")</label>
          <textarea id="ingredients" rows={6} value={ingredients} onChange={(e) => setIngredients(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent" required />
        </div>
        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-text-secondary">Modo de Preparo</label>
          <textarea id="instructions" rows={10} value={instructions} onChange={(e) => setInstructions(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent" required />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <button type="submit" disabled={submitting} className="w-full rounded-md bg-accent px-4 py-3 text-base font-medium text-white transition-colors hover:bg-accent-hover disabled:bg-gray-400">
            {submitting ? 'Enviando...' : 'Publicar Receita'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipePage;