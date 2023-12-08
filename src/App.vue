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
		const [userData] = profile.value;
		username.value = userData.username;
	} catch (error) {
		console.error(error.message);
	}
};

/**
 * TODO : Refactor and improve this function
 */
const updateUsername = async () => {
	try {
		const newUsername = username.value;

		await getUsername();

		const { data, error } = await supabase
			.from("Profile")
			.upsert({ id: profile.value[0].id, username: newUsername })
			.select();

		if (error) {
			throw new Error(error);
		}

		username.value = data[0].username;
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
