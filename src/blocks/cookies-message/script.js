import Cookies from 'js-cookie';

export function showCookieMessage() {
    let style = document.createElement('style'),
        stylesContent = `
            .cookies-block {
                position: fixed;
                z-index: 9999;
                bottom: 0;
                right: 0;
                background: rgba(20,77,111,70%);
                padding: 20px;
                color: #fff;
                display: flex;
                align-items: center;
                max-width: 360px;
            }
            
            .cookies-block p {
                margin: 0;
                font-size: 12px;
            }
            
            .cookies-block a{
                color: inherit;
                text-decoration: underline;
            }
            
            .cookies-block a:hover {
                text-decoration: none;
            }
            
            .cookies-block button {
                width: 40px;
                height: 40px;
                flex-shrink: 0;
                font-size: 12px;
                background: #fff;
                border: 0;
                color: #000;
                margin-left: 10px;
            }
            
            .cookies-block button:hover {
            
                background: #000;
                color: #fff;
            }`;

    style.innerHTML = stylesContent

    let cookieBlock = document.createElement('div'),
        text = '<p>Наш Сайт использует <a target="_blank" href="/privacy_policy/">cookie-файлы</a> ' +
            'для того, чтобы отличить Вас от других пользователей нашего ресурса. Нажмите OK.</p>',
        btn = document.createElement('button');
    btn.innerText = 'OK'
    cookieBlock.classList = 'cookies-block'
    cookieBlock.innerHTML = text
    cookieBlock.insertAdjacentElement('beforeend', btn);

    btn.addEventListener('click', () => {
        document.querySelector('.cookies-block').remove();
        Cookies.set('message', '1', { expires: 365 })
    })
    document.body.insertAdjacentElement('beforeend', cookieBlock)
    document.body.insertAdjacentElement('beforeend', style)
}
