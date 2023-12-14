<script setup>
import { provide, watch, ref } from "vue";
import useSupabase from "@/composable/UseSupabase";
import useAuthUser from "./composable/UseAuthUser";

const { user } = useAuthUser();
const { supabase } = useSupabase();

const profile = ref([]);
const username = ref(null);

const getUsername = async () => {
	try {
		const { data, error } = await supabase
			.from("Profile")
			.select("*")
			.eq("user_id", user.value.id);

		if (error) {
			throw new Error(error);
		}

		profile.value = data;
		const userProfile = profile.value.find(Boolean);
		username.value = userProfile.username;
	} catch (error) {
		console.error(error.message);
	}
};

const updateUsername = async (newUsername) => {
	try {
		if (!profile.value.length) {
			console.error("User profile is not loaded.");
			return;
		}

		const userProfile = profile.value.find(Boolean);

		if (!userProfile.id) {
			console.error("User profile ID not found.");
			return;
		}

		const { error } = await supabase
			.from("Profile")
			.upsert({ id: userProfile.id, username: newUsername });

		if (error) {
			throw new Error(error);
		}

		username.value = newUsername;
	} catch (error) {
		console.error(error.message);
	}
};

watch(user, async () => {
	if (user.value) {
		await getUsername();
	}
});

provide("username", {
	username,
	updateUsername,
});
</script>

<template>
	<router-view></router-view>
</template>
