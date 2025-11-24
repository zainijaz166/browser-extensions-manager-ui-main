document.addEventListener('DOMContentLoaded', () => {
    
    // --- Select Elements ---
    const filterButtons = document.querySelectorAll('.boxs');
    const cards = document.querySelectorAll('.container');
    const removeButtons = document.querySelectorAll('.remove');
    const toggles = document.querySelectorAll('.switch input');
    const modeBtn = document.querySelector('.mode-toggle');
    const modeIcon = document.querySelector('.mode');

    // ---  Dark/Light Mode Logic ---
    modeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            modeIcon.src = 'assets/images/icon-moon.svg';
            modeIcon.alt = "dark mode";
        } else {
            modeIcon.src = 'assets/images/icon-sun.svg';
            modeIcon.alt = "light mode";
        }
    });

    // --- Filter Logic (All / Active / Inactive) ---
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterType = btn.innerText.trim();
            applyFilter(filterType);
        });
    });

    function applyFilter(type) {
        cards.forEach(card => {
            const checkbox = card.querySelector('input[type="checkbox"]');
            const isChecked = checkbox.checked;
            
           
            let shouldShow = false;

            if (type === 'All') {
                shouldShow = true;
            } else if (type === 'Active' && isChecked) {
                shouldShow = true;
            } else if (type === 'Inactive' && !isChecked) {
                shouldShow = true;
            }

            // Toggle display
            if (shouldShow) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // --- Live Update on Toggle Switch ---
    toggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            const currentActiveBtn = document.querySelector('.boxs.active');
            applyFilter(currentActiveBtn.innerText.trim());
        });
    });

    //  Remove Button Logic ---
    removeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(confirm("Are you sure you want to remove this extension?")) {
                const card = e.target.closest('.container');
                card.remove();
            }
        });
    });

});