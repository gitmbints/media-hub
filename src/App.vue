<script setup>
import { provide, watch, ref } from "vue";
import useSupabase from "@/composable/UseSupabase";
import useAuthUser from "./composable/UseAuthUser";

const { user } = useAuthUser();
const { supabase } = useSupabase();

const username = ref("");

const getUsername = async () => {
	try {
		if (user) {
			const { data, error } = await supabase
				.from("Profile")
				.select("username")
				.eq("user_id", user.value.id);

			if (error) {
				throw new Error(error);
			}

			username.value = data[0]?.username;
		}
	} catch (error) {
		console.error(error.message);
	}
};

const updateUsername = async () => {
	try {
		console.log("update triggered");
	} catch (error) {
		console.error(error.message);
	}
};

provide("username", {
	username,
	updateUsername,
});

watch(user, async () => {
	if (user.value) {
		await getUsername();
	}
});
</script>

<template>
	<router-view></router-view>
</template>
