const video = document.getElementById("video");

navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(() => {

        alert(
            "Não foi possível acessar a câmera."
        );

    });
document
    .getElementById("capturar")
    .addEventListener("click", () => {

        const canvas = document.getElementById("canvas");
        const ctx    = canvas.getContext("2d");

        canvas.width  = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0);

        const imagemData = canvas.toDataURL("image/png", 0.5);

        document.getElementById("imagem").value = imagemData;

        /* Preview */
        const preview = document.getElementById("preview");
        preview.src = imagemData;
        preview.style.display = "block";

        /* Feedback badge */
        document.getElementById("fotoCapturada").style.display = "inline-flex";
    });