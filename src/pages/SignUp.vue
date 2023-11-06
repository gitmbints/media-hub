<script setup>
import vector from "../assets/images/vector.svg";
import InputGroup from "../components/InputGroup.vue";
import Button from "../components/Button.vue";
import { ref } from "vue";
import useAuthUser from "../composable/UseAuthUser";
import { useRouter } from "vue-router";

const router = useRouter();
const { signUp } = useAuthUser();

const user = ref({
	email: "",
	password: "",
});

const handleSubmit = async () => {
	try {
		await signUp(user.value);

		/**
		 * Redirect the user to EmailConfirmation page
		 * to instruct the user to confirm his email
		 */
		router.push({
			name: "EmailConfirmation",
			query: { email: user.value.email },
		});
	} catch (error) {
		console.error(error.message);
		alert(error.message);
	}
};
</script>

<template>
	<h1 class="font-bold text-center text-4xl">Media Hub</h1>
	<div class="w-full max-w-2xl mx-auto my-10">
		<div class="w-full max-w-sm mx-auto mb-10">
			<img :src="vector" alt="camera" />
		</div>
		<form @submit.prevent="handleSubmit" class="flex flex-col space-y-5">
			<InputGroup
				v-model="user.email"
				type="email"
				label="Email"
				id="email"
				name="email"
				placeholder="Adresse e-mail" />
			<InputGroup
				v-model="user.password"
				type="password"
				label="Mot de passe"
				id="password"
				name="password"
				placeholder="Mot de passe" />
			<Button type="submit"> Créez un compte </Button>
		</form>
		<p class="mt-5">
			Avez-vous déjà un compte ?
			<router-link to="/sign-in" class="link">Se connecter</router-link>
		</p>
	</div>
</template>
