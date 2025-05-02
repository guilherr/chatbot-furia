import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Teste de conexão com o servidor
  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Testando conexão com o servidor...');
        const response = await fetch('http://localhost:5000/api/test', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log('Resposta do servidor:', data);
        setServerStatus('connected');
      } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
        setServerStatus('error');
      }
    };

    testConnection();
  }, []);

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user message
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Enviando mensagem para o servidor:', input);
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      console.log('Resposta recebida:', response.status);
      const data = await response.json();
      console.log('Dados recebidos:', data);
      
      if (response.ok) {
        setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
      } else {
        console.error('Erro na resposta:', data.error);
        setMessages(prev => [...prev, { text: `Erro: ${data.error || 'Ocorreu um erro. Tente novamente.'}`, sender: 'bot' }]);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessages(prev => [...prev, { text: 'Erro ao conectar com o servidor. Verifique se o servidor está rodando.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-furia-black text-furia-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-furia-purple">
          Fale com a FURIA!
        </h1>
        {serverStatus === 'error' && (
          <div className="text-red-500 text-center mb-4">
            Erro de conexão com o servidor. Verifique se o servidor está rodando.
          </div>
        )}
      </div>

      {/* Chatbot Container */}
      <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-furia-black border-2 border-furia-purple rounded-lg shadow-lg flex flex-col">
        {/* Chat Header */}
        <div className="bg-furia-purple p-4 rounded-t-lg">
          <h2 className="text-xl font-bold">Furiabot</h2>
          {serverStatus === 'connected' && (
            <div className="text-xs text-green-400">Conectado</div>
          )}
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-furia-purple text-white'
                    : 'bg-gray-700 text-white'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-white rounded-lg p-3">
                Digitando...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Container */}
        <div className="p-4 border-t border-furia-purple">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-furia-purple"
              disabled={isLoading || serverStatus === 'error'}
            />
            <button
              onClick={handleSend}
              className="bg-furia-purple text-white rounded-lg px-4 py-2 hover:bg-opacity-90 transition-colors disabled:opacity-50"
              disabled={isLoading || serverStatus === 'error'}
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 