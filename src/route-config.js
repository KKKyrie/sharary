import HomePage from './pages/HomePage.vue';
import NoticePage from './pages/NoticePage.vue';
import UserPage from './pages/UserPage.vue';

export default [
	{
		path: '/',
		component: HomePage
	},{
		path: '/notice',
		component: NoticePage
	},{
		path: '/user',
		component: UserPage
	}
];