const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
let imagemURL = "";

// Função assíncrona baseada no exemplo do banco
botaoIniciarCamera.addEventListener('click', async function () {
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    
    // Esconde o botão e mostra a câmera removendo a classe do tailwind 'hidden'
    botaoIniciarCamera.classList.add("hidden");
    campoCamera.classList.remove("hidden");
    campoCamera.classList.add("flex"); // Adiciona flex do tailwind

    video.srcObject = iniciarVideo;
});

botaoTirarFoto.addEventListener('click', function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    imagemURL = canvas.toDataURL('image/jpeg');
    
    campoCamera.classList.remove("flex");
    campoCamera.classList.add("hidden");
    
    mensagem.classList.remove("hidden");
    mensagem.classList.add("flex");
    
    video.srcObject.getTracks().forEach(track => track.stop());
});