<script setup>
import { onMounted, ref } from "vue";
import useAuthUser from "../composable/UseAuthUser";
import BaseLayout from "./BaseLayout.vue";
import { Badge } from "@/components/ui/badge";
import UploadButton from "@/components/UploadButton.vue";
import useSupabase from "@/composable/UseSupabase";

const { user } = useAuthUser();
const { supabase } = useSupabase();

const file = ref(null);
const medias = ref([]);
const MEDIA_URL =
	"https://lybippqhemldffwoqxyd.supabase.co/storage/v1/object/public/media/";

const uploadFile = async (event) => {
	file.value = event.target.files[0];
	await storeMediaToSupabase(file.value);
	await getFile();
};

async function storeMediaToSupabase(file) {
	try {
		const { error } = await supabase.storage
			.from("media")
			.upload(`${user.value.id}/${file.name}`, file);

		if (error) {
			console.log(error);
		}
	} catch (error) {
		console.error(error.message);
	}
}

const getFile = async () => {
	try {
		const { data, error } = await supabase.storage
			.from("media")
			.list(`${user.value.id}/`, {
				limit: 100,
				offset: 0,
				sortBy: { column: "name", order: "asc" },
			});

		if (error) {
			console.error(error);
		}
		medias.value = data;
	} catch (error) {
		console.error(error.message);
	}
};

onMounted(async () => {
	await getFile();
});
</script>

<template>
	<div v-if="user">
		<BaseLayout>
			<div class="flex flex-row">
				<aside
					class="basis-2/12 pr-4 py-4 border border-solid border-t-0 border-l-0 border-b-0 border-slate-400">
					<ul class="flex flex-col space-y-2">
						<li class="flex items-center justify-between p-1">
							<span>Tous</span>
							<Badge class="bg-emerald-400">16</Badge>
						</li>
						<li class="flex items-center justify-between p-1">
							<span>Images</span>
							<Badge class="bg-emerald-400">10</Badge>
						</li>
						<li class="flex items-center justify-between p-1">
							<span>Vidéos</span>
							<Badge class="bg-emerald-400">6</Badge>
						</li>
					</ul>
				</aside>
				<div class="basis-10/12 p-4 pl-8 grid grid-cols-6 gap-x-6 gap-y-4">
					<UploadButton @upload-file="uploadFile" />
					<img
						v-for="media in medias"
						:src="MEDIA_URL + '/' + user.id + '/' + media.name"
						class="w-full h-full object-cover" />
				</div>
			</div>
		</BaseLayout>
	</div>
</template>
