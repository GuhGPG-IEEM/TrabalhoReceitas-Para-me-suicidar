// components/RecipeCard.js

import Image from 'next/image';
import { Star, Heart } from 'lucide-react';

// Agora o card recebe a propriedade 'onCardClick'
const RecipeCard = ({ recipe, onCardClick }) => {
  // Simulação de avaliação média
  const averageRating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);

  return (
    // Mudamos o Link para uma div com um evento de clique.
    <div
      onClick={() => onCardClick(recipe.id)}
      className="group block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white"
    >
      <div className="relative">
        <Image
          src={recipe.image_url || '/placeholder-image.jpg'}
          alt={`Foto da receita ${recipe.name}`}
          width={400}
          height={250}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        <button
          className="absolute top-3 right-3 p-2 bg-white/70 rounded-full backdrop-blur-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={(e) => {
            e.stopPropagation(); // Impede que o modal abra ao clicar no coração
            console.log('Favoritado!', recipe.id);
          }}
          aria-label="Adicionar aos favoritos"
        >
          <Heart className="h-5 w-5 text-gray-700 hover:fill-red-500 hover:text-red-500 transition-colors" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary truncate">{recipe.name}</h3>
        <div className="mt-2 flex items-center">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          <span className="ml-1 text-sm text-text-secondary">{averageRating}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;