export class BlogComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.getModel();
    }

    getModel() {
        return new Promise((res, rej) => {
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(data => data.json())
            .then((json) => {
                this.renderPosts(json);
                res();
            })
            .catch((error) => rej(error));
        })
    }

    renderPosts(data) {
        data.forEach(user => {
            const userCardElement = document.createElement('user-card');

            const userDetails = {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                website: user.website,
                phone: user.phone,                
            };

            userCardElement.setAttribute('data-user-card', JSON.stringify(userDetails));
            this.appendChild(userCardElement);
        });
    }
}