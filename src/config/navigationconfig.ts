// "use client";
// import { NavItem } from "@/types/adres";
// import { BookOpen, Calendar, Leaf, MessageSquare, Users, Layers } from "lucide-react";

// export const navigationItems: NavItem[] = [
//   {
//     title: "NAPCC",
//     href: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2021/dec/doc202112101.pdf",
//     icon: Users,
//     description: "Overview of India's National Action Plan on Climate Change",
//     children: [
//       { title: "Overview", href: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2021/dec/doc202112101.pdf" },
//       {
//         title: "Missions",
//         href: "/NAPCC/missions",
//         children: [
//           { title: "National Mission for a Green India",                              href: "" },
//           { title: "National Mission for Enhanced Energy Efficiency",                 href: "" },
//           { title: "National Mission for Sustaining the Himalayan Ecosystem",         href: "" },
//           { title: "National Mission for Sustainable Agriculture",                    href: "" },
//           { title: "National Mission on Strategic Knowledge for Climate Change",      href: "" },
//           { title: "National Mission on Sustainable Habitat",                         href: "" },
//           { title: "National Solar Mission",                                          href: "" },
//           { title: "National Water Mission",                                          href: "" },
//         ],
//       },
//     ],
//   },
//   {
//     title: "ADRES Network",
//     href: "/",
//     icon: Leaf,
//     description: "Climate Knowledge Platform",
//     children: [
//       { title: "Adres Framework",         href: "/?section=framework" },
//       { title: "Explore ADRES Network",   href: "/?section=portal" },
//       { title: "The Genesis of ADRES",    href: "/?section=timeline" },
//       { title: "Vision of ADRES Network", href: "/?section=vision" },
//     ],
//   },
//   {
//     title: "Key Allies",
//     href: "/KeyAllices",
//     icon: Users,
//     description: "A directory providing information for all network members",
//     children: [
//       {
//         title: "Centers of Excellence",
//         href: "/KeyAllices?section=coe",
//       },
//       {
//         title: "Key Ministries",
//         description: "Climate Knowledge Platform",
//         href: "/KeyAllices?section=ministries",
//       },
//       {
//         title: "State & Union Territories",
//         description: "State & Union Territories",
//         href: "/KeyAllices?section=sdma",
//         children: [
//           { title: "SDMAs & State Climate Change Cells", href: "/KeyAllices?section=sdma" },
//         ],
//       },
//     ],
//   },
//   {
//     title: "Resource Library",
//     href: "/Resource",
//     icon: BookOpen,
//     description:
//       "A comprehensive resource hub featuring research reports, policy documents, case studies, and training guides.",
//     children: [
//       {
//         title: "All Resources",
//         href: "/Resource/list?type=ALL",
//         description: "Browse all available resources in the ADRES knowledge library.",
//       },
//       {
//         title: "Books",
//         href: "/Resource/list?type=BOOK",
//         description: "Books and long-form publications related to resilience and sustainability.",
//       },
//       {
//         title: "Dossiers",
//         href: "/Resource/list?type=DOSSIERS",
//         description: "Peer-reviewed research papers on climate resilience and disaster risk reduction.",
//       },
//       {
//         title: "Publications",
//         href: "/Resource/list?type=PUBLICATION",
//         description: "Official ADRES publications, reports, and documentation.",
//       },
//       {
//         title: "Reports",
//         href: "/Resource/list?type=REPORTS",
//         description: "Practical toolkits, guides, and implementation manuals.",
//       },
//       {
//         title: "Research Papers",
//         href: "/Resource/list?type=RESEARCH_PAPER",
//         description: "Peer-reviewed research papers on climate resilience and disaster risk reduction.",
//       },
//       {
//         title: "Toolkits",
//         href: "/Resource/list?type=TOOLKIT",
//         description: "Practical toolkits, guides, and implementation manuals.",
//       },
//       {
//         title: "White Papers",
//         href: "/Resource/list?type=WHITE_PAPER",
//         description: "Strategic white papers presenting insights, frameworks, and recommendations.",
//       },
//     ],
//   },
//   {
//     title: "Knowledge Wall",
//     href: "/Resource/Discussion",
//     icon: MessageSquare,
//     description:
//       "Join conversations, ask questions, and exchange perspectives across the ADRES knowledge network.",
//     children: [
//       {
//         title: "Discussion Forum",
//         description: "Community discussions and expert exchanges",
//         href: "/Resource/Discussion",
//         children: [
//           { title: "Explore Discussion Forums", href: "/Resource/Discussion?section=discussion-list" },
//           { title: "Latest Discussions",        href: "/Resource/Discussion?section=latest-discussions" },
//         ],
//       },
//       {
//         title: "Notice Board",
//         description: "Official announcements and updates",
//         href: "/Noticeboard",
//         children: [
//           { title: "Awareness",      href: "/Noticeboard?type=alert" },
//           { title: "Newsletters",    href: "/Noticeboard?type=newsletter" },
//           { title: "Notifications",  href: "/Noticeboard?type=notification" },
//         ],
//       },
//     ],
//   },
//   {
//     title: "Events & Gallery",
//     href: "/events",
//     icon: Calendar,
//     description: "Stay informed with upcoming events and a gallery capturing past workshops, seminars, and webinars.",
//     children: [
//       { title: "Gallery", href: "/gallery" },
//     ],
//   },
//   {
//     title: "Thematic Clusters",
//     href: "/clusters",
//     icon: Layers,
//     description: "Collaborative clusters bringing experts together to address key climate, environment and resilience challenges.",
//     children: [
//       { title: "Green Growth",      href: "/clusters?name=Green+Growth"      },
//       { title: "MHRM",              href: "/clusters?name=MHRM"              },
//       { title: "Mountains",         href: "/clusters?name=Mountains"         },
//       { title: "NBS",               href: "/clusters?name=NBS"               },
//       { title: "Training",          href: "/clusters?name=Training"          },
//       { title: "Water Resilience",  href: "/clusters?name=Water+Resilience"  },
//     ],
//   },
// ];


