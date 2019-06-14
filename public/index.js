// === MODAL INTERACTION === //
var openModalButton = document.querySelector('.sell-pet-button');
var closeModalButton = document.querySelector('.modal-close-button');
var modalBackdrop = document.querySelector('#modal-backdrop');
var sellPetModal = document.querySelector('#sell-pet-modal');
var sellPetButton = document.querySelector('.sell-pet-submit');
var newnew = document.querySelector('product');
var checkButton = document.querySelector('.checkout-cart');


function hideModal(){
	modalBackdrop.classList.add('hidden');
	sellPetModal.classList.add('hidden');
}

var searching = document.getElementById('navbar-search-button');
searching.onclick = searchBox;

function searchBox(){
	var num = 0;
	var searchIn = document.getElementById('navbar-search-input');
	var petName = document.getElementsByClassName('product-text');
	var selections = document.getElementsByClassName('product');
	var searchVal = searchIn.value.toLowerCase();
	if (searchVal == ""){
		clearSearch();
	}
	else{
		clearSearch();
		for(var i = 0; i < selections.length; i++){
			var values = petName[i].textContent;
			if (values.toLowerCase().indexOf(searchVal) == -1){
				selections[i].style.display = 'none';
			}
		}
	}
}


function clearSearch(){
//	console.log(values);
	var selections = document.getElementsByClassName('product');
	for (var k = 0; k < selections.length; k++){
		selections[k].style.display = 'block';
	}
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

// === BUY PET === //
function handleCheckout(){
	console.log("Starting buy!");
	var petsName = document.querySelector('.checkout-title').innerText;
	var request = new XMLHttpRequest();
	var requestURL = '/checkoutPage/buyPet';
	var petObj = {
		petname: petsName
	};

	var requestBody = JSON.stringify(petObj);

	request.open('POST', requestURL);

	request.addEventListener('load', function(event){
		if(event.target.status !== 200){
			var msg = event.target.response;
			alert("Error buying pet: " + msg);
		}
		else{
			alert("Congratulations on your purchase!");
		};
	});

	request.setRequestHeader('Content-Type', 'application/json');
	request.send(requestBody);
};

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
		petspecies: sellPetSpecies,
		url: sellPetPicture,
		petprice: sellPetPrice
	};

	var requestBody = JSON.stringify(petObj);

	request.addEventListener('load', function(event){
		if(event.target.status !== 200){
			var msg = event.target.response;
			alert("Error storing pet data: " + msg);
		}
		else{
			alert("Your pet is now for sale!");
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

if(checkButton){
	checkButton.addEventListener('click', function(){
		handleCheckout();
	})
}

openModalButton.addEventListener('click', function(){
	clearSection();
	modalBackdrop.classList.remove('hidden');
	sellPetModal.classList.remove('hidden');
})

closeModalButton.addEventListener('click', function(){
	hideModal();
})


sellPetButton.addEventListener('click', function(){
	hideModal();
})
