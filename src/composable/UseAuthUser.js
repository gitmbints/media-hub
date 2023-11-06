import { ref } from "vue";
import useSupabase from "./UseSupabase";

const user = ref(null);

export default function useAuthUser() {
	const { supabase } = useSupabase();

	const signInWithEmailAndPassword = async ({ email, password }) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) throw new Error(error);

		user.value = data.user;

		return user;
	};

	const loginWithSocialProvider = (provider) => {};

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
	};

	const isUserLoggedIn = () => {
		return !!user.value;
	};

	const signUp = async ({ email, password }) => {
		const { data, error } = await supabase.auth.signUp({ email, password });

		if (error) throw new Error(error);
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
