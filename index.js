// Al main de JS se lo suele llamar "Index"

const {
    Alojamiento,
    Reserva,
    Categoria,
    DescuentoFijo,
    DescuentoPorcentaje,
    DescuentoPorNoches,
    Caracteristicas,
} = require("./domain.js")

const {
    aumentarPrecioDiario,
    alojamientoMasCaro,
    filtrarPorPrecio,
    obtenerTotalReservas,
    filtrarCaracteristicas,
} = require("./funciones.js")

const alojamiento1 = new Alojamiento(
    "Hotel en Buenos Aires", 
    100, 
    Categoria.Hotel
);
// Esto es un comentario
console.log(alojamiento1.getDescripcion());
//console.log(alojamiento1)
alojamiento1.anadirCaracteristica(Caracteristicas.Wifi);
//console.log(alojamiento1)
alojamiento1.anadirCaracteristica(Caracteristicas.AptoMascotas);
//console.log(alojamiento1)
alojamiento1.anadirCaracteristica(Caracteristicas.AptoMascotas);
//console.log(alojamiento1)
console.log(filtrarCaracteristicas([alojamiento1], [Caracteristicas.Wifi, Caracteristicas.AptoMascotas]))
console.log(filtrarCaracteristicas([alojamiento1], [Caracteristicas.Wifi]))
console.log(filtrarCaracteristicas([alojamiento1], [Caracteristicas.AptoMascotas]))
console.log(filtrarCaracteristicas([alojamiento1], [Caracteristicas.Wifi, Caracteristicas.AptoMascotas, Caracteristicas.Pileta]))
console.log(filtrarCaracteristicas([alojamiento1], [Caracteristicas.Pileta]))
console.log(filtrarCaracteristicas([alojamiento1], [Caracteristicas.Wifi, Caracteristicas.Pileta]))

const reserva1 = new Reserva(
    alojamiento1, 
    new Date("2025-05-01"), 
    new Date("2025-05-03")
)
/*
console.log(`funciona la funcion de reserva`, reserva1.sePuedeReservarEntre(new Date("2025-05-01"), new Date("2025-05-07")) )
console.log(`funciona la funcion de reserva`, reserva1.sePuedeReservarEntre(new Date("2025-05-01"), new Date("2025-05-15")) )
console.log(`funciona la funcion de reserva`, reserva1.sePuedeReservarEntre(new Date("2025-05-19"), new Date("2025-05-30")) )
console.log(`funciona la funcion de reserva`, reserva1.sePuedeReservarEntre(new Date("2025-05-20"), new Date("2025-05-21")) )
console.log(`funciona la funcion de reserva`, reserva1.sePuedeReservarEntre(new Date("2025-05-02"), new Date("2025-05-09")) )
console.log(`funciona la funcion de reserva`, reserva1.sePuedeReservarEntre(new Date("2025-05-02"), new Date("2025-05-10")) )
*/

reserva1.agregarDescuento(new DescuentoFijo(100))
reserva1.agregarDescuento(new DescuentoFijo(50))
reserva1.agregarDescuento(new DescuentoPorcentaje(10))
reserva1.agregarDescuento(new DescuentoPorNoches(2, 5))

console.log(`El precio base de la reserva es $${reserva1.precioBase()}`)

console.log(`El precio final de la reserva es $${reserva1.precioFinal()}`)

// Implementación de funciones

const catalogo = [
    new Alojamiento("Hotel en Buenos Aires", 100, Categoria.Hotel),
    new Alojamiento("Departamento en Mendoza", 80, Categoria.Departamento),
    new Alojamiento("Cabaña en Bariloche", 120, Categoria.Cabana),
    new Alojamiento("Apart en Mar del Plata", 90, Categoria.Apart),
];

console.log("Alojamientos antes del aumento:")
console.log(catalogo.map(a => a.getDescripcion()));

aumentarPrecioDiario(catalogo, 100);

console.log("Alojamientos despues del aumento:")
console.log(catalogo.map(a => a.getDescripcion()));

const alojamientoCaro = alojamientoMasCaro(catalogo);
console.log("El alojamiento más caro es:")
console.log(alojamientoCaro.getDescripcion());

const alojamientosFiltrados = filtrarPorPrecio(catalogo, 200);
console.log("Alojamientos filtrados por precio (máximo $200):")
console.log(alojamientosFiltrados.map(a => a.getDescripcion()));

const reservas = [
    new Reserva(alojamiento1, new Date("2025-05-05"), new Date("2025-05-10")),
    new Reserva(alojamiento1, new Date("2025-05-10"), new Date("2025-05-17")),
    new Reserva(alojamiento1, new Date("2025-05-18"), new Date("2025-05-19"))
]


const totalReservas = obtenerTotalReservas(reservas);
console.log(`El total de reservas es $${totalReservas}`);