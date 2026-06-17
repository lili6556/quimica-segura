import os
import json
from dotenv import load_dotenv
import google.generativeai as genai
from PIL import Image

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

modelo = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def analisar_produto(caminho_imagem):

    imagem = Image.open(caminho_imagem)

    prompt = """
    Analise a imagem.

    Identifique o produto químico,
    cosmético ou produto de higiene.

    Responda SOMENTE em JSON válido.

    {
        "produto":"",
        "categoria":"",
        "componentes":"",
        "riscos":"",
        "armazenamento":"",
        "descarte":"",
        "impacto_ambiental":""
    }

    Se não for possível identificar
    com certeza absoluta, informe
    a melhor estimativa possível.
    """

    resposta = modelo.generate_content(
        [prompt, imagem]
    )

    texto = resposta.text

    texto = texto.replace("```json", "")
    texto = texto.replace("```", "")

    return json.loads(texto)