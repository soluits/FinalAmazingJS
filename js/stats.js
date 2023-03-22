let jsonAPI = './js/amazing'
let events = [];
let currentDate = [];
const eventsFutures = [];
const pastEvents = [];

async function getEvents() {
	try {
		let response = await fetch(jsonAPI);
		let eventsAPI = await response.json();
		currentDate.push(eventsAPI.currentDate);
		for (i = 0; i < eventsAPI.events.length; i++) {
			try {
				events.push(eventsAPI.events[i]);
				if (eventsAPI.events[i].date <= currentDate) {
					pastEvents.push(eventsAPI.events[i]);
					pastEvents.sort((a, b) => a.assistance < b.assistance ? 1 : -1);
				} else {
					eventsFutures.push(eventsAPI.events[i]);
					eventsFutures.sort((a, b) => a.assistance > b.assistance ? 1 : -1);
				}
			} catch (error) {
				console.log(error.message);
			}
		}
		//llamar funciones acá sino nos quedamos con la promesa
		masMenos(pastEvents)
		loadStats(pastEvents, 'PastEvents');
		loadStats(eventsFutures, 'FutureEvents');
	} catch (error) {
		console.log(error.message)
	}
}
getEvents();


function singleCategorys(array) {
	let categorias = [];
	array.forEach(each => {
		if (!categorias.includes(each.category)) {
			categorias.push(each.category)
		}
	})
	return categorias;
}
function loadStats(arrayTime, tableID) {
	let contenedor = document.getElementById(tableID)
	let tableHTML = '';
	let categorias = singleCategorys(arrayTime);
	//recorro las categorias
	categorias.forEach(elemento => {
		let revenues = 0;
		let assistance = 0;
		let capacity = 0;
		let estimate = 0;
		//recorro el array que recibo futuro o pasado
		arrayTime.forEach(element => {
			//busco si tiene la misma categoria
			if (element.category == elemento && element.assistance) {
				revenues += element.price * element.assistance;
				assistance += element.assistance;
				capacity += element.capacity;
			}
			if (element.category == elemento && element.estimate) {
				revenues += element.price * element.estimate;
				estimate += element.estimate;
				capacity += element.capacity;
			}
		})
		tableHTML += `
					<tr>
					<td colspan="2">${elemento}</td>
					<td colspan="1">$ ${revenues}</td>
					${estimate ? ' <td colspan="1">' + ((estimate / capacity) * 100).toFixed(2) + ' %</td>  ' : ""}
					${assistance ? ' <td colspan="1">' + ((assistance / capacity) * 100).toFixed(2) + ' %</td>  ' : ""}
					</tr>
						`;
		contenedor.innerHTML = tableHTML;
	})

}
function masMenos(array) {
	let porcentajes = []
	let percents = []
	let menor = porcentajes[pastEvents.length - 1]
	for (var i = 0; i < array.length; i++) {
		porcentajes.push({ nombre: array[i].name, porcentaje: ((array[i].assistance / array[i].capacity) * 100).toFixed(2), capacidad: array[i].capacity })
	}
	//Ordenando Arrays
	percents = porcentajes.sort((a, b) => a.porcentaje < b.porcentaje ? 1 : -1);
	capacidad = array.sort((a, b) => a.capacity < b.capacity ? 1 : -1);
	document.getElementById('individualStats').innerHTML = `<tr>
	<td colspan="2">${percents[0].nombre} (${percents[0].porcentaje}%)</td>
	<td colspan="1">${percents[percents.length - 1].nombre}  (${percents[percents.length - 1].porcentaje})</td>
	<td colspan="1">${capacidad[0].name} (${capacidad[0].capacity})</td>
				</tr>`
}