const { MongoClient } = require("mongodb");
const fs = require("fs");
const urlConexion = "mongodb://127.0.0.1:27017";
const conexion = new MongoClient(urlConexion);

const bd = "dws";
const coleccion = "alumnos";
fs.readFile("alumnos.json", function (err, datos) {
	let datosJSON = JSON.parse(datos);

	insertar(datosJSON, bd, coleccion)
		.then(console.log)
		.catch(console.error)
		.finally(() => conexion.close());
});

// Insertar datos
async function insertar(datos, bd, coleccion) {
	await conexion.connect();
	const dbo = conexion.db(bd);
	// La variable datos guarda los datosJSON
	let resultado = await dbo.collection(coleccion).insertMany(datos);
	console.log("Datos insertados", resultado);
}
