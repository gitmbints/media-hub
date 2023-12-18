<script setup>
const props = defineProps({
	type: {
		type: String,
		default: "Button",
	},
});
</script>

<template>
	<button
		:type="props.type"
		class="w-full border-none bg-emerald-400 py-2.5 px-6 rounded font-medium text-center text-xs text-white transition hover:bg-emerald-500"
	>
		<slot></slot>
	</button>
</template>
