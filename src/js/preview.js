export class Preview {
    // DOM elements
    DOM = {
        // main element (.preview)
        el: null,
        // image wrap element (.preview__img-wrap)
        imageWrap: null,
        // image element (.preview__img)
        image: null,
        // image inner element (.preview__img-inner)
        imageInner: null,
        // title element (.preview__title)
        title: null,
        // inner title elements (.oh__inner)
        titleInner: null,
        // description element (.preview__desc)
        description: null,
    };

    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        this.DOM.imageWrap = this.DOM.el.querySelector('.parallax__img-wrap');
        this.DOM.image = this.DOM.imageWrap.querySelector('.parallax__img');
        this.DOM.imageInner = this.DOM.image.querySelector('.parallax__img-inner');
        this.DOM.title = this.DOM.el.querySelector('.parallax__content');
    }
}