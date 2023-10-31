<script setup>
  const props = defineProps({
    type: {
      type: String,
      default: "Button"
    }
  })
</script>

<template>
  <button 
    :type="props.type"
    class="w-full border-none bg-emerald-400 p-2.5 rounded font-medium text-center text-sm text-white transition hover:bg-emerald-500"
  >
    <slot></slot>
  </button>
</template>