<script setup>
defineProps({
	userId: String,
	fileName: String,
});

defineEmits(["deleteMedia"]);

const MEDIA_URL =
	"https://lybippqhemldffwoqxyd.supabase.co/storage/v1/object/public/media/";
</script>
<template>
	<div class="relative group w-full h-full rounded overflow-hidden">
		<img
			:src="MEDIA_URL + '/' + userId + '/' + fileName"
			class="w-full h-full aspect-auto"
		/>
		<span
			class="absolute bg-black/20 inset-0 hidden group-hover:grid place-items-center"
		>
			<button
				@click="$emit('deleteMedia', fileName)"
				class="border border-solid border-white p-1 rounded bg-transparent font-semibold text-white text-xs text-center"
			>
				Effacer
			</button>
		</span>
	</div>
</template>
