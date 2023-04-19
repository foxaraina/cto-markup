(function () {
    const forms = document.querySelectorAll('.fetch-form');

    const cleanInput = (formFields) => {
        formFields.forEach(control => {
            if (formFields.type !== 'hidden') {
                control.value = '';
            }
        });

    };

    const successSend = (form) => {
        form.insertAdjacentHTML('beforebegin',
            `<div class="btn btn--md btn--green mt-xs-20">Сообщение успешно отправлено. Менеджер свяжется с вами в ближайшее время.</div>`);

    };

    const handleFormSubmit = async (form) => {
        let data = new FormData(form);
        let formFields = form.querySelectorAll('input, textarea');

        try {
            formFields.forEach(control => {
                control.addEventListener('input', () => {
                    let parent = control.parentElement;
                    if (parent.classList.contains('error')) {
                        parent.classList.remove('error');
                        parent.querySelector('.error-message').remove();
                    }
                });
            });

            let response = await fetch(form.getAttribute('action'),
                {
                    method: 'POST',
                    body: data
                });

            let responseData = await response.json();

            if (!responseData.errors.length) {
                successSend(form);
                cleanInput(formFields);

            } else {
                responseData.errors.map(err => {
                    if (err.includes('email')) {
                        let formGroup = form.querySelector('[type="mail"]').parentNode;
                        formGroup.classList.add('error');
                        formGroup.insertAdjacentHTML('beforeend', `<div class="error-message">${err}</div>`);
                    }
                });
            }

            return responseData;

        } catch (e) {
            console.log(e.message);
        }
    };

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleFormSubmit(form);
        });
    });
})();