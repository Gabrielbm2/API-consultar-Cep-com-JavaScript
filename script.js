//Uso de API em projeto da Alura onde eles fornecem o HTML e CSS, para o aluno construir o Js para o uso da API.

//função assíncrona para buscar o endereço pelo CEP
async function buscaEndereco(cep) {
    var mensagemError = document.getElementById('erro');
    mensagemError.innerHTML = "";
    try {
        // faz uma requisição HTTP para a API do ViaCEP usando o CEP informado
        var consultarCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        // converte a resposta para objeto JSON
        var consultarCepConvertida = await consultarCep.json();
        // verifica se o CEP não existe na base de dados do ViaCEP
        if (consultarCepConvertida.erro) {
            // se o CEP não existe, lança uma exceção com uma mensagem de erro
            throw Error('CEP não existente!');
        }
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');

        cidade.value = consultarCepConvertida.localidade;
        logradouro.value = consultarCepConvertida.logradouro;
        estado.value = consultarCepConvertida.uf;

        console.log(consultarCepConvertida);
        return consultarCepConvertida;
    } catch (erro) {
        mensagemError.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
}
// busca o elemento do HTML que contém o campo de CEP
var cep = document.getElementById('cep');
// adiciona um evento para quando o usuário sair do campo de CEP
cep.addEventListener("focusout", () => buscaEndereco(cep.value));