import { ref } from "vue";

const user = ref(null);

export default function useAuthUser() {
  const loginWithEmailAndPassword = async ({ email, password }) => {};

  const loginWithSocialProvider = (provider) => {};

  const logout = async () => {};

  const isUserLoggedIn = () => {};

  const signUp = async ({ email, password, ...meta }) => {};

  const updateUserProfile = async (data) => {};

  const sendEmailToResetPassword = async (email) => {};

  return {
    user,
    loginWithEmailAndPassword,
    loginWithSocialProvider,
    logout,
    isUserLoggedIn,
    signUp,
    updateUserProfile,
    sendEmailToResetPassword
  }
}