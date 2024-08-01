class Usuario{
    constructor(numero, nombre_usuario, password, nombre, apellido, monedas, rol_usuario, email, mazos, partidas_ganadas, partidas_perdidas, activo){
        this.numero = numero 
        this.nombre_usuario
        this.password = password
        this.nombre = nombre
        this.apellido = apellido
        this.monedas = monedas
        this.rol_usuario = rol_usuario
        this.email = email
        this.mazos = mazos
        this.partidas_ganadas = partidas_ganadas
        this.partidas_perdidas = partidas_perdidas
        this.activo = activo
    }

    static get_usuario_de_prueba_1() {
        const numero = 1
        const nombre_usuario = "prueba1" 
        const password = 12345678
        const nombre = "Prueba 01"
        const apellido = "Prueba 01" 
        const monedas = 1000 
        const rol_usuario = "JUGADOR"
        const email = "email@email.com" 
        const mazos = []
        const partidas_ganadas = 0
        const partidas_perdidas = 0 
        const activo = true

        return new Usuario(
            numero, nombre_usuario, password, nombre, apellido, monedas, rol_usuario, email, mazos, partidas_ganadas, partidas_perdidas, activo
        )
    }

    static get_usuario_de_prueba_2() {
        const numero = 2
        const nombre_usuario = "prueba2" 
        const password = 12345678
        const nombre = "Prueba 02"
        const apellido = "Prueba 02" 
        const monedas = 1000 
        const rol_usuario = "JUGADOR"
        const email = "email2@email.com" 
        const mazos = []
        const partidas_ganadas = 0
        const partidas_perdidas = 0 
        const activo = true

        return new Usuario(
            numero, nombre_usuario, password, nombre, apellido, monedas, rol_usuario, email, mazos, partidas_ganadas, partidas_perdidas, activo
        )
    }
}

module.exports = Usuario