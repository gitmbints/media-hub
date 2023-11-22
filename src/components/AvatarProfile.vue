<script setup>
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
</script>

<template>
	<Avatar>
		<AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
		<AvatarFallback>A</AvatarFallback>
	</Avatar>
</template>
