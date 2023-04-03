(function (){
    // Анимация заголовка на главной странице
    let title = document.querySelector('.first-screen__title');
    if (title) {
        let titleText = title.innerText;
        let titleArr = titleText.split(' ');
        let newTitle = '';
        titleArr.forEach(word => {
            newTitle += `<span class="title-word">${word}</span>`;
        });
        title.innerHTML = newTitle;
        title.style.opacity = '1';
        let yPos = 0;
        let animateCounter = 0;
        title.querySelectorAll('.title-word').forEach(word => {
            if (word.getBoundingClientRect().y > yPos) {
                yPos = word.getBoundingClientRect().y;
                animateCounter++;
            }
            yPos = word.getBoundingClientRect().y;
            word.classList.add('animate-' + animateCounter);
        });
    }
})()