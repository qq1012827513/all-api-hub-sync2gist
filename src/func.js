import axios from "axios";

function genAxios(token) {
  return axios.create({
    baseURL: "https://api.github.com",
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      per_page: 100,
      Authorization: `Bearer ${token}`,
    },
  });
}
const DESC = "All API Hub to Gist";
const FILENAME = "ALL_AI_HUB.json";
async function uploadToGist(jsonData, token) {
  const res = await genAxios(token).get("/gists");
  if (res.data.length === 0) {
    return createGist(jsonData, token);
  }
  for (const item of res.data) {
    if (item.description === DESC) {
      return updateGist(item.id, jsonData, token);
    }
    return createGist(jsonData, token);
  }
}
async function updateGist(gistId, jsonData, token) {
  return genAxios(token).patch(`/gists/${gistId}`, {
    description: DESC,
    public: false,
    files: {
      [FILENAME]: {
        content: Buffer.from(jsonData, 'utf-8').toString('base64'),
      },
    },
  });
}

async function createGist(jsonData, token) {
  return genAxios(token).post("/gists", {
    description: DESC,
    public: false,
    files: {
      [FILENAME]: {
        content: Buffer.from(jsonData, 'utf-8').toString('base64'),
      },
    },
  });
}

async function getGist(token) {
  const res = await genAxios(token).get("/gists");
  for (const item of res.data) {
    if (item.description === DESC) {
      const res = await genAxios(token).get("/gists/" + item.id)
      return Buffer.from(res.data.files[FILENAME].content, 'base64').toString('utf-8');
    }
  }
}

export { getGist, uploadToGist };
