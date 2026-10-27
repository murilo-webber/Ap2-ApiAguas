# Collection Bruno / Postman — API das Águas

Coloque aqui o arquivo da Collection exportado do Bruno ou do Postman.

## Rotas para testar

Base URL (exemplo): `http://localhost:5080`

| Método | Endpoint          | Body (JSON)                                      | Status esperado |
|--------|-------------------|--------------------------------------------------|-----------------|
| POST   | /api/aguas        | `{ "marca": "Água Teste", "volume": 500, "tipo": "Mineral" }` | 201 |
| GET    | /api/aguas        | —                                                | 200 |
| GET    | /api/aguas/1      | —                                                | 200 ou 404      |
| PUT    | /api/aguas/1      | `{ "marca": "Nova Marca", "volume": 750, "tipo": "Com gás" }` | 200 |
| DELETE | /api/aguas/1      | —                                                | 204 |

Depois do DELETE, o GET do mesmo ID deve retornar **404**.
