(function (){
        let scrollPosition = 0;
        let activeModal = null;

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
                activeModal = modal

                if (el.classList.contains('md-setperspective')) {
                    setTimeout(function () {
                        document.documentElement.classList.add('md-perspective');
                    }, 25);
                }

                if (el.classList.contains('ajax-modal')) {
                    fetch(el.dataset.path)
                        .then(response => response.text())
                        .then(data => {
                            let contentBlock = modal.querySelector('.modal__body');
                            contentBlock.innerHTML = '';
                            contentBlock.insertAdjacentHTML('beforeend', data);
                        });
                }
            });

            close.addEventListener('click', function (e) {
                removeModalHandler(modal);
            });
        });

    document.addEventListener('keyup', (e) => {
        if (e.key === "Escape" && activeModal) {
            removeModalHandler(activeModal);
        }
    });

    window.addEventListener('click', (e) => {
        e.stopPropagation();
        let containerInner = activeModal && activeModal.querySelector('.modal__inner')
        if (!containerInner.contains(e.target) &&
            !e.target.classList.contains('modal-trigger') &&
            !e.target.closest('.modal-trigger')) {
            removeModalHandler(activeModal);
        }
    })

})();