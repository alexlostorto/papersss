async function getComponent(name) {
	let component = await fetch(`assets/components/${name}.html`);

	return component.text()
}

class Navbar extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = await getComponent('navbar');
    }
}

class Footer extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = await getComponent('footer');
    }
}


customElements.define("app-navbar", Navbar);
customElements.define("app-footer", Footer);