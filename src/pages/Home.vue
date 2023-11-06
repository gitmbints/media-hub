<script setup>
import useAuthUser from "../composable/UseAuthUser";
import Button from "../components/Button.vue";
import { useRouter } from "vue-router";

const { user, logout } = useAuthUser();
const router = useRouter();

const handleLogOut = async () => {
	await logout();
	router.push({
		name: "SignIn",
	});
};
</script>

<template>
	<div v-if="user">
		<h1 class="text-center text-4xl font-bold">Bienvenue sur Media Hub !!</h1>
		<Button @click="handleLogOut">Deconnexion</Button>
	</div>
</template>
