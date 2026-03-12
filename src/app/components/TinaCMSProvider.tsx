import { ReactNode } from "react";
import { TinaCMS, TinaProvider } from "tinacms";

// TinaCMS configuration for future integration with GitHub and Vercel
const cms = new TinaCMS({
  enabled: false, // Set to true when you're ready to enable editing
  sidebar: {
    position: "displace",
  },
  toolbar: {
    buttons: {
      save: "Save",
      reset: "Reset",
    },
  },
});

interface TinaCMSProviderProps {
  children: ReactNode;
}

export function TinaCMSProvider({ children }: TinaCMSProviderProps) {
  return <TinaProvider cms={cms}>{children}</TinaProvider>;
}

// Note: To fully integrate TinaCMS with GitHub and Vercel:
// 1. Create a .tina folder in your project root
// 2. Set up tina/config.ts with your schema definitions
// 3. Configure GitHub backend in your TinaCMS config
// 4. Add environment variables to Vercel:
//    - GITHUB_PERSONAL_ACCESS_TOKEN
//    - TINA_PUBLIC_CLIENT_ID
//    - TINA_TOKEN
// 5. Run `npx @tinacms/cli init` to set up the project
// 6. Deploy to Vercel with the TinaCMS integration

/* Example schema structure for reference:

import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  schema: {
    collections: [
      {
        name: "news",
        label: "News",
        path: "content/news",
        fields: [
          { type: "string", name: "title", label: "Title", required: true },
          { type: "datetime", name: "date", label: "Date" },
          { type: "string", name: "excerpt", label: "Excerpt" },
          { type: "rich-text", name: "content", label: "Content" },
          { type: "image", name: "image", label: "Image" },
        ],
      },
      {
        name: "members",
        label: "Members",
        path: "content/members",
        fields: [
          { type: "string", name: "name", label: "Name" },
          { type: "string", name: "role", label: "Role" },
          { type: "string", name: "email", label: "Email" },
          { type: "image", name: "image", label: "Photo" },
          { type: "string", name: "research", label: "Research Interests" },
          { type: "rich-text", name: "bio", label: "Biography" },
        ],
      },
      {
        name: "research_topics",
        label: "Research Topics",
        path: "content/research-topics",
        fields: [
          { type: "string", name: "title", label: "Title" },
          { type: "string", name: "description", label: "Description" },
          { type: "rich-text", name: "content", label: "Content" },
          { type: "image", name: "image", label: "Hero Image" },
        ],
      },
    ],
  },
});

*/
