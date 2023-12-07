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

const { user } = useAuthUser();
const { supabase } = useSupabase();
const { profile, getProfile } = useFetchFile();

const { username, updateUsername } = inject("username");

const file = ref(null);
const MEDIA_URL =
	"https://lybippqhemldffwoqxyd.supabase.co/storage/v1/object/public/media";

const uploadProfile = async (event) => {
	file.value = event.target.files[0];
	await storeMediaToSupabase(file.value);
};

async function storeMediaToSupabase(file) {
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
}

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
						class="w-fit text-transparent file:border-none file:text-white file:bg-emerald-400 file:p-2.5 file:rounded file:font-medium file:text-sm cursor-pointer"
					/>
				</div>
				<form
					@submit.prevent="updateUsername"
					class="mt-10 flex flex-col justify-center space-y-5"
				>
					<InputGroup
						type="text"
						label="Nom d'utilsateur"
						id="username"
						name="username"
						placeholder="Nom d'utilsateur"
						v-model="username"
					/>
					<Button type="submit">Enregister</Button>
				</form>
			</div>
		</BaseLayout>
	</div>
</template>
