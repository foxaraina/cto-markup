import IMask from 'imask';
import 'lazysizes';
import Swiper, {Autoplay, Navigation, Pagination} from 'swiper';
import {gsap} from 'gsap';
import {preloadImages} from './utils';
import {Preview} from './preview';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import {Flip} from 'gsap/Flip';
gsap.registerPlugin(Flip);
import lightGallery from 'lightgallery';
import bvi from "bvi"
import '../blocks/faq/script';
import '../blocks/navigation/script';
import '../blocks/modal/script';
import '../blocks/map/script';
import '../blocks/documents-list/script';
import '../blocks/sliders/script';
import '../blocks/first-screen/script';

new isvek.Bvi({
    target: '.js-special-version',
    fontSize: 24,
    theme: 'black'
});

//add simple support for background images:
document.addEventListener('lazybeforeunveil', function (e) {
    let bg = e.target.getAttribute('data-bg');
    if (bg) {
        e.target.style.backgroundImage = 'url(' + bg + ')';
    }
});
document.addEventListener('DOMContentLoaded', () => {

    lightGallery(document.getElementById('lightgallery'), {
        speed: 500,
        selector: '.document-card'
    });

    const previewElems = [...document.querySelectorAll('.parallax')];
    const previewItems = [];

    previewElems.forEach((item, pos) => {
        previewItems.push(new Preview(item));
    });

    function animateFrom(elem, direction) {
        direction = direction | 1;

        let x = 0,
            y = direction * 100;

        let optionsFrom = {x: x, y: y, autoAlpha: 0};

        let optionsTo = {
            duration: 1.25,
            x: 0,
            y: 0,
            autoAlpha: 1,
            ease: 'expo',
            overwrite: 'auto'
        };

        if (elem.classList.contains('scroll-animate-fadeLeftToRight')) {
            x = -100;
            y = 0;
            optionsFrom.width = 0;
            optionsTo.width = '100%';
        } else if (elem.classList.contains('gs_reveal_fromRight')) {
            x = 100;
            y = 0;
        }
        gsap.fromTo(elem, optionsFrom, optionsTo);
    }

    function hide(elem) {
        gsap.set(elem, {autoAlpha: 0});
    }

    const animateOnScroll = () => {

        let reveals = gsap.utils.toArray('.scroll-animate');
        for (let i = 0; i < reveals.length; i++) {
            (function () {
                let elem = reveals[i];
                hide(elem); // assure that the element is hidden when scrolled into view

                ScrollTrigger.create({
                    trigger: elem,
                    onEnter: function () {
                        animateFrom(elem);
                    },
                    // onEnterBack: function () {
                    //     animateFrom(elem, -1);
                    // },
                    // onLeave: function () {
                    //     hide(elem);
                    // } // assure that the element is hidden when scrolled into view
                });
            })();
        }

        for (const item of previewItems) {

            gsap.set(item.DOM.imageInner, {transformOrigin: '50% 0%'});

            item.scrollTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: item.DOM.el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            })
                .addLabel('start', 0)
                .to(item.DOM.title, {
                    ease: 'none',
                    y: (item.DOM.imageWrap.offsetHeight - item.DOM.title.offsetHeight)/2.5 + 'px'
                }, 'start')
                .to(item.DOM.imageInner, {
                    ease: 'none',
                    scaleY: 1.3,
                    scaleX: 1.3,
                }, 'start');
        }

    };

    preloadImages('.parallax__img-inner').then(_ => {
        animateOnScroll();
    });

    let animateIcons = document.querySelectorAll('.js-animate-icon')
    if (animateIcons.length) {
        animateIcons.forEach(item => {

            item.addEventListener('mouseenter', () => {
                gsap.fromTo(item.querySelector('.base'), {y: '0%', x: '0%'}, {
                    x: '102%',
                    y: '102%',
                    duration: .6,
                    ease: 'power3.out',
                    delay: .05
                });

                gsap.fromTo(item.querySelector('.clone'), {x: '-102%', y: '-102%'}, {
                    y: '0%',
                    x: '0%',
                    duration: .6,
                    ease: 'power3.out',
                    delay: .2
                });
            });
        });
    }

    let btnsWithIcon = document.querySelectorAll('.btn-with-icon');
    if (btnsWithIcon.length) {
        btnsWithIcon.forEach(item => {
            let iconContainer = item.querySelector('.btn-with-icon__sign');
            let icon = iconContainer.querySelector('.btn-with-icon__wrapper');
            let clone = icon.cloneNode(true);
            clone.classList.add('clone');
            icon.classList.add('base');
            iconContainer.insertAdjacentElement('beforeend', clone);

            item.addEventListener('mouseenter', () => {
                gsap.fromTo(item.querySelector('.base'), {x: '0%', y: '0%'}, {
                    x: '0%',
                    y: '102%',
                    duration: .6,
                    ease: 'power3.out',
                    delay: .05
                });

                gsap.fromTo(item.querySelector('.clone'), {x: '0%', y: '-102%'}, {
                    y: '0%',
                    x: '0%',
                    duration: .6,
                    ease: 'power3.out',
                    delay: .2
                });
            });
        });
    }

    // Фиксированная шапка
    let header = document.querySelector('.header');
    document.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    });

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
                    setTimeout(() => {
                        articlesSlider.querySelector('.articles-gallery-slider__wrapper').style.minHeight = swiper.height + 'px';
                    }, 1000);
                },
            },
        });
    }

    // Анимация в блоке обратного звонка
    const callBackBtn = document.querySelector('.callback .btn');
    if (callBackBtn) {
        callBackBtn.addEventListener('mouseover', () => {
            callBackBtn.closest('.callback').classList.add('active');
        });

        callBackBtn.addEventListener('mouseleave', () => {
            callBackBtn.closest('.callback').classList.remove('active');
        });
    }

    // Маска телефона
    function initMasks(element) {
        let phoneMask = new IMask(element, {
            mask: '+7 (000)000-00-00',
            lazy: true,  // make placeholder always visible
            placeholderChar: '_'     // defaults to '_'
        });
    }
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(item => {
        item.addEventListener('focus', () => {
            initMasks(item);
        });
    });

    /*Scroll top button*/
    const btnScrollTop = document.querySelector('#button-scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollTop > 300) {
            btnScrollTop.classList.add('show');
        } else {
            btnScrollTop.classList.remove('show');
        }
    });
    btnScrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // Анимация раздвигающихся блоков
    let sections = [...document.querySelectorAll('.section-grey'), ...document.querySelectorAll('.section-white')];
    if (sections.length) {
        sections.forEach(section => {
            let leftBlock = document.createElement('div');
            leftBlock.classList.add('section-left');
            let rightBlock = document.createElement('div');
            rightBlock.classList.add('section-right');

            section.insertAdjacentElement('beforeend', rightBlock);
            section.insertAdjacentElement('afterbegin', leftBlock);
            let top = section.offsetTop;
            let left = section.offsetLeft;
            let x = 0;

            let scrollPos = 0;

            window.addEventListener('scroll', function () {

                if ((document.body.getBoundingClientRect()).top > scrollPos) {
                    if (x > 0) {
                        x -= 0.5;
                        leftBlock.style.transform = `translateX(-${x}px)`;
                        rightBlock.style.transform = `translateX(${x}px)`;
                    }
                } else {
                    if (document.documentElement.scrollTop > top - window.innerHeight / 2) {
                        if (x < left) {
                            x += 0.5;
                            leftBlock.style.transform = `translateX(-${x}px)`;
                            rightBlock.style.transform = `translateX(${x}px)`;
                        }
                    }
                }
                scrollPos = (document.body.getBoundingClientRect()).top;
            });

            window.addEventListener('scroll', () => {

            });
        });
    }

});


