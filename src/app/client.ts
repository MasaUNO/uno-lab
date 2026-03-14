import { createClient } from "tinacms/dist/client";
import { queries } from "../../tina/__generated__/types";

const branch =
  import.meta.env.VITE_GITHUB_BRANCH ||
  import.meta.env.VITE_VERCEL_GIT_COMMIT_REF ||
  import.meta.env.VITE_HEAD ||
  "main";

const clientId = import.meta.env.VITE_TINA_CLIENT_ID || (import.meta.env as any).NEXT_PUBLIC_TINA_CLIENT_ID || "undefined";
const token = import.meta.env.VITE_TINA_TOKEN || (import.meta.env as any).TINA_TOKEN || "undefined";

if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
  console.log("Tina Client Config:", { 
    branch, 
    hasClientId: clientId !== "undefined", 
    hasToken: token !== "undefined" 
  });
}

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
