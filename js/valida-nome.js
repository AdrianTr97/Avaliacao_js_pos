export default function ehUmNomeValido(nome) {
    const padraoNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;
    if (nome.length < 3 || !padraoNome.test(nome)) {
        return false;
    }
    return true;
}
/*export default function ehUmNomeValido(campo) {
    const nome = campo.value;
    // Regex para permitir apenas letras e espaços
    const padraoNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;

    if (nome.length < 3) {
        campo.setCustomValidity('O nome deve ter pelo menos 3 caracteres.');
    } else if (!padraoNome.test(nome)) {
        campo.setCustomValidity('O nome não deve conter números ou símbolos.');
    } else {
        campo.setCustomValidity('');
    }
}*/
