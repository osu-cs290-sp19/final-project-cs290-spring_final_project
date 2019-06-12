// === MODAL INTERACTION === //
var openModalButton = document.querySelector('.sell-pet-button');
var closeModalButton = document.querySelector('.modal-close-button');
var modalBackdrop = document.querySelector('#modal-backdrop');
var sellPetModal = document.querySelector('#sell-pet-modal');
var sellPetButton = document.querySelector('.sell-pet-submit');
closeModalButton.addEventListener('click', function(){
	modalBackdrop.classList.add('hidden');
	sellPetModal.classList.add('hidden');
})

openModalButton.addEventListener('click', function(){
	modalBackdrop.classList.remove('hidden');
	sellPetModal.classList.remove('hidden');
})

sellPetButton.addEventListener('click', function(){
	//Still needs to check if forms are filled before closing
	modalBackdrop.classList.add('hidden');
	sellPetModal.classList.add('hidden');
})

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
