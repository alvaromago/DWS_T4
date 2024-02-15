const { MongoClient } = require("mongodb");
const http = require("http");
const url = require("url");
const urlConexion = "mongodb://127.0.0.1:27017";
const conexion = new MongoClient(urlConexion);
const server = http.createServer();

let bd = "dws";
let coleccion = "alumnos";

server.on("request", function (peticion, respuesta) {
	let urlCompleta = url.parse(peticion.url, true);
	let pathname = urlCompleta.pathname;

	if (pathname == "/alumnos") {
		consultar(bd, coleccion, respuesta);
	} else {
		respuesta.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
		respuesta.write("<h1>URL Incorrecta</h1>");
		respuesta.end();
	}
});
server.listen(8080, "127.0.0.1");

// Consultar
async function consultar(bd, coleccion, respuesta) {
	await conexion.connect();
	const dbo = conexion.db(bd);

	let salida = "";
	let resultado = await dbo.collection(coleccion).find({}).toArray();
	console.log(resultado);
	salida = crearTabla(resultado);
	respuesta.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
	respuesta.write(salida);
	respuesta.end();
}

function crearTabla(datosTabla) {
	let contenido = "<table border = '1'>";
	contenido += "<tr><th>Nombre</th><th>Apellido</th><th>Nota</th></tr>";

	for (i = 0; i < datosTabla.length; i++) {
		nombre = "";
		apellidos = "";
		nota = "";
		if (datosTabla[i].nombre != null) {
			nombre = datosTabla[i].nombre;
		}
		if (datosTabla[i].apellidos != null) {
			apellidos = datosTabla[i].apellidos;
		}
		if (datosTabla[i].nota != null) {
			nota = datosTabla[i].nota;
		}

		contenido += "<tr><td>" + nombre + "</td><td>" + apellidos + "</td><td>" + nota + "</td></tr>";
	}
	contenido += "</table>";

	return contenido;
}
