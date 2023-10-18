import { ref } from "vue";
import { defineStore } from "pinia";
import { Octokit } from "octokit";
import router from "@/router";
import type User from "@/types/User";

export const useAuth = defineStore("auth", () => {
  const user = ref<User>({
    username: "",
    accessToken: "",
    avatarUrl: "",
  });

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
        const authUser: User = {
          username: login,
          accessToken: token,
          avatarUrl: avatar_url,
        };
        user.value = authUser;
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
    user,
    isLoggedin,
    userSession,
    logOut,
  };
});
