import { UserCard } from './components/Users/UserCard.js';
import { UserPageComponent } from './components/Users/UserPageComponent.js';
import { Posts } from './components/Posts/Posts.js';
import { Post } from './components/Posts/Post.js';
import { Comments } from './components/Comments/Comments.js';
import { Comment } from './components/Comments/Comment.js';

customElements.define('user-card', UserCard);
customElements.define('user-page-component', UserPageComponent);
customElements.define('user-posts', Posts);
customElements.define('user-post', Post);
customElements.define('post-comments', Comments);
customElements.define('post-comment', Comment);
