import { ref } from "vue";
import { defineStore } from "pinia";
import router from "@/router";
import axios from "axios";
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
    return new Promise<boolean>((resolve) => {
      localStorage.setItem("@accessToken", token);
      axios
        .get(`/data?request=user`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          if (res.status == 200) {
            const {
              data: { login, avatar_url },
            } = res;
            const authUser: User = {
              username: login,
              accessToken: token,
              avatarUrl: avatar_url,
            };
            user.value = authUser;
            callback();
            resolve(true);
          } else {
            logOut();
            resolve(false);
          }
        })
        .catch(() => {
          logOut();
          resolve(false);
        });
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
