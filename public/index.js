// === MODAL INTERACTION === //
var openModalButton = document.querySelector('.sell-pet-button');
var closeModalButton = document.querySelector('.modal-close-button');
var modalBackdrop = document.querySelector('#modal-backdrop');
var sellPetModal = document.querySelector('#sell-pet-modal');
var sellPetButton = document.querySelector('.sell-pet-submit');

var sellPetName = document.querySelector('.sell-pet-name');
var sellPetColor = document.querySelector('.sell-pet-color');
var sellPetSpecies = document.querySelector('.sell-pet-species');
var sellPetPicture = document.querySelector('.sell-pet-picture');

function hideModal(){
	modalBackdrop.classList.add('hidden');
	sellPetModal.classList.add('hidden');
}

// === LOAD PETS === //
function loadProduct(petName, url, specie, colors){
	var petObject = {
		petname: petName,
		species: specie,
		color: colors,
		url: url,
	};

	var productHTML = Handlebars.templates.product(petObject);
	return productHTML;
}

// === SELL PET === //
function handleSellPetClick(){
	var sellPetName = document.querySelector('.sell-pet-name').value.trim();
	var sellPetColor = document.querySelector('.sell-pet-color').value;
	var sellPetSpecies = document.querySelector('.sell-pet-species').value;
	var sellPetPicture = document.querySelector('.sell-pet-picture').value.trim();


	/*
	var request = XMLHttpRequest();
	var requestURL = '/';
	request.open('POST', requestURL);

	var petObj = {
					petName: sellPetName,
					petColor: sellPetColor,
					petSpecies: sellPetSpecies,
					petURL: sellPetPicture,
	};

	var requestBody = JSON.stringify(petObj);
	request.setRequestHeader(
		'Content-Type','application/json'
	);

	request.addEventListener('load', function(event){
		if(event.target.status != 200){
			var msg = event.target.response
			alert("Error storing pet data: " + msg);
		}
	*/

		if(!sellPetName || !sellPetPicture){
			alert("Insert Info!");
		}
		else{
			alert("Good");
			var sellPetSpecies = document.getElementById("species");
			var sellPetColor = document.getElementById("color");
			var species = sellPetSpecies.options[sellPetSpecies.selectedIndex].text;
			var color = sellPetColor.options[sellPetColor.selectedIndex].text;

			var productHTML = loadProduct(sellPetName, sellPetPicture, species, color);
			var productContainer = document.querySelector('.photo-card-container');
			productContainer.insertAdjacentHTML('beforeend', productHTML);
			hideModal();
		}
	//});

	// request.send(requestBody);
}

// === SORTING/NAVIGATION === //
var navItems = document.querySelectorAll('.navitem');
//For each nav item, add event listener
navItems.forEach(function(event){
  event.addEventListener('click', function(){
    //If clicked, add bottom border
    event.classList.add('active');
    //For each nav item, check for equality with border just added
    navItems.forEach(function(item){
      if(item !== event)
        item.classList.remove('active');
    })
  });
});

// === LISTENERS === //
window.addEventListener('DOMContentLoaded', function () {

  var modalAcceptButton = document.querySelector('.sell-pet-submit');
  modalAcceptButton.addEventListener('click', handleSellPetClick);

});


closeModalButton.addEventListener('click', function(){
	hideModal();
})

openModalButton.addEventListener('click', function(){
	modalBackdrop.classList.remove('hidden');
	sellPetModal.classList.remove('hidden');
})

sellPetButton.addEventListener('click', function(){
	hideModal();
})
