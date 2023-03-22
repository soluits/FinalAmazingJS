// Codigo Viejo propio, me pareció mas practico el forEach

// function insertCards(){
	// let data_filter = events.filter(element => element.date);
	// let card = '';
	// let cardWrite = document.getElementById("cards");
		// for (let i = 0; i < data_filter.length; i++) {
			// card += `<li class="cards_item">
						// <div class="card">
							// <div class="card_image">
          // <img src="${data_filter[i].image}" alt="${data_filter[i].name}" />
          // <span class="card_price btn btn-light img-shadow btn-light-custom"><span>$</span>${data_filter[i].price}</span>
        // </div>
        // <div class="card_content">
          // <h2 class="card_title">${data_filter[i].name}</h2>
          // <div class="card_text">
            // <p>${data_filter[i].description}
            // </p>
			// <p>
								// <a href="detailEvent.html?id=${data_filter[i].id}" class="btn btn-light img-shadow btn-light-custom">See more</a>
			// </p> 
          // </div>
        // </div>
      // </div>
    // </li>
			// `;
		// }
		// cardWrite.innerHTML = card;
// }
// if(window.location.pathname=="/index.html" ){
	// insertCards();
// }

// Cards
const cardsContainer = document.getElementById('cards');

let pastEvents = []

  function filtrarArrayFecha(array){
      for(let i = 0; i < array.length; i++){
          if(array[i].date > currentDate){
              pastEvents.push(array[i])
          }
      }   
  }




function insertCards(arrayEvents){
	if(arrayEvents.length === 0){
		  console.log("narnia")
		  cardsContainer.innerHTML = `
		              <div class="d-flex align-items-center justify-content-center vh-50" style="margin:  0 auto;">
            <div class="text-center">
                <h1 class="display-1 fw-bold">Not Found</h1>
                <p class="fs-3"> <span class="text-danger">Ups!</span> terms not found.</p>
                <a href="index.html" class="btn btn-primary">Go Home</a>
            </div>
        </div>

		  `
        return 

    }
	let card = '';
	 arrayEvents.filter(element => element.date < currentDate).forEach(e =>{
		 card += `<li class="cards_item">
						<div class="card">
							<div class="card_image">
          <img src="${e.image}" alt="${e.name}" />
          <span class="card_price btn btn-light img-shadow btn-light-custom custom-past">Event ended on: ${e.date}</span>
        </div>
        <div class="card_content">
          <h2 class="card_title">${e.name}</h2>
          <div class="card_text">
            <p>${e.description}
            </p>
            
			<p>
								<a href="detailEvent.html?id=${e._id}" class="btn btn-light img-shadow btn-light-custom">See more</a>
			</p> 
          </div>
        </div>
      </div>
    </li>
			`
	   });
			cardsContainer.innerHTML = card;
}


setTimeout(function () {
    insertCards(events);

}, 300);


//filtros
//search
const input = document.querySelector('input');

function filterSearch(arrayEvents, inputText){
    let arrayFiltered = arrayEvents.filter(e => e.name.toLowerCase().includes(inputText.toLowerCase()));
    return arrayFiltered;
}

const containerCheckbox = document.getElementById('containerCheckbox');

function crearCheckboxes(arrayEvents){
    let checks = ''
    let categoriasRepe = arrayEvents.map(elemento => elemento.category)
    let categorias = new Set(categoriasRepe.sort((a,b)=>{
        if(a>b){
            return 1
        }
        if(a<b){
            return -1
        }
        return 0
    }))
    categorias.forEach(elemento =>{
        checks += `<div class="form-check form-check-inline">
        <input class="form-check-input form-check-inline border-custom" type="checkbox" id="${elemento}" value="${elemento}">
        <label class="form-check-label" for="${elemento}">${elemento}</label>
      </div>`
    })
    containerCheckbox.innerHTML = checks
}

setTimeout(function () {
crearCheckboxes(events);

}, 300);


function filtrarPorCategoria(arrayEvents){
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayChecks = Array.from(checkboxes)
    let checksChecked = arrayChecks.filter(check => check.checked)
    if(checksChecked.length == 0){
        return arrayEvents
    }
    let checkValues = checksChecked.map(check => check.value)
    let arrayFiltrado = arrayEvents.filter(elemento => checkValues.includes(elemento.category))
    return arrayFiltrado
}

input.addEventListener('input',()=>{
    let f1 = filterSearch(events, input.value);
    let f2 = filtrarPorCategoria(f1);
	setTimeout(function () {
    insertCards(f2);

}, 300);

})

containerCheckbox.addEventListener('change',()=>{
    let f1 = filterSearch(events, input.value);
    let f2 = filtrarPorCategoria(f1);
    setTimeout(function () {
    insertCards(f2);

}, 300);
}) 
