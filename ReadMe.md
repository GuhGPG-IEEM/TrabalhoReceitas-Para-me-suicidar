**Instrução:** Substitua todo o conteúdo do seu arquivo `README.md` pelo texto completo abaixo.

````markdown
# 📚🍽️ Catálogo de Receitas Interativo

Um sistema web moderno e responsivo de catálogo de receitas, com foco na organização, filtragem e interação dos usuários com as receitas cadastradas. O projeto conta com um sistema de autenticação completo, cadastro de receitas por usuários e uma interface interativa com animações e feedback visual.

## ✨ Funcionalidades Implementadas

-   ✅ **Layout Profissional e Responsivo:** Design moderno com paleta de cores e tipografia personalizadas, adaptável a qualquer tamanho de tela.
-   ✅ **Sistema de Autenticação Completo:**
    -   Cadastro de novos usuários com Nome, E-mail e Senha.
    -   Login com E-mail/Senha e provedor OAuth (Google).
    -   Páginas dedicadas para `/login` e `/register`.
    -   Sistema de confirmação de e-mail gerenciado pelo Supabase.
-   ✅ **Cadastro de Receitas (Protegido):**
    -   Apenas usuários logados podem acessar o formulário para adicionar novas receitas.
    -   As receitas cadastradas são automaticamente associadas ao perfil do autor.
-   ✅ **Visualização Dinâmica:**
    -   Filtro de receitas por categoria (Doce, Salgado, Fitness) na página inicial.
    -   Ao clicar em uma receita, os detalhes são exibidos em uma **janela modal** fluida, sem a necessidade de navegar para outra página.
-   ✅ **Comentários e Avaliações:** Usuários logados podem avaliar e comentar nas receitas.
-   ✅ **UI Interativa:**
    -   Animações suaves de transição entre páginas.
    -   "Skeleton Loaders" para uma experiência de carregamento mais agradável.
    -   Micro-interações em botões e cards.

## 🛠️ Tecnologias Utilizadas

-   **Frontend:** [React](https://reactjs.org/) (com [Next.js](https://nextjs.org/))
-   **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI e Componentes:** [Headless UI](https://headlessui.com/) (para o modal)
-   **Animações:** [Framer Motion](https://www.framer.com/motion/)
-   **Backend & Banco de Dados:** [Supabase](https://supabase.com/) (Autenticação e Postgres)
-   **Hospedagem:** [Vercel](https://vercel.com/)

## 🚀 Como Executar o Projeto Localmente

#### 1. Pré-requisitos
-   [Node.js](https://nodejs.org/) (versão 18 ou superior)
-   Uma conta no [Supabase](https://supabase.com/)

#### 2. Instalação
```bash
# Clone o repositório
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)

# Navegue até a pasta do projeto
cd seu-repositorio

# Instale as dependências
npm install
````

#### 3\. Configuração do Supabase

  - **Crie um projeto no Supabase** e execute os scripts SQL fornecidos para criar as tabelas e o trigger de perfil de usuário.
  - **Ative os Provedores de Login:** No seu painel do Supabase, vá em `Authentication` \> `Providers` e ative os provedores que desejar (pelo menos **Email** e, opcionalmente, **Google**). Para o Google, você precisará configurar as credenciais no Google Cloud.

#### 4\. Variáveis de Ambiente

  - Crie um arquivo chamado `.env.local` na raiz do projeto.
  - Adicione suas chaves do Supabase (encontradas em "Project Settings" \> "API"):
    ```
    NEXT_PUBLIC_SUPABASE_URL=SUA_URL_DO_SUPABASE
    NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_DO_SUPABASE
    ```

#### 5\. Configuração de Imagens Externas

  - Abra o arquivo `next.config.js`.
  - Na seção `images.remotePatterns`, adicione os domínios das imagens que você pretende usar em suas receitas.
    ```javascript
    // Exemplo em next.config.js
    images: {
      remotePatterns: [
        { protocol: 'https', hostname: 'static.itdg.com.br' },
        { protocol: 'https', hostname: 'lirp.cdn-website.com' },
      ]
    }
    ```

#### 6\. Execute o Servidor de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) no seu navegador