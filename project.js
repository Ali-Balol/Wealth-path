
//navebar
// Get elements
const sidebarToggle = document.getElementById('sidebarToggle');
const closeSidebar = document.getElementById('closeSidebar');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

// Open sidebar
function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close sidebar
function closeSidebarFunc() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners
sidebarToggle.addEventListener('click', openSidebar);
closeSidebar.addEventListener('click', closeSidebarFunc);
overlay.addEventListener('click', closeSidebarFunc);

// Close sidebar when clicking on a link
sidebarLinks.forEach(link => {
    link.addEventListener('click', closeSidebarFunc);
});

// Close sidebar on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebarFunc();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
//الواجهات
document.addEventListener('DOMContentLoaded', function() {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselDots = document.getElementById('carouselDots');
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
// أضف هذه المتغيرات في البداية//
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

    let currentSlide = 0;
    let isDown = false;
    let startX;
    let scrollLeft;

    // إنشاء الدوائر
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        carouselDots.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    // تحديث الدوائر عند التنقل
    
    // عدّل وظيفة updateDots لتشمل
function updateDots() {
    const scrollPosition = carouselWrapper.scrollLeft;
    const slideWidth = slides[0].offsetWidth + 20;
    currentSlide = Math.round(scrollPosition / slideWidth);
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    updateButtons(); // أضف هذا السطر
}

    // الانتقال لصورة معينة
    function goToSlide(index) {
        const slideWidth = slides[0].offsetWidth + 20;
        carouselWrapper.scrollTo({
            left: slideWidth * index,
            behavior: 'smooth'
        });
    }

    // مراقبة التمرير
    carouselWrapper.addEventListener('scroll', function() {
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(updateDots, 50);
    });

    // السحب بالماوس
    carouselWrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        carouselWrapper.style.cursor = 'grabbing';
        startX = e.pageX - carouselWrapper.offsetLeft;
        scrollLeft = carouselWrapper.scrollLeft;
    });

    carouselWrapper.addEventListener('mouseleave', () => {
        isDown = false;
        carouselWrapper.style.cursor = 'grab';
    });

    carouselWrapper.addEventListener('mouseup', () => {
        isDown = false;
        carouselWrapper.style.cursor = 'grab';
    });

    carouselWrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carouselWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        carouselWrapper.scrollLeft = scrollLeft - walk;
    });

    // دعم اللمس للهواتف
    let touchStartX = 0;
    let touchEndX = 0;

    carouselWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });


    function handleSwipe() {
        if (touchEndX < touchStartX - 50 && currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        }
        if (touchEndX > touchStartX + 50 && currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    }
    // أضف هذه الوظيفة
function updateButtons() {
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

    updateDots();
    // أضف في نهاية الكود قبل });
    prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    }
});
});
// FTA
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    faqItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
});