from openai import OpenAI
import openai
import os
from dotenv import load_dotenv


# carrega as variaves do arquivo .env*(ambiente)
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=api_key)


# A função recebe a pergunra do usuario como argumento< será o que o usuario digitar
def conversar_chatbot(pergunta):
    # Aqui, a função usa o método create da biblioteca openai para enviar uma solicitação de completamento de chat para o modelo de linguagem da OpenAI
    resposta = client.chat.completions.create(

        # detalhamento de parametros:
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Você é um assistente de IA animada de um time de E-sports do jogo de Counter Strike da Furia"},
            {"role": "user", "content": pergunta}
        ],
        temperature=0.7,
        max_tokens=150
    )
    return resposta.choices[0].message.content.strip()
