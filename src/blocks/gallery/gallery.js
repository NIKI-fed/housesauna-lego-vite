let currentSlide = 0;

    const slides = document.querySelectorAll('.gallery__slide');
    const thumbs = document.querySelectorAll('.gallery__thumb');
    const prevBtn = document.querySelector('.gallery__nav--prev');
    const nextBtn = document.querySelector('.gallery__nav--next');
    const counters = document.querySelectorAll('.gallery__counter--text');
    
    function goToSlide(index) {
        slides[currentSlide].classList.remove('gallery__slide--active');
        thumbs[currentSlide].classList.remove('gallery__thumb--active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('gallery__slide--active');
        thumbs[currentSlide].classList.add('gallery__thumb--active');

        updateCounters()
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }
    
    // Кнопки
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Индикаторы
    thumbs.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Счётчик
    function updateCounters() {
        counters.forEach((index) => {
            index.textContent = `${currentSlide + 1} / ${slides.length}`;
        });
    }