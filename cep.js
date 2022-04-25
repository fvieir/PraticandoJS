let pesquisar = document.querySelector('#btnPesquisar')
let inputCep = document.querySelector('#cep')
let limpar = document.querySelector('#btnLimpar')

inputCep.addEventListener('blur',event => {
    carregarCep(event)
})

pesquisar.addEventListener('click', event => {
    carregarCep(event)
})

limpar.addEventListener('click', event => {
    document.querySelector('#cep').value = ''
    document.querySelector('#logradouro').value = ''
    document.querySelector('#complemento').value = ''
    document.querySelector('#bairro').value = ''
    document.querySelector('#localidade').value = ''
    document.querySelector('#uf').value = ''
    document.querySelector('#resultado').style.display = 'none'
})

function carregarCep(event) {
    event.preventDefault()
    let inputcep = document.querySelector('#cep')
    let cep = inputcep.value.replace('-','')
    let url = `https://viacep.com.br/ws/${cep}/json/`
    fetch(url)
        .then(response => {
            return response.json()
        }).then( data => {
            preencherCampos(data)
        })
}

function preencherCampos(data) {
    let resultado = document.querySelector('#resultado')
    if (resultado.style.display === 'none') {
        resultado.style.display = 'block'
    }

    for (const campo in data) {
        if(document.querySelector(`#${campo}`)) {
            document.querySelector(`#${campo}`).value = data[campo] 
        }
    }
}
