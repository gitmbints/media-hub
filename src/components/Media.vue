<script setup>
defineProps({
	userId: String,
	fileName: String,
});

defineEmits(["deleteMedia"]);

const MEDIA_URL =
	"https://lybippqhemldffwoqxyd.supabase.co/storage/v1/object/public/media";
</script>
<template>
	<div class="relative group w-full h-40 rounded overflow-hidden">
		<img
			:src="MEDIA_URL + '/' + userId + '/store/' + fileName"
			class="w-full h-full object-cover"
		/>
		<span
			class="absolute bg-black/20 inset-0 hidden group-hover:grid place-items-center"
		>
			<button
				@click="$emit('deleteMedia', fileName)"
				class="border border-solid border-white py-1 px-2 rounded bg-transparent font-semibold text-white text-xs text-center hover:bg-white/20 transition"
			>
				Effacer
			</button>
		</span>
	</div>
</template>
