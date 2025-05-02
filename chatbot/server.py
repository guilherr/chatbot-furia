from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import conversar_chatbot

app = Flask(__name__)
# Configuração do CORS para desenvolvimento
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Rota de teste


@app.route('/api/test', methods=['GET'])
def test():
    print("Teste de conexão recebido!")
    return jsonify({'status': 'ok', 'message': 'Servidor funcionando!'})


@app.route('/api/chat', methods=['POST'])
def chat():
    print("Recebendo mensagem do chat...")
    data = request.json
    print(f"Dados recebidos: {data}")
    user_message = data.get('message', '')

    if not user_message:
        print("Erro: Mensagem não fornecida")
        return jsonify({'error': 'Mensagem não fornecida'}), 400

    try:
        print(f"Processando mensagem: {user_message}")
        response = conversar_chatbot(user_message)
        print(f"Resposta gerada: {response}")
        return jsonify({'response': response})
    except Exception as e:
        print(f"Erro ao processar mensagem: {str(e)}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    print("Iniciando servidor Flask na porta 5000...")
    print("Servidor acessível em: http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
