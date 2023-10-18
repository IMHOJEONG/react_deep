const DEFAULT_COLOR = 'black';

export default class HelloWorld extends HTMLElement {

    static get observedAttributes () {
        return ['color']
    }

    get color () {
        return this.getAttribute('color') || DEFAULT_COLOR
    }

    set color (value) {
        this.setAttribute('color', value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(!this.div) {
            return;
        }

        if(name === 'color') {
            this.div.style.color = newValue;
        }
    }

    connectedCallback() {
        window.requestAnimationFrame(()=>{

            const div = document.createElement('div');
            div.textContent = 'Hello World';
            div.style.color = this.color;

            this.innerHTML = '<div>Hello World!</div>';
        });
    }
}