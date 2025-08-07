// components/RecipeDetailModal.js

import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import { X } from 'lucide-react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const RecipeDetailModal = ({ isOpen, closeModal, recipeId }) => {
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para adicionar um novo comentário à lista em tempo real
  const handleCommentAdded = (newComment) => {
    setComments((currentComments) => [newComment, ...currentComments]);
  };

  useEffect(() => {
    // Busca os detalhes da receita apenas se um ID for fornecido
    const fetchRecipeDetails = async () => {
      if (!recipeId) return;

      setLoading(true);
      setError(null);
      setRecipe(null); // Limpa a receita anterior

      try {
        // 1. Busca os dados da receita
        const { data: recipeData, error: recipeError } = await supabase
          .from('recipes')
          .select('*, profiles (full_name)')
          .eq('id', recipeId)
          .single();

        if (recipeError) throw recipeError;
        setRecipe(recipeData);

        // 2. Busca os comentários da receita
        const { data: commentsData, error: commentsError } = await supabase
          .from('comments')
          .select('*, profiles (full_name, avatar_url)')
          .eq('recipe_id', recipeId)
          .order('created_at', { ascending: false });

        if (commentsError) throw commentsError;
        setComments(commentsData || []);

      } catch (err) {
        console.error('Erro ao buscar detalhes da receita:', err);
        setError('Não foi possível carregar os detalhes desta receita.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]); // Roda sempre que o ID da receita mudar

  // Função segura para renderizar o modo de preparo
  const renderInstructions = () => {
    if (!recipe?.instructions) return <p>Nenhum modo de preparo listado.</p>;
    return recipe.instructions.split('\n').map((line, index) => (
      <p key={index} className="mb-4 last:mb-0">{line}</p>
    ));
  };


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Backdrop (fundo escuro) */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
                  aria-label="Fechar"
                >
                  <X size={24} />
                </button>
                
                {loading && <div className="text-center py-20">Carregando receita...</div>}
                {error && <div className="text-center py-20 text-red-500">{error}</div>}

                {recipe && (
                  <>
                    <Dialog.Title as="h3" className="text-3xl font-heading font-bold leading-6 text-text-primary pr-12">
                      {recipe.name}
                    </Dialog.Title>
                    <div className="mt-4 max-h-[75vh] overflow-y-auto pr-4">
                      {/* Conteúdo da receita */}
                      <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden my-4">
                        <Image
                          src={recipe.image_url || '/placeholder-image.jpg'}
                          alt={`Foto da receita ${recipe.name}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1 bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="text-xl font-heading font-bold mb-3 text-text-primary">Ingredientes</h4>
                          <ul className="space-y-2 text-text-secondary">
                            {recipe.ingredients?.map((ing, index) => (
                              <li key={index}><span className="font-bold">{ing.quantity}</span> {ing.item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="text-xl font-heading font-bold mb-3 text-text-primary">Modo de Preparo</h4>
                          <div className="text-text-secondary leading-relaxed">
                            {renderInstructions()}
                          </div>
                        </div>
                      </div>
                      
                      {/* Seção de Comentários */}
                      <div className="mt-8">
                        <h4 className="text-2xl font-heading font-bold mb-4 text-text-primary">Comentários</h4>
                        <div className="bg-white p-4 rounded-lg shadow-sm space-y-6">
                          <CommentForm recipeId={recipe.id} onCommentAdded={handleCommentAdded} />
                          <CommentList comments={comments} />
                        </div>
                      </div>

                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RecipeDetailModal;