async function buscaEndereco(cep) {
    const mensagemErro = document.getElementById("erro");
    mensagemErro.innerHTML = "";
    try {
        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const consultaCepConvertida = await consultaCEP.json();

        if (consultaCepConvertida.erro) {
            throw Error("CEP não válido.")
        }

        const cidade = document.getElementById("cidade");
        const logradouro = document.getElementById("endereco");
        const estado = document.getElementById("estado");

        cidade.value = consultaCepConvertida.localidade;
        logradouro.value = consultaCepConvertida.logradouro;
        estado.value = consultaCepConvertida.uf

        console.log(consultaCepConvertida);
        return consultaCepConvertida;
    } catch(erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente.</p>`
        console.log(erro);
    }
}

const cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value))