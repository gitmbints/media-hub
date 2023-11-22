<script setup>
import useAuthUser from "../composable/UseAuthUser";

defineProps({
	name: String,
});

console.log(name);

const { user } = useAuthUser();
const MEDIA_URL = `https://lybippqhemldffwoqxyd.supabase.co/storage/v1/object/public/media/${user.value.id}/${name}`;
</script>
<template>
	<div class="w-full h-full">
		<img :src="MEDIA_URL" class="w-full h-full object-cover" />
	</div>
</template>
