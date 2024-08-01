let Mazo = require('../models/mazo.model');

const repartirMano = (mazo, cantidadCartas) => {
    const mano = agarrarCarta(mazo, undefined, cantidadCartas)
    quitarCarta(mazo)
    return mano
}

const mezclar = (mazo) => {
    var j, x, i;
    for (i = mazo.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = mazo[i];
        mazo[i] = mazo[j];
        mazo[j] = x;
    }
    return mazo;
}

const agarrarCarta = (mazo, numeroCarta, cantidadCartas) => {
    if (numeroCarta != undefined) {
        if (Array.isArray(numeroCarta))
            return mazo.filter(carta => numeroCarta.includes(carta.numero))
        else {
            return mazo.filter(carta => carta.numero === numeroCarta)
        }
    }

    if (cantidadCartas != undefined)
        return mazo.slice(0, cantidadCartas);
    else
        throw "No se pueden extraer cartas"
}

const buscarCarta = (mazo, numeroCarta) => {
    return mazo.find(carta => carta.numero === numeroCarta)
}

const quitarCarta = (mazo, numeroCarta) => {
    return mazo.filter(carta => carta.numero !== numeroCarta)
}

async function getUltimoNumeroDeMazo(){//Buscar por el maximo numero
    var mazo = await Mazo.findOne()
    .sort('-numero')  // give me the max
    .then(res => res)
    .catch(err => err)
/*     .exec(function (err, doc) {
        if (err)
          return handleError(err);
        if (doc) {
          return doc
        }
    });
 */    return mazo.numero
}

async function crearMazosParaElUsuario(numeroUsuario) {
    const idsDeMazos = []

    try{
        var ultimoNumeroDeMazo = await getUltimoNumeroDeMazo()
        
        idsDeMazos.push(ultimoNumeroDeMazo + 1)
        var mazo1 = new Mazo({
                numero: ultimoNumeroDeMazo + 1,
                nombre: "Mazo inicial",
                cartas: ["P1","P2","P3","P4","P5","P6","P7","P8","P9",'P10','P11','P12','P13','P14','P15','P16','P17','P18','P19','P20','E1','E2','E3','E4'
                ,'E1','E2','E3','E4','E1','E2','E3','E4'],
        })
        mazo1.save(function (err) {
            if (err) throw err;
            // saved!
        })
    
        idsDeMazos.push(ultimoNumeroDeMazo + 2)
        var mazo2 = new Mazo({
                numero: ultimoNumeroDeMazo + 2,
                nombre: "Mazo inicial 2",
                cartas: ["P1","P2","P3","P4","P5","P6","P7","P8","P9",'P10','P11','P12','P13','P14','P15','P16','P17','P18','P19','P20','E1','E2','E3','E4'
                ,'E1','E2','E3','E4','E1','E2','E3','E4'],
        })
        mazo2.save()
    
        idsDeMazos.push(ultimoNumeroDeMazo + 3)
        var mazo3 = new Mazo({
                numero: ultimoNumeroDeMazo + 3,
                nombre: "Mazo inicial 3",
                cartas: ["P1","P2","P3","P4","P5","P6","P7","P8","P9",'P10','P11','P12','P13','P14','P15','P16','P17','P18','P19','P20','E1','E2','E3','E4'
                ,'E1','E2','E3','E4','E1','E2','E3','E4'],
        })
        mazo3.save()
    }
    catch{
        throw "Error"
    }
    
    return idsDeMazos
}

module.exports = {
    repartirMano: repartirMano,
    mezclar: mezclar,
    agarrarCarta: agarrarCarta,
    buscarCarta: buscarCarta,
    quitarCarta: quitarCarta,
    crearMazosParaElUsuario: crearMazosParaElUsuario
}