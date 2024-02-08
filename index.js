const { MongoClient } = require("mongodb");

const urlConexion = "mongodb://127.0.0.1:27017";
const conexion = new MongoClient(urlConexion);

consultar()
	.catch(console.error)
	.then(console.log)
	.finally(() => conexion.close());

// Actualizar
async function actualizar() {
	await conexion.connect();
	const dbo = conexion.dbo("dws");

	let filtro = {};
	let valores = { $set: { centro: "Sol", edad: 21 } };
	let resultado = await dbo.collection("alumno").updateOne(filtro, valores);
	console.log(resultado);
}

// Consultar
async function consultar() {
	await conexion.connect();
	const dbo = conexion.db("dws");

	let filtro = { nombre: "Álvaro" };
	let resultado = await dbo.collection("alumnos").find(filtro).toArray();
	console.log(resultado);
}

// Insertar datos
async function insertar() {
	await conexion.connect();
	const dbo = conexion.db("dws");

	let datos = [
		{ nombre: "Federico", apellidos: "Gómez" },
		{ nombre: "Fernando", apellidos: "Rodríguez" },
		{ nombre: "Pablo", apellidos: "González" },
	];
	let resultado = await dbo.collection("alumnos").insertMany(datos);
	// let resultado = await dbo.collection("alumnos").insertOne(datos);
	console.log("Datos insertados", resultado);
}

// Join
async function consultaJoin() {
	await conexion.connect();
	const dbo = conexion.db("dws");

	let resultado = await dbo
		.collection("profesores")
		.aggregate([
			{
				$lookup: {
					from: "alumnos",
					localField: "centro",
					foreignField: "centro",
					as: "alumnos",
				},
			},
		])
		.toArray();
	console.log(resultado);
}

// Crear colección
async function crearColeccion() {
	await conexion.connect();
	const dbo = conexion.db("dws");

	let result = await dbo.createCollection("alumnos");
	console.log("Colección creada: " + result.CollectionName);
}

// Eliminar colección
async function eliminarColeccion() {
	await conexion.connect();
	const dbo = conexion.db("dws");

	let result = await dbo.collection("profesores").drop();
	console.log(result);
}
