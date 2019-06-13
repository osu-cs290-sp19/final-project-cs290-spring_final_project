// === MODAL INTERACTION === //
var openModalButton = document.querySelector('.sell-pet-button');
var closeModalButton = document.querySelector('.modal-close-button');
var modalBackdrop = document.querySelector('#modal-backdrop');
var sellPetModal = document.querySelector('#sell-pet-modal');
var sellPetButton = document.querySelector('.sell-pet-submit');

function hideModal(){
	modalBackdrop.classList.add('hidden');
	sellPetModal.classList.add('hidden');
}

// === LOAD SINGLE PET PRODUCT === //
function loadProduct(petObject){
	var productHTML = Handlebars.templates.product(petObject);
	return productHTML;
}

function clearSection(){
	var sellPetName = document.querySelector('.sell-pet-name');
	var sellPetColor = document.querySelector('.sell-pet-color');
	var sellPetSpecies = document.querySelector('.sell-pet-species');
	var sellPetPicture = document.querySelector('.sell-pet-picture');
	var sellPetPrice = document.querySelector('.sell-pet-price');
	sellPetName.value = "";
	sellPetColor.value = "";
	sellPetSpecies.value = "";
	sellPetPicture.value = "";
	sellPetPrice.value = "";
}

// === SELL PET === //
function handleSellPetClick(){
	var sellPetName = document.querySelector('.sell-pet-name').value.trim();
	var sellPetColor = document.querySelector('.sell-pet-color').value;
	var sellPetSpecies = document.querySelector('.sell-pet-species').value;
	var sellPetPicture = document.querySelector('.sell-pet-picture').value.trim();
	var sellPetPrice = document.querySelector('.sell-pet-price').value.trim();
////
	var request = new XMLHttpRequest();
	var requestURL = '/sellPet';
	request.open('POST', requestURL);

	var petObj = {
		petname: sellPetName,
		petcolor: sellPetColor,
		species: sellPetSpecies,
		url: sellPetPicture,
		petprice: sellPetPrice
	};

	var requestBody = JSON.stringify(petObj);
	console.log('=== Request Body', requestBody);

	request.addEventListener('load', function(event){
		if(event.target.status !== 200){
			var msg = event.target.response;
			alert("Error storing pet data: " + msg);
		}
		else{
			alert("Good");
			var productHTML = loadProduct(petObj);
			var productContainer = document.querySelector('.photo-card-container');
			productContainer.insertAdjacentHTML('beforeend', productHTML);
		}
	});

	request.setRequestHeader('Content-Type', 'application/json');
  request.send(requestBody);
  hideModal();
};

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
	clearSection();
	modalBackdrop.classList.remove('hidden');
	sellPetModal.classList.remove('hidden');
})

sellPetButton.addEventListener('click', function(){
	hideModal();
//	console.log("HWEIURHIUWEHRIUEWHLIRu");
})
