export default function ehUmEmailValido(email) {
    const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padraoEmail.test(email);
}
/*export default function ehUmEmailValido(campo) {
    const email = campo.value;
    const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!padraoEmail.test(email)) {
        campo.setCustomValidity('Por favor, insira um formato de e-mail válido (exemplo@dominio.com).');
    } else {
        campo.setCustomValidity('');
    }
}*/
