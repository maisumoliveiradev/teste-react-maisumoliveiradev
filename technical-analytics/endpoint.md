# Documentação do Endpoint de Cadastro

Este endpoint permite o registro de vendedores ou compradores.

## Método

`POST /api/cadastro`

## Parâmetros de URL

Nenhum parâmetro de URL é necessário para este endpoint.

## Exemplo de dados enviados por esta API

```json
{
  "tipoPessoa": "Pessoa jurídica",
  "cnpj": "12.345.678/0001-99",
  "cpfResponsavel": "123.456.789-00",
  "nome": "Empresa Exemplo Ltda",
  "celular": "(11) 99999-9999",
  "telefone": "(11) 3456-7890",
  "email": "contato@empresaexemplo.com",
  "confirmarEmail": "contato@empresaexemplo.com",
  "endereco": {
    "cep": "01234-567",
    "logradouro": "Avenida Exemplo",
    "numero": "123",
    "complemento": "Sala 45",
    "cidade": "São Paulo",
    "bairro": "Centro",
    "estado": "SP"
  }
}
```

## Body

- `tipoPessoa` - string (obrigatório): Define se o cadastro é de uma pessoa física ou jurídica. Valores possíveis: `Pessoa física`, `Pessoa jurídica`.
- **Dados para Pessoa Jurídica**:
  - `cnpj` - string (obrigatório): O CNPJ da empresa.
  - `cpfResponsavel` - string (obrigatório): O CPF do responsável.
- **Dados para Pessoa Física**:
  - `cpf` - string (obrigatório): O CPF da pessoa física.
- **Dados Comuns**:
  - `nome` - string (obrigatório): Nome da pessoa ou empresa.
  - `celular` - string (obrigatório): Número de celular.
  - `telefone` - string (não obrigatório): Número de telefone fixo.
  - `email` - string (obrigatório): Endereço de e-mail.
  - `confirmarEmail` - string (obrigatório): Confirmação do endereço de e-mail.
  - `endereco` - objeto (obrigatório):
    - `cep` - string (obrigatório): Código postal.
    - `logradouro` - string (obrigatório): Nome da rua ou avenida.
    - `numero` - string (obrigatório): Número do imóvel.
    - `complemento` - string (não obrigatório): Complemento do endereço.
    - `cidade` - string (obrigatório): Cidade.
    - `bairro` - string (obrigatório): Bairro.
    - `estado` - string (obrigatório): Estado.

## Respostas

### Sucesso (200 OK)

Retorna um objeto JSON com uma mensagem de sucesso e os detalhes do protocolo.

Exemplo de resposta:

```json
{
  "mensagem": "Cadastrado com sucesso! Número protocolo: 12345, 67890",
  "numeroProtocolo": "12345",
  "numeroProtocoloComplementar": "67890"
}
```

### Erro 500

```json
{
  "mensagem": "*Nome do usuário*. Tente novamente mais tarde."
}
```

## Erro 409

```json
{
  "mensagem": "Usuário já cadastrado."
}
```
