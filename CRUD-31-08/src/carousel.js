export const setupCarousels = () => {
    // 1. Seleciona todas as seções de carrossel
    const carouselSections = document.querySelectorAll('.carousel-section');
    carouselSections.forEach(section => {
        // 2. Encontra os elementos do carrossel dentro de cada seção
        const carousel = section.querySelector('.carousel-container');
        const scrollbarContainer = section.querySelector('.carousel-scrollbar-container');
        const scrollbarThumb = section.querySelector('.carousel-scrollbar-thumb');
        const prevBtn = section.querySelector('.prev-btn');
        const nextBtn = section.querySelector('.next-btn');
        if (!carousel || !prevBtn || !nextBtn || !scrollbarContainer || !scrollbarThumb) {
            console.error('Um ou mais elementos do carrossel não foram encontrados nesta seção.');
            return;
        }
        const updateThumbPosition = () => {
            const scrollableDistance = carousel.scrollWidth - carousel.clientWidth;
            const scrollbarTrackWidth = scrollbarContainer.clientWidth;

            const thumbWidth = (carousel.clientWidth / carousel.scrollWidth) * scrollbarTrackWidth;
            scrollbarThumb.style.width = `${thumbWidth}px`;

            const thumbTravelDistance = scrollbarTrackWidth - thumbWidth;
            const thumbPosition = (carousel.scrollLeft / scrollableDistance) * thumbTravelDistance;
            
            scrollbarThumb.style.transform = `translateX(${thumbPosition}px)`;
        };
        // Adiciona a lógica para os botões de navegação, agora baseada na largura da card
        // para rolar exatamente 4 cards por vez.
        prevBtn.addEventListener('click', () => {
            const cardElement = carousel.querySelector('.card');
            if (cardElement) {
                const cardWidth = cardElement.offsetWidth;
                const scrollAmount = (cardWidth * 4) + (1.5 * 16); // 1.5rem = 24px, 16px por padrão
                carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });
        nextBtn.addEventListener('click', () => {
            const cardElement = carousel.querySelector('.card');
            if (cardElement) {
                const cardWidth = cardElement.offsetWidth;
                const scrollAmount = (cardWidth * 4) + (1.5 * 16);
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
        // Adiciona a lógica da barra de rolagem personalizada
        carousel.addEventListener('scroll', updateThumbPosition);

        let isDragging = false;
        scrollbarThumb.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const containerRect = scrollbarContainer.getBoundingClientRect();
            let newThumbPosition = e.clientX - containerRect.left;
            newThumbPosition = Math.max(0, Math.min(newThumbPosition, containerRect.width));
            const scrollPosition = (newThumbPosition / containerRect.width) * (carousel.scrollWidth - carousel.clientWidth);
            carousel.scrollLeft = scrollPosition;
        });
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
        scrollbarContainer.addEventListener('click', (e) => {
            const containerRect = scrollbarContainer.getBoundingClientRect();
            const clickPosition = e.clientX - containerRect.left;
            const scrollPosition = (clickPosition / containerRect.width) * (carousel.scrollWidth - carousel.clientWidth);
            carousel.scrollLeft = scrollPosition;
        });
        updateThumbPosition();
    });
};