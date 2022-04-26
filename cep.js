let pesquisar = document.querySelector('#btnPesquisar')
let inputCep = document.querySelector('#cep')
let limpar = document.querySelector('#btnLimpar')

// inputCep.addEventListener('blur',event => {
//     showData(event)
// })

pesquisar.addEventListener('click', event => {
    showData(event)
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

// function getCep(event) {
//     event.preventDefault()
//     let inputcep = document.querySelector('#cep')
//     let cep = inputcep.value.replace('-','')
//     let url = `https://viacep.com.br/ws/${cep}/json/`
//     fetch(url)
//         .then(response => {
//             return response.json()
//         }).then( data => {
//             preencherCampos(data)
//         })
// }

// function preencherCampos(data) {
//     let resultado = document.querySelector('#resultado')
//     if (resultado.style.display === 'none') {
//         resultado.style.display = 'block'
//     }

//     for (const campo in data) {
//         if(document.querySelector(`#${campo}`)) {
//             document.querySelector(`#${campo}`).value = data[campo] 
//         }
//     }
// }

/* asycn - await */

function getCep (cep) {
    let url = `https://viacep.com.br/ws/${cep}/json/`
        return fetch(url)
            .then(data => data.json())
            .catch(err => {
                validation()
                loading()
                console.log(err)
            })
}

async function showData (event) {
    try {
        event.preventDefault()
        let resultado = document.querySelector('#resultado')  

        loading(true)
        
        let inputCep = document.querySelector('#cep').value
        let cepReplace = inputCep.replace('-','')
        const cep = await getCep(cepReplace)
        
        for (const campo in cep) {
            if(document.querySelector(`#${campo}`)){
                document.querySelector(`#${campo}`).value = cep[campo]
                loading()
                resultado.style.display = 'block'
            }
        }
    } catch (error) {
        loading()
        console.log(error)
    }
}

function loading(load = false) {  
    
    let spinnerGrow = document.querySelector('.spinner-grow')
    
    if (load) {
        spinnerGrow.style.display = 'block'
    } else {
        spinnerGrow.style.display = 'none'
    }
}

function validation (must = false) {
    let required = document.querySelector('#required')
    (must) ? console.log('entrou no if') : console.log('entrou no else')}
