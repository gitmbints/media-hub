<script setup>
import { inject } from "vue";
import useAuthUser from "../composable/UseAuthUser";
import BaseLayout from "./BaseLayout.vue";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { onMounted, ref } from "vue";
import useSupabase from "@/composable/UseSupabase";
import useFetchFile from "@/composable/UseFetchFile";
import InputGroup from "../components/InputGroup.vue";
import Button from "../components/Button.vue";
import { toast } from "vue3-toastify";

const { user } = useAuthUser();
const { supabase } = useSupabase();
const { profile, getProfile } = useFetchFile();
const { username, updateUsername } = inject("username");
const MEDIA_URL =
	"https://lybippqhemldffwoqxyd.supabase.co/storage/v1/object/public/media";

const newUsername = ref("");
const file = ref(null);

const uploadProfile = async (event) => {
	file.value = event.target.files[0];
	await storeMediaToSupabase(file.value);
};

const storeMediaToSupabase = async (file) => {
	try {
		const { error } = await supabase.storage
			.from("media")
			.upload(`${user.value.id}/profile/${file.name}`, file);

		if (error) {
			console.log(error);
		}
	} catch (error) {
		console.error(error.message);
	}
};

const handleUpdateUsername = async () => {
	await updateUsername(newUsername.value);
	newUsername.value = "";
	notify();
};

const notify = () => {
	toast("Nom modifié avec succès !", {
		type: "success",
		position: toast.POSITION.BOTTOM_RIGHT,
	});
};

onMounted(async () => {
	await getProfile();
});
</script>

<template>
	<div v-if="user">
		<BaseLayout>
			<div class="max-w-3xl mx-auto">
				<h1 class="text-4xl mb-1">Mon compte</h1>
				<span class="text-base text-gray-400">{{ username }}</span>
				<div class="flex items-end space-x-3 mt-4">
					<Avatar size="lg" class="border border-solid border-slate-400">
						<AvatarImage
							v-if="profile[0]"
							:src="MEDIA_URL + '/' + user.id + '/profile/' + profile[0].name"
							alt="Profile image"
						/>
						<AvatarFallback v-else>A</AvatarFallback>
					</Avatar>
					<input
						@change="uploadProfile"
						type="file"
						name="upload-profile"
						id="upload-profile"
						accept="image/*"
						class="w-fit text-transparent file:font-['Inter'] file:border-none file:text-white file:bg-emerald-400 file:hover:bg-emerald-500 file:transition file:py-2.5 file:px-6 file:rounded file:font-medium file:text-xs cursor-pointer"
					/>
				</div>
				<form
					@submit.prevent="handleUpdateUsername"
					class="mt-10 flex flex-col justify-center space-y-5"
				>
					<InputGroup
						type="text"
						label="Nouveau nom"
						id="username"
						name="username"
						placeholder="Nouveau nom ici..."
						v-model="newUsername"
					/>
					<Button type="submit" class="!w-fit">Enregister</Button>
				</form>
			</div>
		</BaseLayout>
	</div>
</template>
