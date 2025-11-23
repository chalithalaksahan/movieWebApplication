console.log("jsloaded!!")

 let menuButton = document.getElementById('menuButton');
 let mobileMenu = document.getElementById('mobileMenu');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

