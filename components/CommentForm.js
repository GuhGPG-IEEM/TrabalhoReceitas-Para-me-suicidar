// components/CommentForm.js

import { useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react'; // Hook para pegar o usuário logado
import { supabase } from '@/lib/supabaseClient';
import { Star } from 'lucide-react';

const CommentForm = ({ recipeId, onCommentAdded }) => {
  const user = useUser(); // Pega as informações do usuário atual
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Por favor, selecione uma avaliação de 1 a 5 estrelas.');
      return;
    }
    if (!content.trim()) {
      setError('Por favor, escreva um comentário.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const { data, error: insertError } = await supabase
        .from('comments')
        .insert({
          content: content,
          rating: rating,
          user_id: user.id, // ID do usuário logado
          recipe_id: recipeId, // ID da receita vindo das props
        })
        .select(`*, profiles(full_name, avatar_url)`) // Retorna o comentário com os dados do perfil
        .single();
      
      if (insertError) {
        throw insertError;
      }
      
      // Limpa o formulário
      setContent('');
      setRating(0);
      
      // Chama a função do componente pai para atualizar a lista de comentários em tempo real
      if (onCommentAdded) {
        onCommentAdded(data);
      }

    } catch (err) {
      console.error('Erro ao enviar comentário:', err);
      setError('Não foi possível enviar seu comentário. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  // Se o usuário não estiver logado, exibe uma mensagem
  if (!user) {
    return (
      <div className="p-4 border rounded-lg text-center bg-gray-100">
        <p className="text-gray-700">Você precisa estar logado para deixar uma avaliação.</p>
        {/* Futuramente, aqui pode ter um link para a página de login */}
      </div>
    );
  }

  // Se estiver logado, exibe o formulário
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sua Avaliação:</label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={24}
              className={`cursor-pointer transition-colors ${
                (hoverRating || rating) >= star
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Seu Comentário:</label>
        <textarea
          id="comment"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Compartilhe sua experiência com esta receita..."
        />
      </div>
      
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex justify-center rounded-lg border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400"
        >
          {submitting ? 'Enviando...' : 'Enviar Avaliação'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;