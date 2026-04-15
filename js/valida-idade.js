export default function ehUmaIdadeValida(campo) {
    const idade = campo.value;
    if (idade < 10 || idade > 120) {
        campo.setCustomValidity('A idade deve estar entre 10 e 120 anos.');
    } else {
        campo.setCustomValidity('');
    }
}
/*export default function ehMaiorDeIdade(campo) {
    const dataNascimento = new Date(campo.value);
    validaIdade(dataNascimento);
    console.log(validaIdade(dataNascimento));
}

function validaIdade(data) {
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataAtual >= dataMais18;
}*/