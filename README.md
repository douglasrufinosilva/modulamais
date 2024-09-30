### Uma api simples que permite criar registro de capivaras. Ela permite criar, ler, atualizao e deletar os registros (CRUD). Ela foi feita com NodeJs usando express, e MySQL no banco de dados.

### Para rodar essa aplicação você precisa:

-Node.js
-Gerenciados de pacotes npm

### Como obter o projeto.

- git clone https://github.com/douglasrufinosilva/catalogo-teste.git
- cd api
- Instale as dependências (npm install)
- Tenha o mysql instalado, e inclua os dados do seu banco no arquivo .env
- O .env.example mostra um exemplo das variaveis que devem ser criadas para passar as informações. Crie um arquivo .env e insira elas.
- O projeto inclui uma função que cria automaticamente a tabela caso ela não exista. Mas se certique de que tem um schema criado, que é a informação que voce vai incluir no 'DB_DATABASE' incluso no .env
- npm run dev

- Obs: Caso tenha problemas em puxar a tabela automaticamente, vou deixar um exemplo da tabela no .env.

- Obs2: Lembre se de colocar a mesma rota (Ex: http://localhost:3000) na aplicação front end para poder integrar de forma correta, ela tambem vai conter um .env para incluir a url, 'BASE_URL'.

### EndPoints

GET /
Retorna todos os registros de capivaras. Cada capivara pode conter uma imagem em base64.

GET /detalhes/:id
Retorna detalhes de uma capivara específica por ID.

GET /habitat
Retorna uma lista de habitats distintos encontrados nos registros de capivaras.

POST /
Cria um novo registro de capivara. Para enviar uma imagem de perfil, utilize o campo fotoPerfil como multipart/form-data.

PUT /detalhes/:id
Atualiza um registro de capivara específico por ID. Também aceita um campo de imagem fotoPerfil.

DELETE /:id
Deleta um registro de capivara específico por ID.

