(function (){
        let scrollPosition = 0;

        function removeModal(modal) {
            modal.classList.remove('show');
            document.documentElement.classList.remove('md-perspective');
            window.scrollTo({top: scrollPosition});
        }

        function removeModalHandler(modal) {
            removeModal(modal);
        }

        document.querySelectorAll('.modal-trigger').forEach(function (el, i) {

            const modal = document.querySelector('#' + el.getAttribute('data-modal')),
                  close = modal.querySelector('.modal__close');

            el.addEventListener('click', function (e) {
                scrollPosition = document.documentElement.scrollTop
                modal.classList.add('show');

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
                            let modalCloseBtn = document.createElement('button')
                            modalCloseBtn.classList = 'modal__close js-modal-close'
                            modalCloseBtn.innerHTML = '<svg class="icon icon-close">\n' +
                                '                                <use xlink:href="img/sprite.svg#close"></use>\n' +
                                '                            </svg>'
                            contentBlock.innerHTML = '';
                            contentBlock.insertAdjacentElement('afterbegin', modalCloseBtn)
                            contentBlock.insertAdjacentHTML('beforeend', data);
                            modalCloseBtn.addEventListener('click', () => {
                                removeModalHandler(modal);
                            })
                        });
                }

            });

            close.addEventListener('click', function (e) {
                removeModalHandler(modal);
            });

            document.addEventListener('keyup', (e) => {
                if (e.key === "Escape") {
                    removeModalHandler(modal);
                }
            })

            // document.addEventListener('click', (e) => {
            //     let activeModal = document.querySelector('.modal.show');
            //     let container = activeModal.querySelector('.modal__inner');
            //     console.log(container)
            //     if (container && !(container.contains(e.target))) {
            //         removeModalHandler(activeModal);
            //     }
            // })

        });
})();