<script setup>
import { computed } from "vue";

const props = defineProps({
	type: String,
	label: String,
	id: String,
	name: String,
	placeholder: String,
	modelValue: String,
});

const emit = defineEmits({
	"update:modelValue": null,
});

const value = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit("update:modelValue", value);
	},
});
</script>
<template>
	<div class="flex flex-col">
		<label :for="props.id" class="font-semibold text-sm mb-1">{{
			props.label
		}}</label>
		<input
			:id="props.id"
			class="w-full bg-transparent border border-solid border-slate-400 p-2.5 rounded font-normal text-xs"
			:type="props.type"
			:name="props.name"
			:placeholder="props.placeholder"
			v-model="value"
		/>
	</div>
</template>
