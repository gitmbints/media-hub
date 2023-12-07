import { ref } from "vue";
import useSupabase from "./UseSupabase";

const user = ref(null);

export default function useAuthUser() {
	const { supabase } = useSupabase();

	const signInWithEmailAndPassword = async ({ email, password }) => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) throw new Error(error);

			user.value = data.user;

			return user;
		} catch (error) {
			console.error(error.message);
		}
	};

	const loginWithSocialProvider = (provider) => {};

	const logout = async () => {
		try {
			const { error } = await supabase.auth.signOut();

			if (error) throw new Error(error);
		} catch (error) {
			console.error(error.message);
		}
	};

	const isUserLoggedIn = () => {
		return !!user.value;
	};

	const signUp = async ({ email, password }) => {
		try {
			const { error } = await supabase.auth.signUp({ email, password });

			if (error) throw new Error(error);
		} catch (error) {
			console.error(error.message);
		}
	};

	const updateUserProfile = async (data) => {};

	const sendEmailToResetPassword = async (email) => {};

	return {
		user,
		signInWithEmailAndPassword,
		loginWithSocialProvider,
		logout,
		isUserLoggedIn,
		signUp,
		updateUserProfile,
		sendEmailToResetPassword,
	};
}
