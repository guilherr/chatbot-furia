# Chatbot Furia

Um chatbot interativo que simula um assistente virtual do time de E-sports Furia no Counter-Strike, desenvolvido com Python e React.

## 🚀 Funcionalidades

- Interface web moderna e responsiva
- Chat em tempo real com IA
- Integração com a API da OpenAI (GPT-3.5)
- Respostas personalizadas no contexto do time Furia

## 🛠️ Tecnologias Utilizadas

### Backend
- Python 3.x
- Flask
- OpenAI API
- Flask-CORS

### Frontend
- React
- Tailwind CSS
- Node.js

## 📋 Pré-requisitos

- Python 3.x
- Node.js
- NPM ou Yarn
- Chave de API da OpenAI

## 🔧 Instalação

### Backend

1. Navegue até a pasta do chatbot:
```bash
cd chatbot
```

2. Crie um ambiente virtual Python:
```bash
python -m venv venv
```

3. Ative o ambiente virtual:
- Windows:
```bash
.\venv\Scripts\activate
```
- Linux/Mac:
```bash
source venv/bin/activate
```

4. Instale as dependências:
```bash
pip install -r requirements.txt
```

5. Crie um arquivo `.env` na pasta `chatbot` e adicione sua chave da OpenAI:
```
OPENAI_API_KEY=sua_chave_aqui
```

### Frontend

1. Navegue até a pasta da interface:
```bash
cd interface
```

2. Instale as dependências:
```bash
npm install
```

## 🚀 Executando o Projeto

### Backend

1. Ative o ambiente virtual (se ainda não estiver ativo)
2. Execute o servidor:
```bash
python server.py
```
O servidor estará disponível em `http://localhost:5000`

### Frontend

1. Na pasta `interface`, execute:
```bash
npm start
```
A aplicação estará disponível em `http://localhost:3000`

## 💻 Funcionamento do Código

### Backend (Python/Flask)

O backend é composto por dois arquivos principais:

1. **chatbot.py**:
   - Implementa a lógica principal do chatbot
   - Utiliza a API da OpenAI (GPT-3.5) para gerar respostas
   - Configura o contexto do chatbot como assistente do time Furia
   - Parâmetros principais:
     - `model`: "gpt-3.5-turbo"
     - `temperature`: 0.7 (controla a criatividade das respostas)
     - `max_tokens`: 150 (limita o tamanho das respostas)

2. **server.py**:
   - Implementa o servidor Flask
   - Gerencia duas rotas principais:
     - `/api/test`: Rota de teste para verificar se o servidor está funcionando
     - `/api/chat`: Rota principal que processa as mensagens do usuário
   - Configuração CORS para permitir requisições do frontend
   - Tratamento de erros e validação de mensagens

### Frontend (React)

A interface do usuário é construída com React e inclui:

1. **Componentes Principais**:
   - Interface de chat interativa
   - Campo de entrada de mensagens
   - Exibição do histórico de conversas
   - Indicadores de status (digitando, enviando, etc.)

2. **Integração com Backend**:
   - Comunicação via API REST
   - Gerenciamento de estado das mensagens
   - Tratamento de erros e feedback ao usuário

### Fluxo de Dados

1. O usuário digita uma mensagem no frontend
2. A mensagem é enviada para o backend via API
3. O backend processa a mensagem usando o GPT-3.5
4. A resposta é retornada ao frontend
5. A interface é atualizada com a nova mensagem

### Segurança

- Autenticação via API key da OpenAI
- Validação de mensagens no backend
- Configuração CORS para proteção contra requisições não autorizadas
- Variáveis de ambiente para dados sensíveis

## 📝 Estrutura do Projeto

```
chatbot-furia/
├── chatbot/
│   ├── chatbot.py      # Lógica do chatbot
│   ├── server.py       # Servidor Flask
│   └── requirements.txt # Dependências Python
├── interface/
│   ├── src/           # Código fonte React
│   ├── public/        # Arquivos estáticos
│   └── package.json   # Dependências Node.js
└── README.md
```

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Agradecimentos

- Time Furia
- OpenAI
- Comunidade open source