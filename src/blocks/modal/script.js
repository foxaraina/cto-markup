(function (){
    const ModalEffects = () => {

        const overlay = document.querySelector('.modal__overlay');
        let scrollPosition = 0;

        [].slice.call(document.querySelectorAll('.modal-trigger')).forEach(function (el, i) {

            const modal = document.querySelector('#' + el.getAttribute('data-modal')),
                close = modal.querySelector('.modal__close');

            function removeModal(hasPerspective) {
                modal.classList.remove('show');

                if (hasPerspective) {
                    document.documentElement.classList.remove('md-perspective');
                }

                window.scrollTo({top: scrollPosition});
            }

            function removeModalHandler() {
                removeModal(el.classList.contains('md-setperspective'));
            }

            el.addEventListener('click', function (ev) {
                scrollPosition = document.documentElement.scrollTop
                modal.classList.add('show');
                overlay.removeEventListener('click', removeModalHandler);
                overlay.addEventListener('click', removeModalHandler);

                if (el.classList.contains('md-setperspective')) {
                    setTimeout(function () {
                        document.documentElement.classList.add('md-perspective');
                    }, 25);
                }

                if (el.classList.contains('ajax-modal')) {
                    fetch(el.dataset.path)
                        .then(response => response.text())
                        .then(data => {
                            let contentBlock = modal.querySelector('.modal__content');
                            contentBlock.innerHTML = '';
                            contentBlock.insertAdjacentHTML('afterbegin', '<button class="modal__close js-modal-close" type="button">\n' +
                                '                            <svg class="icon icon-close">\n' +
                                '                                <use xlink:href="img/sprite.svg#close"></use>\n' +
                                '                            </svg>\n' +
                                '                        </button>')
                            contentBlock.insertAdjacentHTML('beforeend', data);
                        });
                }

            });

            close.addEventListener('click', function (ev) {
                ev.stopPropagation();
                removeModalHandler();
            });

        });

    };
    ModalEffects();
})()