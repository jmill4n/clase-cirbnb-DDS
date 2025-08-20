/*
function Alojamiento(nombre, precioPorNoche, categoria){
    this.nombre = nombre;
    this.precioPorNoche = precioPorNoche;
    this.categoria = categoria;
}

Alojamiento.prototype.getDescripcion = function() {
    return `${this.nombre} (${this.categoria}) - $ ${this.precioPorNoche}`;
}*/

class Alojamiento{
    constructor(nombre, precioPorNoche, categoria){
        this.nombre = nombre;
        this.precioPorNoche = precioPorNoche;
        this.categoria = categoria;
        this.reservas = [];
        this.caracteristicas = new Set()
    }    
    getDescripcion(){
        return `${this.nombre} (${this.categoria}) - $${this.precioPorNoche} por noche`;
    }
    estaLibreEntre(fechaInicio, fechaFin){
        return this.reservas.every(r => r.sePuedeReservarEntre(fechaInicio, fechaFin));
    }
    anadirReserva(reserva){
        this.reservas.push(reserva);
    }
    anadirCaracteristica(caracteristica){
        this.caracteristicas.add(caracteristica);
    }
    tieneCaracteristicas(caracteristicasBuscadas){
        return caracteristicasBuscadas.isSubsetOf(this.caracteristicas);
    }
}

class Reserva{
    constructor(alojamiento, diaInicio, diaFin){
        if(!diaInicio instanceof Date || !diaFin instanceof Date){
            throw new Error(
                "El dia de inicio y de fin deben ser una instancia de Date."
            )
        }
        if(diaInicio>= diaFin){
            throw new Error("El dia de fin debe ser posterior a la fecha de inicio.")
        }
        if(!(alojamiento.estaLibreEntre(diaInicio, diaFin))){
            //throw new Error("No se puede reservar este alojamiento en las fechas solicitadas. Ya hay una reserva existente en ese rango de fechas.");
            console.log("No se puede reservar este alojamiento en las fechas solicitadas. Ya hay una reserva existente en ese rango de fechas.")
            return;
        }
        this.alojamiento = alojamiento
        this.diaInicio = diaInicio
        this.diaFin = diaFin
        this.descuentos = []
        alojamiento.anadirReserva(this)
    }

    cantidadNoches() {
        const msPorDia = 1000 * 60 * 60 * 24
        return Math.ceil((this.diaFin - this.diaInicio) / msPorDia)
    }

    precioBase(){
        return this.cantidadNoches() * this.alojamiento.precioPorNoche
    }

    precioFinal(){
        let base = this.precioBase()
        let totalDescontado = 0
        for (const descuento of this.descuentos){
            totalDescontado += descuento.valorDescontado(base, this.cantidadNoches())
        }
        return Math.max(0, base - totalDescontado)
    }

    agregarDescuento(descuento) {
        this.descuentos.push(descuento)
    }

    sePuedeReservarEntre(fechaInicio, fechaFin){
        const inicioEntreMedio = fechaInicio > this.diaInicio && fechaInicio < this.diaFin;
        const finEntreMedio = fechaFin > this.diaInicio && fechaFin < this.diaFin;

        return !(inicioEntreMedio || finEntreMedio)
    }


}

class DescuentoFijo{
    constructor(valor){
        this.valor = valor
    }

    valorDescontado(precioBase, cantidad){
        return this.valor;
    }
}

class DescuentoPorcentaje{
    constructor(porcentaje){
        this.porcentaje = porcentaje
    }

    valorDescontado(precioBase, cantidad){
        return precioBase * (this.porcentaje / 100)
    }
}

class DescuentoPorNoches{
    constructor(cantidadMinima, porcentaje){
        this.cantidadMinima = cantidadMinima
        this.porcentaje = porcentaje
    }

    valorDescontado(precioBase, cantidad){
        const vecesRepetido = Math.floor(cantidad / this.cantidadMinima)
        let valorDescontado = 0
        if(vecesRepetido >= 1){
            valorDescontado = precioBase * (this.porcentaje / 100) * vecesRepetido
        }
        return valorDescontado
    }
}

//Una forma de escribir un "falso ENUM"
const Categoria = Object.freeze({
    Hotel: "Hotel",
    Departamento: "Departamento",
    Cabana: "Cabana",
    Apart: "Apart",
});

const Caracteristicas = Object.freeze({
    Wifi: "Wifi",
    AptoMascotas: "Apto para mascotas",
    Pileta: "Pileta",
});

module.exports = {
    Alojamiento,
    Reserva,
    Categoria,
    DescuentoFijo,
    DescuentoPorcentaje,
    DescuentoPorNoches,
    Caracteristicas,
}