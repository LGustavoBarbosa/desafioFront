# GitHub Get Stars

Esta aplicação permite que você obtenha a contagem de estrelas de repositórios no GitHub.

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/github-get-stars.git
   cd github-get-stars
   ```

2. Instale as dependências:
   ```sh
   npm install --legacy-peer-deps --force
   ```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto e adicione suas chaves de API do GitHub:

   ```plaintext
   VITE_OPENAI_API_KEY=OPENAI_API_KEY
   ```

Após fazer login:

1.  Acesse o site da OpenAI: https://platform.openai.com/.
2.  Clique em Sign up para criar sua conta ou Log in se já tiver uma.
3.  Vá para o painel em https://platform.openai.com/account/api-keys.
4.  Aqui você verá a seção para gerenciar suas API keys.

## Uso

1. Execute a aplicação:

   ```sh
   npm start
   ```

2. Acesse `http://localhost:5173/` no seu navegador para ver a aplicação em ação.

## Testes

1. Para rodar os testes, use o comando:

   ```sh
   npm test
   ```

   Certifique-se de que todas as dependências de desenvolvimento estão instaladas.

Pronto! Agora você pode usar a aplicação para obter a contagem de estrelas dos repositórios no GitHub.
