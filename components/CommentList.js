// components/CommentList.js

import Image from 'next/image';
import { Star } from 'lucide-react';

// Componente para renderizar uma única estrela, preenchida ou não
const RatingStar = ({ filled }) => (
  <Star
    size={16}
    className={`
      ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
    `}
  />
);

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-500">Ainda não há comentários. Seja o primeiro a avaliar!</p>;
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start space-x-4">
          {/* Avatar do Usuário */}
          <div className="flex-shrink-0">
            <Image
              src={comment.profiles?.avatar_url || '/default-avatar.png'} // Imagem de avatar padrão
              alt={`Avatar de ${comment.profiles?.full_name || 'Usuário'}`}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>

          {/* Conteúdo do Comentário */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-800">
                {comment.profiles?.full_name || 'Usuário Anônimo'}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(comment.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>

            {/* Avaliação em Estrelas */}
            <div className="flex items-center my-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <RatingStar key={star} filled={star <= comment.rating} />
              ))}
            </div>

            {/* Texto do Comentário */}
            <p className="text-gray-600">
              {comment.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;