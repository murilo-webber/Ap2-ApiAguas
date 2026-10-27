# API das Águas — AP2

## Descrição

Projeto desenvolvido para a AP2, dando continuidade à AP1. A aplicação permite cadastrar, listar, consultar, atualizar e excluir registros de águas.

O backend utiliza ASP.NET Core com .NET 10, Entity Framework Core e SQLite. O frontend é servido pela própria aplicação e consome os endpoints reais da API.

## Tecnologias

- C# e ASP.NET Core (.NET 10)
- Entity Framework Core
- SQLite
- HTML, CSS e JavaScript
- Bruno ou Postman para testes HTTP

## Requisitos

- SDK do .NET 10
- Ferramenta `dotnet-ef` compatível com o EF Core utilizado
- Bruno ou Postman (para executar a Collection)

## Preparação e execução

1. Clone o repositório e entre na pasta do projeto:

```bash
cd ApiAguas
```

2. Restaure as dependências:

```bash
dotnet restore
```

3. Prepare o banco de dados a partir das migrations:

```bash
dotnet ef database update
```

> Se ainda não tiver a ferramenta instalada:
> ```bash
> dotnet tool install --global dotnet-ef --version 10.0.0
> ```

4. Compile a aplicação:

```bash
dotnet build
```

5. Inicie o backend:

```bash
dotnet run
```

6. Abra no navegador o endereço informado no terminal (geralmente `http://localhost:5080`). A interface é servida pela própria API.

## Rotas da API

| Método | Rota            | Resultado esperado   |
|--------|-----------------|----------------------|
| GET    | /api/aguas      | Lista os registros   |
| GET    | /api/aguas/{id} | Consulta por ID      |
| POST   | /api/aguas      | Cadastra um registro |
| PUT    | /api/aguas/{id} | Atualiza um registro |
| DELETE | /api/aguas/{id} | Exclui um registro   |

Códigos esperados: **201** na criação, **200** nas consultas e atualizações bem-sucedidas, **204** na exclusão e **404** quando o registro não existe.

## Banco de dados

A aplicação utiliza SQLite. O esquema é versionado por migrations do Entity Framework Core. Para preparar o banco em uma instalação nova, execute:

```bash
dotnet ef database update
```

O banco local de testes (`aguas.db`) **não** é versionado no repositório.

## Testes da API

A Collection do Bruno ou Postman deve ser colocada na pasta `Collection/`. Ela deve conter as requisições de criação, listagem, consulta por ID, atualização e exclusão.

## Vídeo de demonstração — AP2

Link público do vídeo: **COLE_AQUI_O_LINK_PUBLICO_DO_VIDEO**

O vídeo demonstra a execução da aplicação, os testes do CRUD no Bruno/Postman, as operações pela interface do navegador e a persistência dos dados após reiniciar a aplicação.

## Estrutura do projeto

```
ApiAguas/
├── Models/
│   └── AguaEntity.cs
├── Data/
│   └── ApiDbContext.cs
├── wwwroot/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── aguas.js
├── Collection/          ← cole aqui a collection do Bruno/Postman
├── Program.cs
├── appsettings.json
├── ApiAguas.csproj
└── README.md
```
# Ap2-ApiAguas
# Ap2-ApiAguas
# Ap2-ApiAguas
# Ap2-ApiAguas
# Ap2-ApiAguas
