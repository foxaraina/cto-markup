(function () {
    const Forms = document.querySelectorAll('.fetch-form');

    const cleanInput = (control) => {
        control.value = '';
    };

    Forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            let data = new FormData(form);
            let formFields = form.querySelectorAll('input, textarea');
            let valid = false;
            try {
                formFields.forEach(control => {
                    valid = !control.parentElement.classList.contains('error');
                    if (control.classList.contains('required') && !control.value.length) {
                        control.parentElement.classList.add('error');
                        valid = false;
                    }
                    control.addEventListener('change', () => {
                        let parent = control.parentElement;
                        if (parent.classList.contains('error')) {
                            parent.classList.remove('error');
                        }
                    });
                });

                if (valid) {
                    let response = await fetch(form.action, {method: 'POST', body: data});
                    formFields.forEach(control => cleanInput(control));
                }

            } catch (e) {
                console.log(e.message);
            }
        });
    });
})();