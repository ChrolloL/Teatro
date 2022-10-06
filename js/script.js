const frm = document.querySelector('form')
const dvPalco = document.querySelector('#divPalco')


//nº de poltronas
const POLTRONAS = 240

//poltronas reservadas pelo cliente
const reservadas = []

window.addEventListener('load', () => {

    //se houver dados em localstorage, faz um split(';') e atribui esses dados ao array
    //caso contrário, inicializamos o array
    const ocupadas = localStorage.getItem('teatroOcupadas')
    ? localStorage.getItem('teatroOcupadas').split(';')

    //montar o n° total de poltronas (definidas pela constante)
    for (let i = 1; i <= POLTRONAS; i++) {
        const figure = document.createElement('figure') //cria a tag figure
        const imgStatus = document.createElement('img') //cria a tag img


        //se a posição estiver ocupada, exibe a imagem ocupada, se não, a imagem disponível
        imgStatus.src = ocupada
    }

})