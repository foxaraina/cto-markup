import {slideDown, slideUp} from '../../js/helpers/helpers';
import {gsap} from 'gsap';

(function (){
    // Навигация
    let header = document.querySelector('.header');
    let menuToggle = header.querySelector('.js-menu-toggle');

    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        header.classList.toggle('menu-open');
        menuToggle.classList.toggle('is-active');
        document.body.classList.toggle('lock');
        let menuBlock = document.querySelector('.menu');
        if (menuToggle.classList.contains('is-active')) {
            document.body.classList.add('lock');
            slideDown(menuBlock);
            setTimeout(() => {
                let delay = 0.05;
                menuBlock.querySelectorAll('.nav__block').forEach((item) => {

                    gsap.fromTo(item, {x: '0%', y: '20%', autoAlpha: 0}, {
                        x: '0%',
                        y: '0',
                        duration: .6,
                        autoAlpha: 1,
                        overwrite: 'auto',
                        ease: 'power3.out',
                        delay: delay
                    });

                    delay += 0.05;
                });
            }, 300);


        } else {
            document.body.classList.remove('lock');
            slideUp(menuBlock);
        }
    });
})()