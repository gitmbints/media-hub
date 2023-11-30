<script setup>
import { PlusIcon } from "@heroicons/vue/24/outline";

defineEmits(["uploadFile"]);
</script>
<template>
	<label class="relative block border border-solid border-slate-400 rounded">
		<input
			type="file"
			@change="$emit('uploadFile', $event)"
			name="upload-file"
			id=""
			accept="image/*, video/*"
			class="w-full text-transparent file:border-transparent file:text-transparent file:bg-transparent file:h-40 cursor-pointer"
		/>
		<PlusIcon
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 cursor-pointer"
		/>
	</label>
</template>
