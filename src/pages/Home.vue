<script setup>
import { computed, onMounted, ref } from "vue";
import useAuthUser from "../composable/UseAuthUser";
import BaseLayout from "./BaseLayout.vue";
import { Badge } from "@/components/ui/badge";
import UploadButton from "@/components/UploadButton.vue";
import useSupabase from "@/composable/UseSupabase";
import Media from "@/components/Media.vue";
import { toast } from "vue3-toastify";

const session = ref();

const { user } = useAuthUser();
const { supabase } = useSupabase();

const file = ref(null);
const medias = ref([]);
const isLoading = ref(true);

const getFile = async () => {
	try {
		const { data, error } = await supabase.storage
			.from("media")
			.list(`${user.value.id}/store`, {
				limit: 100,
				offset: 0,
				sortBy: { column: "created_at", order: "asc" },
			});

		if (error) {
			console.error(error);
		}

		medias.value = data;
		isLoading.value = false;
	} catch (error) {
		console.error(error.message);
	}
};

const storeAndGetFile = async () => {
	await storeMediaToSupabase(file.value);
	await getFile();
};

const uploadFile = async (event) => {
	file.value = event.target.files[0];
	toast.promise(
		storeAndGetFile,
		{
			pending: "Loading...",
			success: "Fichier ajouté avec succès !",
			error: "Erreur lors de l'ajout du fichier !",
		},
		{
			position: toast.POSITION.BOTTOM_RIGHT,
		}
	);
};

async function storeMediaToSupabase(file) {
	try {
		const { error } = await supabase.storage
			.from("media")
			.upload(`${user.value.id}/store/${file.name}`, file);

		if (error) {
			console.log(error);
		}
	} catch (error) {
		console.error(error.message);
	}
}

const deleteMedia = async (fileName) => {
	try {
		const { error } = await supabase.storage
			.from("media")
			.remove([`${user.value.id}/store/${fileName}`]);

		if (error) {
			console.error(error);
		}

		toast.promise(
			getFile,
			{
				pending: "Loading...",
				success: "Fichier supprimé avec succès !",
				error: "Erreur lors de la suppression du fichier !",
			},
			{
				position: toast.POSITION.BOTTOM_RIGHT,
			}
		);
	} catch (error) {
		console.error(error.message);
	}
};

const mediasCount = computed(() => {
	return medias.value.length;
});

const imagesCount = computed(() => {
	const images = medias.value.filter((media) => {
		return media.metadata.mimetype.includes("image/");
	});

	return images.length;
});

onMounted(async () => {
	await getFile();

	supabase.auth.getSession().then(({ data }) => {
		session.value = data.session;
	});

	supabase.auth.onAuthStateChange((_, _session) => {
		session.value = _session;
	});
});
</script>

<template>
	<div v-if="session">
		<BaseLayout>
			<div class="flex flex-row">
				<aside
					class="basis-2/12 pr-4 py-4 border border-solid border-t-0 border-l-0 border-b-0 border-slate-200"
				>
					<ul class="flex flex-col space-y-2">
						<li class="flex items-center justify-between p-1">
							<span>Tous</span>
							<Badge class="bg-emerald-400">{{ mediasCount }}</Badge>
						</li>
						<li class="flex items-center justify-between p-1">
							<span>Images</span>
							<Badge class="bg-emerald-400">{{ imagesCount }}</Badge>
						</li>
						<li class="flex items-center justify-between p-1">
							<span>Vidéos</span>
							<Badge class="bg-emerald-400">0</Badge>
						</li>
					</ul>
				</aside>
				<div
					class="basis-10/12 p-4 pl-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 place-items-center"
				>
					<UploadButton @upload-file="uploadFile" />
					<p v-if="isLoading">Loading...</p>
					<p v-else-if="mediasCount === 0">Aucun media sauvegardé</p>
					<Media
						v-else
						v-for="media in medias"
						:key="media.name"
						:fileName="media.name"
						:user-id="user.id"
						@delete-media="deleteMedia"
					/>
				</div>
			</div>
		</BaseLayout>
	</div>
</template>
