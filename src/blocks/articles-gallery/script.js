import Swiper, {Autoplay, Navigation, Pagination} from 'swiper';

(function() {
    // Слайдер на главной и в списке новостей
    const articlesSlider = document.querySelector('.articles-gallery-slider');
    if (articlesSlider) {

        const swiperGallery = new Swiper('.article-swiper', {
            modules: [Navigation, Pagination, Autoplay],
            slidesPerView: 'auto',
            loop: true,
            speed: 800,
            autoplay: {
                delay: 3000,
            },
            navigation: {
                nextEl: articlesSlider.querySelector('.swiper-button-next'),
                prevEl: articlesSlider.querySelector('.swiper-button-prev'),
            },
            on: {
                afterInit: function (swiper) {
                    if (swiper.slides.length <= 4) {
                        swiper.slides.forEach(slide => {
                            swiper.slidesEl.insertAdjacentElement('beforeend', slide.cloneNode(true))
                        })
                    }

                    setTimeout(() => {
                        articlesSlider.querySelector('.articles-gallery-slider__wrapper').style.minHeight = swiper.height + 'px';
                    }, 1000);
                },
            },
        });
    }
})()