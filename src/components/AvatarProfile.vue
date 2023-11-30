<script setup>
import useAuthUser from "@/composable/UseAuthUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { onMounted } from "vue";
import useFetchFile from "@/composable/UseFetchFile";

const { user } = useAuthUser();
const { profile, getProfile } = useFetchFile();

const MEDIA_URL =
	"https://lybippqhemldffwoqxyd.supabase.co/storage/v1/object/public/media";

onMounted(async () => {
	await getProfile();
});
</script>

<template>
	<Avatar class="border border-solid border-slate-400">
		<AvatarImage
			v-if="profile[0]"
			:src="MEDIA_URL + '/' + user.id + '/profile/' + profile[0].name"
			alt="Profile image"
		/>
		<AvatarFallback v-else>A</AvatarFallback>
	</Avatar>
</template>
