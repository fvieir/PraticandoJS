let pesquisar = document.querySelector('#btnPesquisar')
let inputCep = document.querySelector('#cep')
let limpar = document.querySelector('#btnLimpar')

// inputCep.addEventListener('blur',event => {
//     showData(event)
// })

pesquisar.addEventListener('click', event => {
    loading(true)
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
    pesquisar.style.display = 'block'
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
    let validate = validation(cep)
    
    if (validate) {
        return 
    }
    
    let url = `https://viacep.com.br/ws/${cep}/json/`
    return fetch(url)
        .then(data => data.json())
        .catch(err => {
            console.log(err)
        })
}

async function showData (event) {
    try {
        event.preventDefault()
        let resultado = document.querySelector('#resultado')  

        let inputCep = document.querySelector('#cep').value
        let cepReplace = inputCep.replace('-','')
        const cep = await getCep(cepReplace)

        if(typeof cep !== 'undefined') {
            for (const campo in cep) {
                if(document.querySelector(`#${campo}`)){
                    document.querySelector(`#${campo}`).value = cep[campo]
                    resultado.style.display = 'block'
                }
            }

            pesquisar.style.display = 'none'
        } 
        loading()
    } catch (error) {
        loading()
        console.log(error)
    }
}

function loading(load = false) {  
    
    let spinnerGrow = document.querySelector('.spinner-grow')
    
    if (load) {
        spinnerGrow.style.display = 'block'
        return
    }
    
    spinnerGrow.style.display = 'none'
    

}

function validation (cep) {
    if (!cep) {
        let required = document.querySelector('#required')
        required.style.display = 'block'
        return true
    }

    required.style.display = 'none'
}
