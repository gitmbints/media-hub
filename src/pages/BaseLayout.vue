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
import useAuthUser from "@/composable/UseAuthUser";
import { inject } from "vue";

const { logout } = useAuthUser();
const router = useRouter();

const { username } = inject("username");

const handleLogOut = async () => {
	await logout();
	router.push({
		name: "SignIn",
	});
};
</script>

<template>
	<header
		class="border border-solid border-x-0 border-t-0 border-slate-200 py-3 text-sm"
	>
		<div class="max-w-7xl mx-auto flex items-center justify-between">
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
					<DropdownMenuLabel>Paramètre de compte</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<router-link to="/account">
						<DropdownMenuItem>Mon compte</DropdownMenuItem>
						<span class="text-xs text-gray-400 px-2">{{ username }}</span>
					</router-link>
					<DropdownMenuSeparator />
					<DropdownMenuItem @click="handleLogOut">Déconnexion</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</header>
	<main class="max-w-7xl mx-auto pt-10 px-6">
		<slot></slot>
	</main>
</template>
