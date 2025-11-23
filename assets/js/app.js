console.log("jsloaded!!")

 let menuButton = document.getElementById('menuButton');
 let mobileMenu = document.getElementById('mobileMenu');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

 let categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => {
                b.classList.remove('active', 'bg-red-600');
                b.classList.add('bg-[#0D2851]');
            });
            btn.classList.add('active', 'bg-red-600');
            btn.classList.remove('bg-[#0D2851]');
        });
    });