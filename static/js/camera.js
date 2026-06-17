const video = document.getElementById("video");

let streamAtual = null;
let cameraAtual = "environment"; // traseira

async function iniciarCamera() {

    try {

        if (streamAtual) {
            streamAtual
                .getTracks()
                .forEach(track => track.stop());
        }

        streamAtual =
            await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: cameraAtual
                }
            });

        video.srcObject = streamAtual;

    } catch (erro) {

        alert(
            "Não foi possível acessar a câmera."
        );

        console.error(erro);
    }
}

iniciarCamera();

/* Trocar câmera */
const btnTrocar =
    document.getElementById("trocarCamera");

if (btnTrocar) {

    btnTrocar.addEventListener(
        "click",
        async () => {

            cameraAtual =
                cameraAtual === "environment"
                ? "user"
                : "environment";

            await iniciarCamera();

        }
    );

}

/* Capturar foto */
document
    .getElementById("capturar")
    .addEventListener("click", () => {

        const canvas =
            document.getElementById("canvas");

        const ctx =
            canvas.getContext("2d");

        /* reduz tamanho da imagem */
        canvas.width = 480;
        canvas.height = 360;

        ctx.drawImage(
            video,
            0,
            0,
            canvas.width,
            canvas.height
        );

        /* JPEG ocupa muito menos espaço */
        const imagemData =
            canvas.toDataURL(
                "image/jpeg",
                0.3
            );

        document
            .getElementById("imagem")
            .value = imagemData;

        /* Preview */
        const preview =
            document.getElementById("preview");

        preview.src =
            imagemData;

        preview.style.display =
            "block";

        /* Badge */
        document
            .getElementById("fotoCapturada")
            .style.display =
            "inline-flex";
    });