const distinct = require('../utils/functions')
const resultados = require('../utils/enums').RESULTADOS


const determinarGanador = (estadoCampoJugador1, estadoCampoJugador2) => {
    const jugador1 = estadoCampoJugador1
    const jugador2 = estadoCampoJugador2
    jugador2.defensa = atacar(jugador1.ataque, jugador2.defensa)
    jugador1.defensa = atacar(jugador2.ataque, jugador1.defensa)

    const ganadorJugador1 = {nombreUsuario: jugador1.nombre_usuario, estado: resultados.GANADOR} 
    const ganadorJugador2 = {nombreUsuario: jugador2.nombre_usuario, estado: resultados.GANADOR} 
    const empate = {estado: resultados.EMPATE} 

    return jugador1.defensa > jugador2.defensa ? ganadorJugador1 : (jugador2.defensa > jugador1.defensa ? ganadorJugador2 : empate)

}

const determinarCampoFinal = (nombreJugador, campo) => {
    return {
        ataque: calcularAtaque(campo),
        defensa: calcularDefensa(campo),
        nombre_usuario: nombreJugador
    }
}

const atacar = (ataqueJugador, defensaJugador) => {
    return (defensaJugador - ataqueJugador) > 0 ? (defensaJugador - ataqueJugador) : 0  
}

const calcularAtaque = (campo) => {
    return campo.map(carta => carta.ataque).reduce((a, b) => a + b, 0)
}

const calcularDefensa = (campo) => {
    return campo.map(carta => carta.defensa).reduce((a, b) => a + b, 0)
}

const devolverPokemonAEvolucionar = (numeroPokemon) => {
    /*llamar a la API*/
}

/*Multiplica los stats del pokemon base por la cantidad de vecesrepetido*/
const calcularEvolucion = (pokemon, cantidadVecesRepetido) => {
    return {
        defensa: habilidadAEvoluacionar(pokemon.defensa, cantidadVecesRepetido),
        ataque: habilidadAEvoluacionar(pokemon.ataque, cantidadVecesRepetido),
        //TODO que devuelva el nombre del pokemon evolucionado
    }
}

const habilidadAEvoluacionar = (habilidad, cantidadVecesRepetido) => {
    return habilidad * cantidadVecesRepetido
}


const contarRepeticiones = (array, numero) =>{
    return array.filter(pokemon => pokemon.numero === numero).length
}

const obtenerListaPokemonAEvolucionar = (array, campoEvolucion) => {
    return array.map(pokemon => 
        ({numero: pokemon,cantidad: contarRepeticiones(campoEvolucion, pokemon)}))
}

const devolverListaEvoluciones = (campo) =>{
    const sinRepeticiones = campo.map(carta => carta.numero).filter(distinct)
    return obtenerListaPokemonAEvolucionar(sinRepeticiones, campo).filter(pokemon => pokemon.cantidad >= 3)
}

module.exports = {
    determinarGanador : determinarGanador,
    atacar : atacar,
    calcularAtaque : calcularAtaque,
    calcularDefensa : calcularDefensa,
    devolverPokemonAEvolucionar : devolverPokemonAEvolucionar,
    calcularEvolucion : calcularEvolucion,
    habilidadAEvoluacionar : habilidadAEvoluacionar,
    determinarCampoFinal : determinarCampoFinal,
    contarRepeticiones : contarRepeticiones,
    obtenerListaPokemonAEvolucionar : obtenerListaPokemonAEvolucionar,
    devolverListaEvoluciones : devolverListaEvoluciones
}