from flask import Flask, render_template, request, redirect, url_for
import os
import base64
from datetime import datetime
from utils.gemini import analisar_produto

app = Flask(__name__)

UPLOAD_FOLDER = "static/uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/camera")
def camera():
    return render_template("camera.html")


@app.route("/salvar_imagem", methods=["POST"])
def salvar_imagem():

    imagem_base64 = request.form.get("imagem")

    if not imagem_base64:
        return "Nenhuma imagem recebida"

    imagem_base64 = imagem_base64.split(",")[1]

    nome_arquivo = f"{datetime.now().strftime('%Y%m%d%H%M%S')}.png"

    caminho = os.path.join(
        UPLOAD_FOLDER,
        nome_arquivo
    )

    with open(caminho, "wb") as arquivo:
        arquivo.write(
            base64.b64decode(imagem_base64)
        )

    return redirect(
        url_for(
            "resultado",
            imagem=nome_arquivo
        )
    )


@app.route("/resultado")
def resultado():

    imagem = request.args.get("imagem")

    caminho = os.path.join(
        UPLOAD_FOLDER,
        imagem
    )

    dados = analisar_produto(caminho)

    return render_template(
        "resultado.html",
        imagem=imagem,
        dados=dados
    )

if __name__ == "__main__":
    app.run(debug=True)