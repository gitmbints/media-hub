<script setup>
import vector from "../assets/images/vector.svg";
import InputGroup from "../components/InputGroup.vue";
import Button from "../components/Button.vue";
import { ref } from "vue";
import useAuthUser from "../composable/UseAuthUser";
import { useRouter } from "vue-router";

const user = ref({
	email: "",
	password: "",
});

const { signInWithEmailAndPassword } = useAuthUser();
const router = useRouter();

const handleSignIn = async () => {
	try {
		await signInWithEmailAndPassword(user.value);

		router.push({
			name: "Home",
		});
	} catch (error) {
		console.error(error.message);
	}
};
</script>

<template>
	<div class="grid place-items-center h-screen">
		<h1 class="font-bold text-center text-4xl">Media Hub</h1>
		<div class="w-full max-w-2xl mx-auto my-10">
			<div class="w-full max-w-sm mx-auto mb-10">
				<img :src="vector" alt="camera" />
			</div>
			<form @submit.prevent="handleSignIn" class="flex flex-col space-y-5">
				<InputGroup
					v-model="user.email"
					type="email"
					label="Email"
					id="email"
					name="email"
					placeholder="Adresse e-mail"
				/>
				<InputGroup
					v-model="user.password"
					type="password"
					label="Mot de passe"
					id="password"
					name="password"
					placeholder="Mot de passe"
				/>
				<Button type="submit"> Se connecter </Button>
			</form>

			<div class="mt-2 text-right">
				<a href="#" class="link">Mot de passe oublié ?</a>
			</div>
			<p class="mt-5">
				Pas encore de compte ?
				<router-link to="/sign-up" class="link">Créez-en-un</router-link>
			</p>
		</div>
	</div>
</template>
