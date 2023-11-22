<script setup>
import AvatarProfile from "@/components/AvatarProfile.vue";
import { HomeIcon } from "@heroicons/vue/24/outline";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "vue-router";
import useAuthUser from "../composable/UseAuthUser";

const { logout } = useAuthUser();
const router = useRouter();

const handleLogOut = async () => {
	await logout();
	router.push({
		name: "SignIn",
	});
};
</script>

<template>
	<header
		class="border border-solid border-x-0 border-t-0 border-slate-400 flex items-center justify-between px-8 py-3 text-sm">
		<div>
			<router-link to="/" class="flex items-center space-x-2">
				<HomeIcon class="h-6 w-6" />
				<span>Accueil</span>
			</router-link>
		</div>
		<DropdownMenu>
			<DropdownMenuTrigger>
				<AvatarProfile />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Mon compte</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem @click="handleLogOut">Déconnexion</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</header>
	<main class="pt-10">
		<slot></slot>
	</main>
</template>
