// components/SkeletonCard.js

const SkeletonCard = () => {
    return (
      // 'animate-pulse' cria o efeito de pulsação
      <div className="rounded-lg shadow-lg overflow-hidden animate-pulse bg-white">
        {/* Imagem de placeholder */}
        <div className="w-full h-48 bg-gray-300"></div>
        
        {/* Conteúdo de placeholder */}
        <div className="p-4">
          <div className="h-6 w-3/4 mb-3 bg-gray-300 rounded"></div>
          <div className="h-5 w-1/4 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  };
  
  export default SkeletonCard;