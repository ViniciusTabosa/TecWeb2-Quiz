# Starion API

Esta API foi desenvolvida para gerenciar um jogo no formato QUIZ. Ela oferece funcionalidades para criar, ler, atualizar e excluir jogadores e personagens, além de consultar perguntas e alternativas do quiz, e também registrar pontuações e Ranking.

## Funcionalidades

- **Gestão de Jogadores:**
  - Registrar um novo jogador.
  - Buscar um jogador pelo nome.
  - Excluir um jogador por ID.
  - Login de jogador.

- **Gestão de Personagens:**
  - Selecionar e associar um personagem a um jogador.
  - Listar todos os personagens disponíveis.

- **Gestão de Quiz:**
  - Consultar todas as perguntas e alternativas do quiz.
 
- **Controle de Pontuação:**
  - Consultar o TOP 10 pontuações.
  - Consultar e Excluir o Score individual do jogador

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/taialves/StarionAPI.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd StarionAPI
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```

## Configuração

Antes de iniciar o servidor, configure as credenciais do banco de dados no arquivo `db.js` localizado no diretório raiz:

```javascript
import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "stariondb"
});
```
### Uso
Para iniciar a API, execute o comando abaixo:
```bash
npm start
```
### Documentação Completa
A documentação completa da API pode ser acessada através do Postman no seguinte link: https://documenter.getpostman.com/view/21508505/2sA3rxru1i

### Erros Comuns
- 400 Bad Request: Requisição inválida ou dados faltando.
- 401 Unauthorized: Credenciais incorretas.
- 404 Not Found: Recurso não encontrado.
- 500 Internal Server Error: Erro interno no servidor.

## Autor

- [Tailson Alves](https://github.com/taialves)





