import { ref } from "vue";
import { defineStore } from "pinia";
import { useAuth } from "@/stores/auth";
import axios from "axios";
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
    return new Promise<boolean>((resolve) => {
      axios
        .get(`/data?request=users/${auth.user.username}/repos`, {
          headers: { Authorization: `Bearer ${auth.user.accessToken}` },
        })
        .then(async (res) => {
          if (res.status == 200) {
            const { data } = res;
            const list: Array<Repository> = [];
            data.forEach((el: any) => {
              list.push({ id: el.id, name: el.name });
            });
            reposList.value = list;
            if (list.length) setCurrentRepo(list[0]);
            resolve(true);
          } else {
            auth.logOut();
            resolve(false);
          }
        })
        .catch(() => {
          auth.logOut();
          resolve(false);
        });
    });
  }

  function getBranches(repo: string) {
    return new Promise<boolean>((resolve) => {
      axios
        .get(`/data?request=repos/${auth.user.username}/${repo}/branches`, {
          headers: { Authorization: `Bearer ${auth.user.accessToken}` },
        })
        .then(async (res) => {
          if (res.status == 200) {
            const { data } = res;
            const list: Array<Branch> = [];
            data.forEach((el: any) => {
              list.push({ id: el.commit.sha, name: el.name });
            });
            branchesList.value = list;
            if (list.length) setCurrentBranch(list[0]);
            resolve(true);
          } else {
            auth.logOut();
            resolve(false);
          }
        })
        .catch(() => {
          auth.logOut();
          resolve(false);
        });
    });
  }
  function getCommits(
    repo: string,
    sha: string,
    pagination = { per_page: 20, page: 1 },
    loadMore = false
  ) {
    return new Promise<boolean>((resolve) => {
      if (!loadMore) commitsLoading.value = true;
      if (pagination.page === 1) {
        commitsList.value = [];
        lastPage.value = false;
      }
      const request = encodeURIComponent(
        `repos/${auth.user.username}/${repo}/commits?sha=${sha}&per_page=${pagination.per_page}&page=${pagination.page}`
      );
      axios
        .get(`/data?request=${request}`, {
          headers: { Authorization: `Bearer ${auth.user.accessToken}` },
        })
        .then(async (res) => {
          if (res.status === 200) {
            const { data } = res;
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
          } else {
            auth.logOut();
            resolve(false);
          }
        })
        .catch(() => {
          commitsLoading.value = false;
          auth.logOut();
          resolve(false);
        });
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
