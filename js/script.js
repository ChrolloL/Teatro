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
        ? localStorage.getItem('teatroOcupadas').split(';') : []

    //montar o n° total de poltronas (definidas pela constante)
    for (let i = 1; i <= POLTRONAS; i++) {
        const figure = document.createElement('figure') //cria a tag figure
        const imgStatus = document.createElement('img') //cria a tag img


        //se a posição estiver ocupada, exibe a imagem ocupada, se não, a imagem disponível
        imgStatus.src = ocupadas.includes(i.toString())
            ? 'img/ocupada.jpg'
            : 'img/disponivel.jpg'
        imgStatus.className = 'poltrona' //classe com a dimensão da imagem

        const figureCap = document.createElement('figcaption')

        const zeros = i < 10 ? '00' : i < 100 ? '0' : '' //quantidade de zeros antes do n° da poltrona

        const num = document.createTextNode(`[${zeros}${i}]`) //cria o texto

        //define os pais de cada tag criada
        figureCap.appendChild(num)
        figure.appendChild(imgStatus)
        figure.appendChild(figureCap)


        //se i módulo de 24 = 12 (é o corredor: define margem direita 60px)
        if (i % 24 == 12) figure.style.marginRight = '60px'

        dvPalco.appendChild(figure); //indica que a figura é filha de divPalco


        //se i módulo 24 == 0: o código após && será executado (inserindo a quebra de linha)
        (i % 24 == 0) && dvPalco.appendChild(document.createElement('br'))


    }

})

frm.addEventListener('submit', (e) => {
    e.preventDefault()

    //obtém o conteúdo do input
    const poltrona = Number(frm.inPoltrona.value)

    //valida o preenchimento de entrada
    if(poltrona > POLTRONAS) {
        alert('informe um número de poltrona válido!')
        frm.inPoltrona.value = ''
        frm.inPoltrona.focus()
        return
    } 

    const ocupadas = localStorage.getItem('teatroOcupadas')
    ? localStorage.getItem('teatroOcupadas').split(';')
    : []

    if(reservadas.includes(poltrona)) {
        alert(`Poltrona já reservada!`)
        frm.inPoltrona.value = ''
        frm.inPoltrona.focus()
        return
    }
    
    //validar se a poltrona já tiver ocupada
    if(ocupadas.includes(poltrona.toString())) {
        alert(`A poltrona ${poltrona} já  está ocupada!`)
        frm.inPoltrona.value = ''
        frm.inPoltrona.focus()
        return
    }

    //capturar a imagem da poltrona, filha de divPalco
    const imgPoltrona = dvPalco.querySelectorAll('img')[poltrona - 1]

    imgPoltrona.src = 'img/reservada.jpg' //modifica o atributo da img

    reservadas.push(poltrona) //adiciona a poltrona ao vetor

    frm.inPoltrona.value = ''
    frm.inPoltrona.focus()

})

frm.btConfirmar.addEventListener('click', () => {
    //verificar se não há poltronas reservadas
    if (reservadas.length == 0) {
        alert('Não há poltronas reservadas.')
        frm.inPoltrona.focus()
        return
    }

    const ocupadas = localStorage.getItem('teatroOcupadas')
    ? localStorage.getItem('teatroOcupadas').split(';')
    : [];


    //for decrescente
    for (let i = reservadas.length - 1; i>=0; i--) {
        ocupadas.push(reservadas[i])

        //captura a imagem da poltrona, filha e divPalco. É -1 pois começa em 0
        const imgPoltrona = dvPalco.querySelectorAll('img')[reservadas[i] - 1]
        imgPoltrona.src = 'img/ocupada.jpg' //modifica a imagem
        reservadas.pop()
    }

    localStorage.setItem('teatroOcupadas', ocupadas.join(';'))
})


frm.btCancelar.addEventListener('click', () => {
    const ocupadas = localStorage.getItem('teatroOcupadas')
    ? localStorage.getItem('teatroOcupadas').split(';')
    : [];



    if (ocupadas.length == 0) {
        alert('Não há poltronas ocupadas.')
        frm.inPoltrona.focus()
        return
    } 



    if (frm.inPoltrona.value == '') {
        alert('Informe a poltrona para cancelar.')
        frm.inPoltrona.focus()
        return
    }
  
    const poltrona = Number(frm.inPoltrona.value)
    

    if (!ocupadas.includes(poltrona.toString())) {
        alert('Esta poltrona não está ocupada.')
        frm.inPoltrona.focus()
        return
    } 

    //captura a imagem da poltrona, filha e divPalco. É -1 pois começa em 0
    const imgPoltrona = dvPalco.querySelectorAll('img')[poltrona - 1]
    imgPoltrona.src = 'img/disponivel.jpg' //modifica a imagem
    
    ocupadas.splice(ocupadas.indexOf(poltrona.toString()), 1)

    localStorage.setItem('teatroOcupadas', ocupadas.join(';'))

}) 