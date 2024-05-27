
# Projeto Fatura Extractor

Este projeto é composto por quatro componentes principais: Frontend, Backend, Banco de Dados e Script de Extração de PDF. Abaixo, você encontrará informações detalhadas sobre cada parte, incluindo como configurá-las e executá-las.

## Frontend

**Repositório:** [fatura-extractor-dashboard](https://github.com/erickhanon/fatura-extractor-dashboard)

O frontend é construído usando Next.js 14, TypeScript e shadcn.

### Funcionalidades
- Dashboard amigável para o usuário
- Visualização de faturas extraídas
- Integração com o backend para exibir dados

### Instalação e Execução
1. Clone o repositório:
   ```bash
   git clone https://github.com/erickhanon/fatura-extractor-dashboard.git
   cd fatura-extractor-dashboard
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Backend

**Repositório:** [fatura-extractor-backend](https://github.com/erickhanon/fatura-extractor-backend)

O backend é construído usando Node.js com Express e TypeScript.

### Funcionalidades
- API para gerenciamento de faturas
- Integração com o banco de dados PostgreSQL
- Suporte a operações de CRUD

### Instalação e Execução
1. Clone o repositório:
   ```bash
   git clone https://github.com/erickhanon/fatura-extractor-backend.git
   cd fatura-extractor-backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   DATABASE_URL="postgresql://admin:qwerty%21%40%23123@localhost:5432/PDF_DB"
   ```
4. Execute o servidor:
   ```bash
   npm run dev
   ```

## Script de Extração

**Repositório:** [pdf-extractor-script](https://github.com/erickhanon/pdf-extractor-script)

O script de extração é construído usando Python.

### Funcionalidades
- Extração de dados de PDFs
- Processamento e formatação dos dados extraídos

### Instalação e Execução
1. Clone o repositório:
   ```bash
   git clone https://github.com/erickhanon/pdf-extractor-script.git
   cd pdf-extractor-script
   ```
2. Crie um ambiente virtual e instale as dependências:
   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```
3. Execute o script passando o caminho do PDF como argumento:
   ```bash
   python extract.py caminho/para/o/arquivo.pdf
   ```

### Gerando `requirements.txt`
Se você não tiver um `requirements.txt`, você pode gerá-lo com o comando:
```bash
pip freeze > requirements.txt
```

## Banco de Dados

O banco de dados usa PostgreSQL com a seguinte configuração Docker:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:latest
    container_name: postgres
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: qwerty!@#123
      POSTGRES_DB: PDF_DB
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Configuração e Execução
1. Certifique-se de ter o Docker instalado.
2. Crie e inicie os serviços:
   ```bash
   docker-compose up -d
   ```
