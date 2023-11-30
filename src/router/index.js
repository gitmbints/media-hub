import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import SignUp from "../pages/SignUp.vue";
import SignIn from "../pages/SignIn.vue";
import EmailConfirmation from "../pages/EmailConfirmation.vue";
import useAuthUser from "../composable/UseAuthUser";
import Account from "../pages/Account.vue";

const routes = [
	{
		name: "Home",
		path: "/",
		meta: {
			requiresAuth: true,
		},
		component: Home,
	},
	{
		name: "SignUp",
		path: "/sign-up",
		component: SignUp,
	},
	{
		name: "SignIn",
		path: "/sign-in",
		component: SignIn,
	},
	{
		name: "Logout",
		path: "/logout",
		beforeEnter: async () => {
			const { logout } = useAuthUser();
			await logout();
			return { name: "Home" };
		},
	},
	{
		name: "EmailConfirmation",
		path: "/email-confirmation",
		component: EmailConfirmation,
	},
	{
		name: "Account",
		path: "/account",
		meta: {
			requiresAuth: true,
		},
		component: Account,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to) => {
	// here we check if the user is logged in
	// if they aren't and the route requries auth we redirect to the login page
	const { isUserLoggedIn } = useAuthUser();
	if (
		!isUserLoggedIn() &&
		to.meta.requiresAuth &&
		!Object.keys(to.query).includes("fromEmail")
	) {
		return { name: "SignIn" };
	}
});

export default router;
