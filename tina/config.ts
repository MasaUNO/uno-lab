import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "news",
        label: "News",
        path: "content/news",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Date" },
          { type: "string", name: "excerpt", label: "Excerpt" },
          { type: "rich-text", name: "content", label: "Content" },
          { type: "image", name: "image", label: "Image" },
          {
            type: "object",
            name: "blocks",
            label: "Flexible Blocks",
            list: true,
            templates: [
              {
                name: "hero",
                label: "Hero (Multiple Images)",
                fields: [{ type: "image", name: "images", label: "Images", list: true }],
              },
              {
                name: "imageGrid",
                label: "Image Grid",
                fields: [{ type: "image", name: "images", label: "Images", list: true }],
              },
              {
                name: "video",
                label: "Video",
                fields: [{ type: "string", name: "url", label: "Video URL (YouTube/Vimeo)" }],
              },
              {
                name: "richText",
                label: "Rich Text Section",
                fields: [{ type: "rich-text", name: "body", label: "Body" }],
              },
            ],
          },
        ],
      },
      {
        name: "research_topics",
        label: "Research Topics",
        path: "content/research_topics",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "rich-text", name: "content", label: "Content" },
          { type: "image", name: "image", label: "Image" },
          {
            type: "object",
            name: "blocks",
            label: "Flexible Blocks",
            list: true,
            templates: [
              {
                name: "hero",
                label: "Hero (Multiple Images)",
                fields: [{ type: "image", name: "images", label: "Images", list: true }],
              },
              {
                name: "imageGrid",
                label: "Image Grid",
                fields: [{ type: "image", name: "images", label: "Images", list: true }],
              },
              {
                name: "video",
                label: "Video",
                fields: [{ type: "string", name: "url", label: "Video URL" }],
              },
              {
                name: "richText",
                label: "Rich Text Section",
                fields: [{ type: "rich-text", name: "body", label: "Body" }],
              },
            ],
          },
        ],
      },
      {
        name: "research_methods",
        label: "Research Methods",
        path: "content/research_methods",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "rich-text", name: "content", label: "Content" },
          { type: "image", name: "image", label: "Image" },
          {
            type: "object",
            name: "blocks",
            label: "Flexible Blocks",
            list: true,
            templates: [
              {
                name: "hero",
                label: "Hero (Multiple Images)",
                fields: [{ type: "image", name: "images", label: "Images", list: true }],
              },
              {
                name: "imageGrid",
                label: "Image Grid",
                fields: [{ type: "image", name: "images", label: "Images", list: true }],
              },
              {
                name: "video",
                label: "Video",
                fields: [{ type: "string", name: "url", label: "Video URL" }],
              },
              {
                name: "richText",
                label: "Rich Text Section",
                fields: [{ type: "rich-text", name: "body", label: "Body" }],
              },
            ],
          },
        ],
      },
      {
        name: "members",
        label: "Members",
        path: "content/members",
        format: "json",
        fields: [
          { type: "string", name: "name", label: "Name", isTitle: true, required: true },
          { type: "string", name: "role", label: "Role" },
          { type: "boolean", name: "isAlumni", label: "Is Alumni?" },
          { type: "rich-text", name: "bio", label: "Bio" },
          { type: "number", name: "order", label: "Order (for sorting)" },
          { type: "string", name: "research", label: "Research Interests" },
          { type: "string", name: "email", label: "Email" },
          { type: "image", name: "image", label: "Image" },
          {
            type: "object",
            name: "blocks",
            label: "Flexible Blocks",
            list: true,
            templates: [
              {
                name: "hero",
                label: "Hero (Multiple Images)",
                fields: [{ type: "image", name: "images", label: "Images", list: true }],
              },
              {
                name: "imageGrid",
                label: "Image Grid",
                fields: [{ type: "image", name: "images", label: "Images", list: true }],
              },
              {
                name: "video",
                label: "Video",
                fields: [{ type: "string", name: "url", label: "Video URL" }],
              },
              {
                name: "richText",
                label: "Rich Text Section",
                fields: [{ type: "rich-text", name: "body", label: "Body" }],
              },
            ],
          },
        ],
      },
      {
        name: "fields",
        label: "Fields (Survey Areas)",
        path: "content/fields",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "rich-text", name: "description", label: "Description" },
          { type: "image", name: "image", label: "Image" },
          {
            type: "object",
            name: "relatedTopics",
            label: "Related Research Topics",
            list: true,
            fields: [
              {
                type: "reference",
                name: "topic",
                label: "Topic",
                collections: ["research_topics"],
              },
            ],
          },
        ],
      },
      {
        name: "publications",
        label: "Publications (by Year)",
        path: "content/publications",
        format: "json",
        fields: [
          { type: "number", name: "year", label: "Year", required: true },
          { type: "rich-text", name: "items", label: "Publication Items" },
        ],
      },
      {
        name: "awards",
        label: "Awards (by Year)",
        path: "content/awards",
        format: "json",
        fields: [
          { type: "number", name: "year", label: "Year", required: true },
          { type: "rich-text", name: "items", label: "Awards Items" },
        ],
      },
      {
        name: "grants",
        label: "Grants & Funding",
        path: "content/grants",
        format: "json",
        fields: [
          { type: "string", name: "fundName", label: "Fund Name", isTitle: true, required: true },
          { type: "string", name: "researchTitle", label: "Research Title" },
          { type: "number", name: "yearStart", label: "Year (start)", required: true },
          { type: "number", name: "yearEnd", label: "Year (end)" },
        ],
      },
      {
        name: "gallery",
        label: "Gallery Images",
        path: "content/gallery",
        format: "json",
        fields: [
          { type: "image", name: "url", label: "Image URL", required: true },
          { type: "string", name: "caption", label: "Caption", isTitle: true, required: true },
        ],
      },
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        format: "json",
        match: {
          include: "{home,about,contact,research,fields_page,prospective_students}",
        },
        templates: [
          {
            name: "home",
            label: "Home Page",
            fields: [
              { type: "string", name: "heroTitle", label: "Hero Title" },
              { type: "string", name: "heroSubtitle", label: "Hero Subtitle" },
              { type: "image", name: "heroImages", label: "Hero Images", list: true },
              { type: "rich-text", name: "aboutText", label: "About Text" },
              { type: "object", name: "contactInfo", label: "Contact Info", fields: [
                { type: "rich-text", name: "address", label: "Address" },
                { type: "string", name: "email", label: "Email" }
              ]}
            ]
          },
          {
            name: "about",
            label: "About Page",
            fields: [
              { type: "string", name: "title", label: "Title" },
              {
                type: "object",
                name: "blocks",
                label: "Sections",
                list: true,
                templates: [
                  {
                    name: "hero",
                    label: "Hero (Multiple Images)",
                    fields: [{ type: "image", name: "images", label: "Images", list: true }],
                  },
                  {
                    name: "richText",
                    label: "Rich Text Section",
                    fields: [{ type: "rich-text", name: "body", label: "Body" }],
                  },
                  {
                    name: "researchCards",
                    label: "Research Topic Cards",
                    fields: [
                      { type: "string", name: "title", label: "Title (Optional)" }
                    ],
                  },
                  {
                    name: "methodCards",
                    label: "Research Method Cards",
                    fields: [
                      { type: "string", name: "title", label: "Title (Optional)" }
                    ],
                  },
                ],
              },
            ]
          },
          {
            name: "research",
            label: "Research Page",
            fields: [
              { type: "rich-text", name: "topicsExplanation", label: "Topics Explanation" },
              { type: "rich-text", name: "methodsExplanation", label: "Methods Explanation" },
            ]
          },
          {
            name: "fields_page",
            label: "Fields Page",
            fields: [
              { type: "string", name: "title", label: "Title" },
              {
                type: "object",
                name: "blocks",
                label: "Sections",
                list: true,
                templates: [
                  {
                    name: "hero",
                    label: "Hero",
                    fields: [{ type: "image", name: "images", label: "Images", list: true }],
                  },
                  {
                    name: "richText",
                    label: "Rich Text Section",
                    fields: [{ type: "rich-text", name: "body", label: "Body" }],
                  },
                  {
                    name: "fieldCards",
                    label: "Field Cards",
                    fields: [
                      { type: "string", name: "title", label: "Title (Optional)" }
                    ],
                  },
                ],
              },
            ]
          },
          {
            name: "prospective_students",
            label: "Prospective Students Page",
            fields: [
              { type: "string", name: "title", label: "Title" },
              {
                type: "object",
                name: "blocks",
                label: "Sections",
                list: true,
                templates: [
                  {
                    name: "hero",
                    label: "Hero",
                    fields: [{ type: "image", name: "images", label: "Images", list: true }],
                  },
                  {
                    name: "richText",
                    label: "Rich Text Section",
                    fields: [{ type: "rich-text", name: "body", label: "Body" }],
                  },
                ],
              },
            ]
          },
          {
            name: "contact",
            label: "Contact Page",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "rich-text", name: "description", label: "Description" },
              { type: "rich-text", name: "address", label: "Address" },
              { type: "string", name: "email", label: "Email", list: true },
              { type: "rich-text", name: "officeHours", label: "Office Hours" }
            ]
          }
        ]
      }
    ],
  },
});
