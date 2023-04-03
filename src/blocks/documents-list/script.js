(function () {

    const fetchDocuments = async (url) => {
        const response = await fetch(url)
        return response.text()
    }

    const documentsContainer = document.querySelector('.js-documents')
    if (documentsContainer) {
        const filtersBtns = document.querySelectorAll('.filter__btn')
        if (filtersBtns.length) {
            filtersBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const url = btn.dataset.url
                    fetchDocuments(url)
                        .then(data => documentsContainer.innerHTML = data)
                })
            })
        }
    }
})()