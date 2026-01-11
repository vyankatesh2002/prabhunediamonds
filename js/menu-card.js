// Menu Card Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const openMenuBtn = document.getElementById('openMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const menuCard = document.getElementById('menuCard');

    if (openMenuBtn && closeMenuBtn && menuCard) {
        // Open menu card
        openMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            menuCard.classList.add('active');
        });

        // Close menu card
        closeMenuBtn.addEventListener('click', function() {
            menuCard.classList.remove('active');
        });

        // Close menu card when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuCard.contains(e.target) && !openMenuBtn.contains(e.target)) {
                menuCard.classList.remove('active');
            }
        });

        // Close menu card when clicking on menu links
        const menuLinks = menuCard.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuCard.classList.remove('active');
            });
        });
    }
});
