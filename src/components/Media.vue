<script setup>
defineProps({
	userId: String,
	name: String,
});

const MEDIA_URL =
	"https://lybippqhemldffwoqxyd.supabase.co/storage/v1/object/public/media/";
</script>
<template>
	<div class="w-full h-full rounded overflow-hidden">
		<img
			:src="MEDIA_URL + '/' + userId + '/' + name"
			class="w-full h-full object-cover" />
	</div>
</template>
