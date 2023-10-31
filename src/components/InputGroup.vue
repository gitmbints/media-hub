<script setup>
  const props = defineProps({
    type: String,
    label: String,
    id: String,
    name: String,
    placeholder: String
  })
</script>
<template>
  <div class="flex flex-col">
    <label :for="props.id" class="font-semibold text-sm mb-1">{{ props.label }}</label>
    <input
      :id="props.id"
      class="w-full bg-transparent border border-solid border-slate-400 p-2.5 rounded font-normal text-xs"
      :type="props.type"
      :name="props.name"
      :placeholder="props.placeholder"
    />
  </div>
</template>