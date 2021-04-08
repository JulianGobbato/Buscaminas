let body = document.getElementById('body')
let btnJugar = document.getElementById('btn__jugar')
let btnFacil = document.getElementById('btnFacil')
let btnMedio = document.getElementById('btnMedio')
let btnDificil = document.getElementById('btnDificil')
let altoDelTablero = ""
let anchoDelTablero = ""
let cantidadDeMinas =  ""
let casillasConBombas = []
let casillasConBanderas = []
let aciertosFaltantes = ""
let modoBandera = null
let sumaDeBombas = 0
let sumaDeBanderas = 0
btnFacil.addEventListener('click',()=>{
    startGame(8,8,10)
})
btnMedio.addEventListener('click',()=>{
    startGame(16,16,40)
})
btnDificil.addEventListener('click',()=>{
    startGame(30,16,99)
})
function startGame(h,w,b){
    btnJugar.style.display = "none"
    let div__contenedor = document.createElement('div')
    div__contenedor.id = 'div__contenedor'
    //div__contenedor.classList.add("container")
    let bandera = document.createElement('button')
    bandera.id = 'bandera'
    bandera.classList.add('container')
    bandera.classList.add('mt-3')
    bandera.classList.add('mb-3')
    bandera.innerHTML= '<i class="bi bi-flag-fill"></i>'
    bandera.style.background="#c9c9c9"
    body.appendChild(bandera)
    modoBandera = false
    bandera.onclick= ()=>{
        if (modoBandera == false){
            modoBandera = true
            bandera.innerHTML= '<i class="bi bi-flag"></i>'
            bandera.style.background="#666"
        }else {
            modoBandera = false
            bandera.innerHTML= '<i class="bi bi-flag-fill"></i>'
            bandera.style.background="#c9c9c9"
        }
    }
    altoDelTablero = h
    anchoDelTablero = w
    cantidadDeMinas = b
    //casillasConBombas = [1,2,3,4,5,6,7,8,9,17,18,19]
    casillasConBombas = []
    casillasConBanderas = []
    llenarLaCasillaConBomba (h,w,b)
    sumaDeBombas = 0
    sumaDeBanderas = 0
    casillasConBombas.map(elemento => sumaDeBombas += elemento )
    aciertosFaltantes = (altoDelTablero * anchoDelTablero) - cantidadDeMinas 
    for (let i = 1; i < (altoDelTablero*anchoDelTablero)+1; i++) {
      let casillero = document.createElement('div')
      casillero.style.width = `calc(90vw/${anchoDelTablero})`
      casillero.style.height = `calc(90vw/${anchoDelTablero})`
      casillero.className = "casillaDeJuego"
      casillero.innerText = "ㅤ"
      casillero.onclick = ()=>{
        if (modoBandera == true){
            casillero.onclick = ()=>{
                if (casillasConBombas.includes(i)){
                    bomba()
                } else {
                    buscarMinas(i, casillero)
                }
                if (aciertosFaltantes == 0){
                    win()
                }
                casillasConBanderas.splice(casillasConBanderas.indexOf(i),1)
                casillero.className = "casillaMarcada"
                casillero.onclick = "null"
            }
            ponerBandera(casillero, i)
            if (casillasConBanderas.length == casillasConBombas.length && sumaDeBanderas == sumaDeBombas){
                win()
            }
        }else {
          if (casillasConBombas.includes(i)){
              bomba()
          } else {
              buscarMinas(i, casillero)
          }
          if (aciertosFaltantes == 0){
              win()
          }
          casillero.className = "casillaMarcada"
          casillero.onclick = "null"
            }
        }
      div__contenedor.appendChild(casillero)
//      if ( (i%anchoDelTablero) == 0){
//    let saltoDeLinea = document.createElement('br')
//    div__contenedor.appendChild(saltoDeLinea)
//      }
    }
    body.appendChild(div__contenedor)
}
function buscarMinas(numeroDelCasillero, cas) {
    aciertosFaltantes--
    let nDeBombasAlrededor = casillasConBombas.filter((casillaConBomba) => {
        if ((numeroDelCasillero -1) % anchoDelTablero == 0 ){
            return (
                casillaConBomba == numeroDelCasillero - anchoDelTablero ||
                casillaConBomba == numeroDelCasillero - anchoDelTablero + 1 ||
                casillaConBomba == numeroDelCasillero + 1 ||
                casillaConBomba == numeroDelCasillero + anchoDelTablero ||
                casillaConBomba == numeroDelCasillero + anchoDelTablero + 1
            )
        }else if (numeroDelCasillero % anchoDelTablero == 0){
            return (
                casillaConBomba == numeroDelCasillero - anchoDelTablero - 1 ||
                casillaConBomba == numeroDelCasillero - anchoDelTablero ||
                casillaConBomba == numeroDelCasillero - 1 ||
                casillaConBomba == numeroDelCasillero + anchoDelTablero - 1 ||
                casillaConBomba == numeroDelCasillero + anchoDelTablero
            )
        } else {
            return (
                casillaConBomba == numeroDelCasillero - anchoDelTablero - 1 ||
                casillaConBomba == numeroDelCasillero - anchoDelTablero ||
                casillaConBomba == numeroDelCasillero - anchoDelTablero + 1 ||
                casillaConBomba == numeroDelCasillero - 1 ||
                casillaConBomba == numeroDelCasillero + 1 ||
                casillaConBomba == numeroDelCasillero + anchoDelTablero - 1 ||
                casillaConBomba == numeroDelCasillero + anchoDelTablero ||
                casillaConBomba == numeroDelCasillero + anchoDelTablero + 1
            );
        }
    }).length;
    return cas.innerHTML = `<b>${nDeBombasAlrededor}</b>`
    //console.log(nDeBombasAlrededor);
}
function bomba () {
    body.removeChild(div__contenedor)
    body.removeChild(bandera)
    gif = document.createElement('img')
    gif.src = "booomb.gif"
    body.appendChild(gif)
    let timerPromise = new Promise ((resolve, reject)=>{
        setTimeout(function(){
            body.removeChild(gif)
            btnJugar.style.display = "block"
            resolve
        }, 2000)
    })
    
}
function win () {
    body.removeChild(div__contenedor)
    body.removeChild(bandera)
    gif = document.createElement('img')
    gif.style.width = "100%"
    gif.src = "win.gif"
    body.appendChild(gif)
    let timerPromise = new Promise ((resolve, reject)=>{
        setTimeout(function(){
            body.removeChild(gif)
            btnJugar.style.display = "block"
            resolve
        }, 4000)
    })
}
function llenarLaCasillaConBomba (h,w,b){
    for (let i = 0; i < b; i++){
        let numero = Math.floor(Math.random() * (h*w)) + 1
        let check = casillasConBombas.includes(numero)
        if (check === false){
            casillasConBombas.push(numero)
        }else {
            while (check === true){
                numero = Math.floor(Math.random() * (h*w)) + 1
                check = casillasConBombas.includes(numero)
                if (check === false){
                    casillasConBombas.push(numero)
                }
            }
        }
    }
}
function ponerBandera(casillero, numeroDelCasillero){
    casillero.innerHTML = '<b><i class="bi bi-flag-fill"></i></b>'
    casillasConBanderas.push(numeroDelCasillero)
    sumaDeBanderas += numeroDelCasillero
}
