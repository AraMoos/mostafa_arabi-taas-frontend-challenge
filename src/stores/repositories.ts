import { ref } from "vue";
import { defineStore } from "pinia";
import { Octokit } from "octokit";
import { useAuth } from "@/stores/auth";
import type Repository from "@/types/Repository";
import type Branch from "@/types/Branch";
import type Commit from "@/types/Commit";
const auth = useAuth();

export const useRepositories = defineStore("repositories", () => {
  const reposList = ref<Array<Repository>>([]);
  const branchesList = ref<Array<Branch>>([]);
  const commitsList = ref<Array<Commit>>([]);
  const commitsLoading = ref(true);
  const lastPage = ref(false);
  const currentRepo = ref<Repository | null>(null);
  const currentBranch = ref<Branch | null>(null);

  // Methods
  function getRepos() {
    return new Promise<boolean>(async (resolve) => {
      const octokit = new Octokit({
        auth: auth.user.accessToken,
      });
      try {
        // Octokit request to get login
        const { data } = await octokit.request(
          `GET /users/${auth.user.username}/repos`
        );
        const list: Array<Repository> = [];
        data.forEach((el: any) => {
          list.push({ id: el.id, name: el.name });
        });
        reposList.value = list;
        if (list.length) setCurrentRepo(list[0]);
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }

  function getBranches(repo: string) {
    return new Promise<boolean>(async (resolve) => {
      const octokit = new Octokit({
        auth: auth.user.accessToken,
      });
      try {
        // Octokit request to get login
        const { data } = await octokit.request(
          `GET /repos/${auth.user.username}/${repo}/branches`
        );
        const list: Array<Branch> = [];

        data.forEach((el: any) => {
          list.push({ id: el.commit.sha, name: el.name });
        });
        branchesList.value = list;
        if (list.length) setCurrentBranch(list[0]);
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }
  function getCommits(
    repo: string,
    sha: string,
    pagination = { per_page: 20, page: 1 },
    loadMore = false
  ) {
    return new Promise<boolean>(async (resolve) => {
      const octokit = new Octokit({
        auth: auth.user.accessToken,
      });
      if (!loadMore) commitsLoading.value = true;
      if (pagination.page === 1) {
        commitsList.value = [];
        lastPage.value = false;
      }
      try {
        // Octokit request to get login
        const { data } = await octokit.request(
          `GET /repos/${auth.user.username}/${repo}/commits?sha=${sha}&per_page=${pagination.per_page}&page=${pagination.page}`
        );
        if (!data.length) lastPage.value = true;
        data.forEach((el: any) => {
          const item: Commit = {
            id: el.sha,
            url: el.html_url,
            message: el.commit.message,
            committer: {
              date: el.commit.committer.date,
              name: el.commit.committer.name,
            },
          };
          item.url = el.html_url;
          commitsList.value.push(item);
        });
        commitsLoading.value = false;
        resolve(true);
      } catch (error) {
        commitsLoading.value = false;
        resolve(false);
      }
    });
  }

  function setCurrentRepo(current: Repository) {
    currentRepo.value = current;
  }
  function setCurrentBranch(current: Branch) {
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
