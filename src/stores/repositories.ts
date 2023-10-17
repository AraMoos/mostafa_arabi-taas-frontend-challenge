import { ref } from "vue";
import { defineStore } from "pinia";
import { Octokit } from "octokit";
import { useAuth } from "@/stores/auth";

const auth = useAuth();

export const useRepositories = defineStore("repositories", () => {
  let initArray: Array<object> = [];
  const reposList = ref(initArray);
  const branchesList = ref(initArray);
  const commitsList = ref(initArray);

  // Methods
  async function getRepos() {
    return new Promise<boolean>(async (resolve) => {
      const octokit = new Octokit({
        auth: auth.accessToken,
      });
      try {
        // Octokit request to get login
        const { data } = await octokit.request(
          `GET /users/${auth.username}/repos`
        );
        let list: Array<object> = [];
        data.map((el: any) => {
          list.push({ id: el.id, value: el.name });
        });
        reposList.value = list;
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }

  async function getBranches(repo: string) {
    return new Promise<boolean>(async (resolve) => {
      const octokit = new Octokit({
        auth: auth.accessToken,
      });
      try {
        // Octokit request to get login
        const { data } = await octokit.request(
          `GET /repos/${auth.username}/${repo}/branches`
        );
        let list: Array<object> = [];

        data.map((el: any) => {
          list.push({ id: el.commit.sha, value: el.name });
        });
        branchesList.value = list;
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }

  return { reposList, commitsList, branchesList, getRepos,getBranches };
});
