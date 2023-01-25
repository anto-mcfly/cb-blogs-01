const errorTemplate = document.createElement('template');

errorTemplate.innerHTML = `
    <div>there is no id into query string</div>
`;

export class UserPageComponent extends HTMLElement {
    constructor() {
        super();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');

        this._id = undefined;

        if(id !== null && id !== undefined) {
            this._id = id;
        }
        else {
            this._shadowRoot = this.attachShadow({
                mode: 'open'
            });
            this._shadowRoot.appendChild(errorTemplate.content.cloneNode(true));
        }
    }

    connectedCallback() {
        if (this._id === undefined) return;

        this.getModel();
    }

    getModel() {
        return new Promise((res, rej) => {
            fetch(`https://jsonplaceholder.typicode.com/users/${this._id}`)
            .then(data => data.json())
            .then((json) => {
                this.renderUser(json);
                res();
            })
            .catch((error) => rej(error));
        })
    }

    renderUser(data) {
        const userCardElement = document.createElement('user-card');
        const {
            zipcode,
            street,
            city,
            suite
        } = data.address;
        const address = `${suite}, ${street}, ${city}, ${zipcode}`;

        const userDetails = {
            name: data.name,
            username: data.username,
            email: data.email,
            address            
        };

        userCardElement.setAttribute('data-user-card', JSON.stringify(userDetails));
        userCardElement.setAttribute('is-personal-page', true);
        this.appendChild(userCardElement);
    }
}