import axios from "axios";

const gitAxios = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    per_page: 100,
    //todo: add your token here
    Authorization: `Bearer `,
  },
});
const DESC = "All API Hub to Gist";
const FILENAME = "ALL_AI_HUB.json";
async function uploadToGist(jsonData) {
  const res = await gitAxios.get("/gists");
  for (const item of res.data) {
    if (item.description === DESC) {
      return updateGist(item.id, jsonData);
    }
    return createGist(jsonData);
  }
}
async function updateGist(gistId, jsonData) {
  return gitAxios.patch(`/gists/${gistId}`, {
    description: DESC,
    public: false,
    files: {
      [FILENAME]: {
        content: jsonData,
      },
    },
  });
}

async function createGist(jsonData) {
  return gitAxios.post("/gists", {
    description: DESC,
    public: false,
    files: {
      [FILENAME]: {
        content: jsonData,
      },
    },
  });
}

async function getGist() {
  const res = await gitAxios.get("/gists");
  for (const item of res.data) {
    if (item.description === DESC) {
      const res = await gitAxios.get("/gists/" + item.id)
      return res.data.files[FILENAME].content;
    }
  }
}

export { getGist, uploadToGist };
