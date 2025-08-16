const {
  Alojamiento,
  Reserva,
  Categoria,
  DescuentoFijo,
  DescuentoPorcentaje,
  DescuentoPorNoches,
} = require("./domain.js");

const {
  aumentarPrecioDiario,
  alojamientoMasCaro,
  filtrarPorPrecio,
  obtenerTotalReservas,
} = require("./funciones.js");

const alojamiento1 = new Alojamiento(
  "Hotel en Buenos Aires",
  100,
  Categoria.Hotel
);

//console.log(alojamiento1.getDescripcion());

// Instancia de Reserva y calculo de precio Base

const reserva1 = new Reserva(
  alojamiento1,
  new Date("2025-05-10"),
  new Date("2025-05-20")
);

reserva1.agregarDescuento(new DescuentoFijo(100));
reserva1.agregarDescuento(new DescuentoFijo(50));
reserva1.agregarDescuento(new DescuentoPorcentaje(10));
reserva1.agregarDescuento(new DescuentoPorNoches(2, 5));
// 10 noches, descuento aplicado cada 2 noches -> 5 * 5 = 25% de descuento

console.log(`El precio base de la reserva es ${reserva1.precioBase()}`);
console.log(`El precio final de la reserva es ${reserva1.precioFinal()}`);

// Implementacion de funciones

const catalogo = [
  new Alojamiento("Apart1", 10, Categoria.Apart),
  new Alojamiento("Apart2", 2000, Categoria.Apart),
  new Alojamiento("Apart3", 100, Categoria.Hotel),
];
console.log("Alojamientos antes del aumento:");
console.log(catalogo);
aumentarPrecioDiario(catalogo, 1000);
console.log("Alojamientos despues del aumento:");
console.log(catalogo);

const masCaro = alojamientoMasCaro(catalogo);
console.log("El alojamiento mas caro del catalogo", masCaro);

console.log("Alojamientos filtrados por preciom maximo 2000");
const filtrados = filtrarPorPrecio(catalogo, 2000);
console.log(filtrados);

const reservas = [
  new Reserva(alojamiento1, new Date("2025-05-01"), new Date("2025-05-10")),
  new Reserva(alojamiento1, new Date("2025-05-01"), new Date("2025-05-7")),
  new Reserva(alojamiento1, new Date("2025-05-01"), new Date("2025-05-8")),
];
const total = obtenerTotalReservas(reservas);
console.log("El total de reservas es de:", total);
