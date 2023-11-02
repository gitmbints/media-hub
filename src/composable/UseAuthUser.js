import { ref } from "vue";
import useSupabase from "./UseSupabase";

const user = ref(null);

export default function useAuthUser() {
	const { supabase } = useSupabase();

	const signInWithEmailAndPassword = async ({ email, password }) => {};

	const loginWithSocialProvider = (provider) => {};

	const logout = async () => {};

	const isUserLoggedIn = () => {};

	const signUp = async ({ email, password, ...meta }) => {};

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
