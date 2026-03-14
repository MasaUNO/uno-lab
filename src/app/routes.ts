import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Research } from "./pages/Research";
import { Members } from "./pages/Members";
import { News } from "./pages/News";
import { Publications } from "./pages/Publications";
import { Gallery } from "./pages/Gallery";
import { ProspectiveStudents } from "./pages/ProspectiveStudents";
import { Contact } from "./pages/Contact";
import { ResearchTopicDetail } from "./pages/ResearchTopicDetail";
import { ResearchMethodDetail } from "./pages/ResearchMethodDetail";
import { MemberDetail } from "./pages/MemberDetail";
import { NewsDetail } from "./pages/NewsDetail";
import { Fields } from "./pages/Fields";
import { FieldDetail } from "./pages/FieldDetail";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "research", Component: Research },
      { path: "research/topic/:id", Component: ResearchTopicDetail },
      { path: "research/method/:id", Component: ResearchMethodDetail },
      { path: "members", Component: Members },
      { path: "members/:id", Component: MemberDetail },
      { path: "fields", Component: Fields },
      { path: "fields/:id", Component: FieldDetail },
      { path: "news", Component: News },
      { path: "news/:id", Component: NewsDetail },
      { path: "publications", Component: Publications },
      { path: "gallery", Component: Gallery },
      { path: "prospective-students", Component: ProspectiveStudents },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
