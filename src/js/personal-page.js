import { UserCard } from './components/Users/UserCard.js';
import { UserPageComponent } from './components/Users/UserPageComponent.js';
import { Posts } from './components/Posts/Posts.js';
import { Post } from './components/Posts/Post.js';

customElements.define('user-card', UserCard);
customElements.define('user-page-component', UserPageComponent);
customElements.define('user-posts', Posts);
customElements.define('user-post', Post);
