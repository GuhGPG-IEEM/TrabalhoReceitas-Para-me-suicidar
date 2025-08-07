// pages/index.js

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import RecipeCard from '@/components/RecipeCard';
import SkeletonCard from '@/components/SkeletonCard';
import RecipeDetailModal from '@/components/RecipeDetailModal'; // Importe o novo modal

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('todos');

  // --- Estados para controlar o Modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleOpenModal = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipeId(null); // Limpa o ID ao fechar
  };
  // ------------------------------------

  const categories = ['todos', 'doce', 'salgado', 'fitness'];

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = supabase.from('recipes').select('*');
        if (filter !== 'todos') {
          query = query.eq('category', filter);
        }
        query = query.order('created_at', { ascending: false });
        const { data, error: fetchError } = await query;
        if (fetchError) throw fetchError;
        setRecipes(data || []);
      } catch (err) {
        console.error("Erro ao buscar receitas:", err);
        setError('Não foi possível carregar as receitas.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [filter]);

  return (
    <> {/* Usa um Fragment para agrupar elementos sem um div extra */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-text-primary">Descubra Sabores Incríveis</h1>
          <p className="mt-2 text-lg text-text-secondary">Filtre por categoria ou explore todas as nossas delícias.</p>
          <div className="mt-6 flex justify-center gap-2 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 text-sm sm:text-base font-medium rounded-full capitalize transition-colors
                  ${filter === category
                    ? 'bg-accent text-white shadow'
                    : 'bg-white text-text-secondary hover:bg-gray-200 border'
                  }`}
              >
                {category === 'todos' ? 'Todas' : category}
              </button>
            ))}
          </div>
        </div>
        <div>
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && (
            recipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recipes.map((recipe) => (
                  // Passa a função para o card
                  <RecipeCard key={recipe.id} recipe={recipe} onCardClick={handleOpenModal} />
                ))}
              </div>
            ) : (
              <p className="text-center text-text-secondary">Nenhuma receita encontrada para a categoria selecionada.</p>
            )
          )}
        </div>
      </div>

      {/* Renderiza o Modal aqui. Ele só ficará visível quando 'isModalOpen' for true */}
      <RecipeDetailModal
        isOpen={isModalOpen}
        closeModal={handleCloseModal}
        recipeId={selectedRecipeId}
      />
    </>
  );
};

export default HomePage;