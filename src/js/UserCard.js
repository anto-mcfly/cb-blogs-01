const userCardTemplate = document.createElement('template');

userCardTemplate.innerHTML = `
    <article class="user-card">
        <header class="user-card__header">
            <div class="user-card__img__wrapper">
                <img id='user-card-img' class="user-card__img" src="https://via.placeholder.com/150" alt="">
            </div>
        </header>
        <main class="user-card__main">
            <div class="user-card__name__wrapper">
                <span class="user-card__name__label label">
                    name:
                </span>
                <span class="user-card__name">
                    <slot id="user-card-name" name="user-card-name"></slot>
                </span>
            </div>
            <div class="user-card__username__wrapper">
                <span class="user-card__username__label label">
                    username:
                </span>
                <span class="user-card__username">
                    <slot id="user-card-username" name="user-card-username"></slot>
                </span>
            </div>
            <div class="user-card__email__wrapper">
                <span class="user-card__email__label label">
                    email:
                </span>
                <span class="user-card__email">
                    <slot id="user-card-email" name="user-card-email"></slot>
                </span>
            </div>
            <div id='user-card-personal-page-link-wrapper' class="user-card__personal-page__wrapper">
                <span class="user-card__page__label label">
                    page:
                </span>
                <a href='' id="user-card-personalpagelink" class="user-card__personal-page">
                    personal page
                </a>
            </div>
        </main>
        <footer class="user-card__footer">
            <div id='user-card-personal-page-website-wrapper' class="user-card__website__wrapper">
                <span class="user-card__website__label label">
                    website:
                </span>
                <span class="user-card__website">
                    <slot id="user-card-website" name="user-card-website"></slot>
                </span>
            </div>
            <div id='user-card-personal-page-address-wrapper' class="user-card__address__wrapper">
                <span class="user-card__address__label label">
                    address:
                </span>
                <span class="user-card__address">
                    <slot id="user-card-address" name="user-card-address"></slot>
                </span>
            </div>
            <div id='user-card-personal-page-phone-wrapper' class="user-card__phone__wrapper">
                <span class="user-card__phone__label label">
                    phone:
                </span>
                <span class="user-card__phone">
                    <slot id="user-card-phone" name="user-card-phone"></slot>
                </span>
            </div>
        </footer>
    </article>
    <style>
        .user-card__header {
            margin-bottom: 1rem;
        }

        .user-card__img__wrapper {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }

        .user-card__img {
            border-radius: 100%;
        }

        .label {
            font-weight: bold;
        }
    </style>
`;

export class UserCard extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this._shadowRoot.appendChild(userCardTemplate.content.cloneNode(true));
    }

    get isPersonalPage() {
        return this.getAttribute('is-personal-page');
    }
    
    connectedCallback() {
        this.setUserCardDetails();
    }

    setUserCardDetails() {
        const {
            id,
            name,
            username,
            email,
            website,
            phone,
            address
        } = JSON.parse(this.dataset.userCard);
        
        const userCardImgProfileAlt = this._shadowRoot.getElementById('user-card-img');
        const userCardName = this._shadowRoot.getElementById('user-card-name');
        const userCardUserName = this._shadowRoot.getElementById('user-card-username');
        const userCardEmail = this._shadowRoot.getElementById('user-card-email');
        const userCardWebsite = this._shadowRoot.getElementById('user-card-website');
        const userCardPhone = this._shadowRoot.getElementById('user-card-phone');
        const userCardAdddress = this._shadowRoot.getElementById('user-card-address');        
        const userPersonalPageLink = `/user-personal-page.html?id=${id}`;
        const userCardPersonalPageLink = this._shadowRoot.getElementById('user-card-personalpagelink');
        
        const userCardPersonalPageLinkWrapper = this._shadowRoot.getElementById('user-card-personal-page-link-wrapper');
        const userCardAddressWrapper = this._shadowRoot.getElementById('user-card-personal-page-address-wrapper');
        const userCardWebsiteWrapper = this._shadowRoot.getElementById('user-card-personal-page-website-wrapper');
        const userCardPhoneWrapper = this._shadowRoot.getElementById('user-card-personal-page-phone-wrapper');

        userCardImgProfileAlt.alt = `${name} image profile`; 
        
        userCardName.innerHTML = name;
        userCardUserName.innerHTML = username;
        userCardEmail.innerHTML = email;
        userCardWebsite.innerHTML = website;
        userCardPhone.innerHTML = phone;

        if(this.isPersonalPage) {
            userCardPersonalPageLinkWrapper.remove();
            userCardWebsiteWrapper.remove();
            userCardPhoneWrapper.remove();

            userCardAdddress.innerHTML = address;

            const userPostsElement = document.createElement('user-posts');
            userPostsElement.setAttribute('user-id', id);
            this._shadowRoot.appendChild(userPostsElement);
        }
        else {
            userCardAddressWrapper.remove();

            userCardPersonalPageLink.href = userPersonalPageLink;
        }
    }
}