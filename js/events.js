const jsonAPI = './js/amazing'
let events =[];
let arrayCompleto = [];
let currentDate = [];
async function getEvents() {
    try { 
		let response = await fetch(jsonAPI);
		let eventsAPI = await response.json();
		currentDate.push(eventsAPI.currentDate);
		arrayCompleto.push(eventsAPI);
			for (i=0; i < eventsAPI.events.length; i++){
				try {
					events.push(eventsAPI.events[i]);
				}catch (error){
					console.log(error.message);
				}
			}	
		
	}catch (error){
		console.log(error.message)
	}
}
getEvents();