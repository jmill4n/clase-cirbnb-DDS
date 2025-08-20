function aumentarPrecioDiario(alojamientos, aumento){
    alojamientos.forEach(a => {
        a.precioPorNoche += aumento;
    });
}

function alojamientoMasCaro(alojamientos) {
    const listaDePrecios = alojamientos.map(a => {
        return a.precioPorNoche
    })
    const precioMaximo = Math.max(...listaDePrecios)
    const alojamientoCaro = alojamientos.find(a => {
        return a.precioPorNoche == precioMaximo
    })
    return alojamientoCaro
}

function filtrarPorPrecio(alojamientos, precioMaximo){
    return alojamientos.filter(a => {
        return a.precioPorNoche <= precioMaximo
    })
}

function obtenerTotalReservas(reservas){
    return reservas.reduce((previo, reserva) => {
        return previo + reserva.precioFinal()
    }, 0)
}

function filtrarCaracteristicas(alojamientos, caracteristicasBuscadas) {
    const caracteristicasBuscadasSet = new Set(caracteristicasBuscadas);
    const alojamientosFiltrados = alojamientos.filter(a => {
        return a.tieneCaracteristicas(caracteristicasBuscadasSet);
    })
    return alojamientosFiltrados;
}

module.exports = {
    aumentarPrecioDiario,
    alojamientoMasCaro,
    filtrarPorPrecio,
    obtenerTotalReservas,
    filtrarCaracteristicas,
}