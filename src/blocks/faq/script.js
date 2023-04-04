import {slideDown, slideUp} from '../../js/helpers/helpers';

(function (){
    // Аккордион вопросы и ответы
    let faqs = document.querySelectorAll('.faq__item-header');
    if (faqs.length) {
        faqs.forEach(function ($faq) {
            $faq.addEventListener('click', function (e) {
                e.preventDefault();
                let activeFaq = document.querySelector('.faq__item.is-active')
                let activeFaqContent = activeFaq && activeFaq.querySelector('.faq__item-content')
                let $downBlock = e.target.closest('.faq__item').querySelector('.faq__item-content');
                $faq.closest('.faq__item').classList.toggle('is-active');
                if ($faq.closest('.faq__item').classList.contains('is-active')) {
                    slideDown($downBlock);
                    if (activeFaq) {
                        slideUp(activeFaqContent);
                        activeFaq.classList.remove('is-active');
                        $downBlock.scrollIntoView({ behavior: "smooth", block: 'center' })
                    }
                } else {
                    slideUp($downBlock);
                }
            });
        });
    }
})()