"use client";
import { NavItem } from "@/types/adres";
import { BookOpen, Calendar, Leaf, MessageSquare, Users, Layers } from "lucide-react";

export const navigationItems: NavItem[] = [
  {
    title: "NAPCC",
    href: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2021/dec/doc202112101.pdf",
    icon: Users,
    description: "Overview of India's National Action Plan on Climate Change",
    children: [
      
      {
        title: "Missions",
        href: "/NAPCC/missions",
        children: [
          { title: "National Mission for a Green India",                              href: "/NAPCC/missions#green-india"          },
          { title: "National Mission for Enhanced Energy Efficiency",                 href: "/NAPCC/missions#energy-efficiency"    },
          { title: "National Mission for Sustaining the Himalayan Ecosystem",         href: "/NAPCC/missions#himalayan-ecosystem"  },
          { title: "National Mission for Sustainable Agriculture",                    href: "/NAPCC/missions#sustainable-agriculture" },
          { title: "National Mission on Strategic Knowledge for Climate Change",      href: "/NAPCC/missions#strategic-knowledge"  },
          { title: "National Mission on Sustainable Habitat",                         href: "/NAPCC/missions#sustainable-habitat"  },
          { title: "National Solar Mission",                                          href: "/NAPCC/missions#solar-mission"        },
          { title: "National Water Mission",                                          href: "/NAPCC/missions#water-mission"        },
        ],
      },
    ],
  },
  {
    title: "ADRES Network",
    href: "/",
    icon: Leaf,
    description: "Climate Knowledge Platform",
    children: [
      { title: "Adres Framework",         href: "/?section=framework" },
      { title: "Explore ADRES Network",   href: "/?section=portal" },
      { title: "The Genesis of ADRES",    href: "/?section=timeline" },
      { title: "Vision of ADRES Network", href: "/?section=vision" },
    ],
  },
  {
    title: "Key Allies",
    href: "/KeyAllices",
    icon: Users,
    description: "A directory providing information for all network members",
    children: [
      {
        title: "Centers of Excellence",
        href: "/KeyAllices?section=coe",
      },
      {
        title: "Key Ministries",
        description: "Climate Knowledge Platform",
        href: "/KeyAllices?section=ministries",
      },
      {
        title: "State & Union Territories",
        description: "State & Union Territories",
        href: "/KeyAllices?section=sdma",
        children: [
          { title: "SDMAs & State Climate Change Cells", href: "/KeyAllices?section=sdma" },
        ],
      },
    ],
  },
  {
    title: "Resource Library",
    href: "/Resource",
    icon: BookOpen,
    description:
      "A comprehensive resource hub featuring research reports, policy documents, case studies, and training guides.",
    children: [
      {
        title: "All Resources",
        href: "/Resource/list?type=ALL",
        description: "Browse all available resources in the ADRES knowledge library.",
      },
      {
        title: "Books",
        href: "/Resource/list?type=BOOK",
        description: "Books and long-form publications related to resilience and sustainability.",
      },
      {
        title: "Dossiers",
        href: "/Resource/list?type=DOSSIERS",
        description: "Peer-reviewed research papers on climate resilience and disaster risk reduction.",
      },
      {
        title: "Publications",
        href: "/Resource/list?type=PUBLICATION",
        description: "Official ADRES publications, reports, and documentation.",
      },
      {
        title: "Reports",
        href: "/Resource/list?type=REPORTS",
        description: "Practical toolkits, guides, and implementation manuals.",
      },
      {
        title: "Research Papers",
        href: "/Resource/list?type=RESEARCH_PAPER",
        description: "Peer-reviewed research papers on climate resilience and disaster risk reduction.",
      },
      {
        title: "Toolkits",
        href: "/Resource/list?type=TOOLKIT",
        description: "Practical toolkits, guides, and implementation manuals.",
      },
      {
        title: "White Papers",
        href: "/Resource/list?type=WHITE_PAPER",
        description: "Strategic white papers presenting insights, frameworks, and recommendations.",
      },
    ],
  },
  {
    title: "Knowledge Wall",
    href: "/Resource/Discussion",
    icon: MessageSquare,
    description:
      "Join conversations, ask questions, and exchange perspectives across the ADRES knowledge network.",
    children: [
      {
        title: "Discussion Forum",
        description: "Community discussions and expert exchanges",
        href: "/Resource/Discussion",
        children: [
          { title: "Explore Discussion Forums", href: "/Resource/Discussion?section=discussion-list" },
          { title: "Latest Discussions",        href: "/Resource/Discussion?section=latest-discussions" },
        ],
      },
      {
        title: "Notice Board",
        description: "Official announcements and updates",
        href: "/Noticeboard",
        children: [
          { title: "Awareness",      href: "/Noticeboard?type=alert" },
          { title: "Newsletters",    href: "/Noticeboard?type=newsletter" },
          { title: "Notifications",  href: "/Noticeboard?type=notification" },
        ],
      },
    ],
  },
  {
    title: "Events & Gallery",
    href: "/events",
    icon: Calendar,
    description: "Stay informed with upcoming events and a gallery capturing past workshops, seminars, and webinars.",
    children: [
      { title: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Thematic Clusters",
    href: "/clusters",
    icon: Layers,
    description: "Collaborative clusters bringing experts together to address key climate, environment and resilience challenges.",
    children: [
      { title: "Green Growth",      href: "/clusters?name=Green+Growth"      },
      { title: "MHRM",              href: "/clusters?name=MHRM"              },
      { title: "Mountains",         href: "/clusters?name=Mountains"         },
      { title: "NBS",               href: "/clusters?name=NBS"               },
      { title: "Training",          href: "/clusters?name=Training"          },
      { title: "Water Resilience",  href: "/clusters?name=Water+Resilience"  },
    ],
  },
];