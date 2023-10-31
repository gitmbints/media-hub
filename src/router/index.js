import { createRouter, createWebHistory } from 'vue-router'
import Home from "../pages/Home.vue";
import SignUp from "../pages/SignUp.vue";
import SignIn from "../pages/SignIn.vue";
import EmailConfirmation from "../pages/EmailConfirmation.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home
  },
  {
    name: "SignUp",
    path: "/sign-up",
    component: SignUp
  },
  {
    name: "SignIn",
    path: "/sign-in",
    component: SignIn
  },
  {
    name: "EmailConfirmation",
    path: "/email-confirmation",
    component: EmailConfirmation
  },
];

const router = createRouter({ 
  history: createWebHistory(),
  routes
});

export default router;