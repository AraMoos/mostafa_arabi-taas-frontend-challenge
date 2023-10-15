import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuth = defineStore("auth", () => {
  const username = ref("");
  const accessToken = ref("");

  function isLoggedin() {
    return false;
  }

  return { username, accessToken, isLoggedin };
});
