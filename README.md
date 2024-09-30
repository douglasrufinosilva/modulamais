### Uma api simples que permite criar registro de capivaras. Ela permite criar, ler, atualizao e deletar os registros (CRUD). Ela foi feita com NodeJs usando express, e MySQL no banco de dados.

### Para rodar essa aplicação você precisa:

-Node.js
-Gerenciados de pacotes npm

### Como obter o projeto.

**1 - git clone https://github.com/douglasrufinosilva/catalogo-teste.git
**2 - cd catalogo-teste/api
**3 - Instale as dependências (npm install)
**4 - npm run dev

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

