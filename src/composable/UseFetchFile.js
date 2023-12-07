import useSupabase from "@/composable/UseSupabase";
import useAuthUser from "../composable/UseAuthUser";
import { ref } from "vue";

export default function useFecthFile() {
	const { supabase } = useSupabase();
	const { user } = useAuthUser();
	const profile = ref([]);

	const getProfile = async () => {
		try {
			const { data, error } = await supabase.storage
				.from("media")
				.list(`${user.value.id}/profile`, {
					limit: 1,
					offset: 0,
					sortBy: { column: "created_at", order: "desc" },
				});

			if (error) {
				console.error(error);
			}

			profile.value = data;
		} catch (error) {
			console.error(error.message);
		}
	};

	return { profile, getProfile };
}
