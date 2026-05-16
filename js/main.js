document.addEventListener('DOMContentLoaded', () => {
    /*==================== TOGGLE ICON NAVBAR ====================*/
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    /*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    window.onscroll = () => {
        let top = window.scrollY;

        sections.forEach(sec => {
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
            }
        });

        /*==================== STICKY NAVBAR ====================*/
        let header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 100);

        /*==================== REMOVE TOGGLE ICON AND NAVBAR WHEN CLICK NAVBAR LINK ====================*/
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    };

    /*==================== THEME TOGGLE ====================*/
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (!prefersDark) {
        document.documentElement.setAttribute('data-theme', 'light');
        updateThemeIcon('light');
    }

    themeToggleBtn.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        let targetTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
        
        updateThemeIcon(targetTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.classList.remove('bx-sun');
            themeIcon.classList.add('bx-moon');
        } else {
            themeIcon.classList.remove('bx-moon');
            themeIcon.classList.add('bx-sun');
        }
    }

    /*==================== TYPED.JS ====================*/
    const isArabic = document.documentElement.lang === 'ar';
    const strings = isArabic 
        ? ['مطور واجهات أمامية', 'مبرمج ريأكت', 'مصمم مواقع']
        : ['Front-End Developer', 'React Developer', 'Web Designer'];

    const typed = new Typed('.multiple-text', {
        strings: strings,
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });

    /*==================== ANIMATE PROGRESS BARS ON SCROLL ====================*/
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress');
    let animated = false;

    window.addEventListener('scroll', () => {
        if (!animated && window.scrollY + window.innerHeight >= skillsSection.offsetTop + 100) {
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            animated = true;
        }
    });
});
