import { ref } from "vue";
import { defineStore } from "pinia";
import { Octokit } from "octokit";
import router from "@/router";

export const useAuth = defineStore("auth", () => {
  const username = ref("");
  const accessToken = ref("");
  const avatarUrl = ref("");

  // Methods
  function isLoggedin() {
    const token = localStorage.getItem("@accessToken");
    // Create an instance of Octokit with user access token
    if (token) {
      return token;
    } else {
      return null;
    }
  }

  function userSession(token: string, callback: () => void) {
    return new Promise<boolean>(async (resolve) => {
      localStorage.setItem("@accessToken", token);
      const octokit = new Octokit({
        auth: token,
      });
      try {
        // Octokit request to get login
        const {
          data: { login, avatar_url },
        } = await octokit.rest.users.getAuthenticated();
        username.value = login;
        accessToken.value = token;
        avatarUrl.value = avatar_url;
        callback();
        resolve(true);
      } catch (error) {
        logOut();
        resolve(false);
      }
    });
  }

  function logOut() {
    localStorage.removeItem("@accessToken");
    router.push("/auth");
  }

  return {
    username,
    accessToken,
    avatarUrl,
    isLoggedin,
    userSession,
    logOut,
  };
});
