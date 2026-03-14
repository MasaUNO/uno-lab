import { createClient } from "tinacms/dist/client";
import { queries } from "../../tina/__generated__/types";

const branch =
  (import.meta as any).env.VITE_GITHUB_BRANCH ||
  (import.meta as any).env.VITE_VERCEL_GIT_COMMIT_REF ||
  (import.meta as any).env.VITE_HEAD ||
  "main";

const clientId = (import.meta as any).env.VITE_TINA_CLIENT_ID || "undefined";
const token = (import.meta as any).env.VITE_TINA_TOKEN || "undefined";

const isLocal = typeof window !== 'undefined' 
  ? (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('.local'))
  : true;

export const client = createClient({
  url: isLocal 
    ? "http://localhost:4001/graphql" 
    : `https://content.tinajs.io/content/${clientId}/github/${branch}`,
  token: token,
  queries,
});

export default client;
