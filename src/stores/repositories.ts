import { ref } from "vue";
import { defineStore } from "pinia";
import { Octokit } from "octokit";
import { useAuth } from "@/stores/auth";

const auth = useAuth();

export const useRepositories = defineStore("repositories", () => {
  const initArray: Array<object> = [];
  const reposList = ref(initArray);
  const branchesList = ref(initArray);
  const commitsList = ref(initArray);
  const commitsLoading = ref(true);
  const lastPage = ref(false);
  const currentRepo = ref({});
  const currentBranch = ref({});

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
        const list: Array<object> = [];
        data.map((el: any) => {
          list.push({ id: el.id, text: el.name });
        });
        reposList.value = list;
        if (list.length) setCurrentRepo(list[0]);
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
        const list: Array<object> = [];

        data.map((el: any) => {
          list.push({ id: el.commit.sha, text: el.name });
        });
        branchesList.value = list;
        if (list.length) setCurrentBranch(list[0]);
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }
  async function getCommits(
    repo: string,
    sha: string,
    pagination = { per_page: 20, page: 1 },
    loadMore = false
  ) {
    return new Promise<boolean>(async (resolve) => {
      const octokit = new Octokit({
        auth: auth.accessToken,
      });
      if (!loadMore) commitsLoading.value = true;
      if (pagination.page === 1) {
        commitsList.value = [];
        lastPage.value = false;
      }
      try {
        // Octokit request to get login
        const { data } = await octokit.request(
          `GET /repos/${auth.username}/${repo}/commits?sha=${sha}&per_page=${pagination.per_page}&page=${pagination.page}`
        );
        if (!data.length) lastPage.value = true;
        data.map((el: any) => {
          const item = el.commit;
          item.html_url = el.html_url;
          commitsList.value.push(item);
        });
        console.log(commitsList.value);
        commitsLoading.value = false;
        resolve(true);
      } catch (error) {
        commitsLoading.value = false;
        resolve(false);
      }
    });
  }

  function setCurrentRepo(current: object) {
    currentRepo.value = current;
  }
  function setCurrentBranch(current: object) {
    currentBranch.value = current;
  }

  return {
    reposList,
    commitsList,
    branchesList,
    currentRepo,
    currentBranch,
    commitsLoading,
    lastPage,
    getRepos,
    getBranches,
    getCommits,
    setCurrentRepo,
    setCurrentBranch,
  };
});
