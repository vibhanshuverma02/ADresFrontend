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
      { title: "Overview", href: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2021/dec/doc202112101.pdf" },
      {
        title: "Missions",
        href: "/NMSKCC/missions",
        children: [
          { title: "National Solar Mission",                                          href: "" },
          { title: "National Mission for Enhanced Energy Efficiency",                 href: "" },
          { title: "National Mission on Sustainable Habitat",                         href: "" },
          { title: "National Water Mission",                                          href: "" },
          { title: "National Mission for Sustaining the Himalayan Ecosystem",         href: "" },
          { title: "National Mission for a Green India",                              href: "" },
          { title: "National Mission for Sustainable Agriculture",                    href: "" },
          { title: "National Mission on Strategic Knowledge for Climate Change",      href: "" },
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
      

         {
  title: "Vision of ADRES Network",
  href: "/?section=vision"
}
,
{
  title: "The Genesis of ADRES",
  href: "/?section=timeline"
},

{
  title: "Adres Framework",
  href: "/?section=framework"
},

{
  title: "Explore ADRES Network",
  href: "/?section=portal"
}

   
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
        // children: [
        //   { title: "CCA", href: "/KeyAllices?section=coe"  },
        //   { title: "DRR", href: "/KeyAllices?section=coe" },
        // ],
      },
      {
        title: "State & Union Territories",
        description: "State & Union Territories",
        href: "/KeyAllices?section=sdma",
        children: [
          // { title: "State Climate Change Cells", href: "/KeyAllices?section=sccc" },
          { title: "SDMAs & State Climate Change Cells",                      href: "/KeyAllices?section=sdma" },
        ],
      },
      {
        title: "Key Ministries",
        description: "Climate Knowledge Platform",
        href: "/KeyAllices?section=ministries",
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
      title: "Research Papers",
      href: "/Resource/list?type=RESEARCH_PAPER",
      description: "Peer-reviewed research papers on climate resilience and disaster risk reduction.",
    },
    {
      title: "White Papers",
      href: "/Resource/list?type=WHITE_PAPER",
      description: "Strategic white papers presenting insights, frameworks, and recommendations.",
    },
    {
      title: "Publications",
      href: "/Resource/list?type=PUBLICATION",
      description: "Official ADRES publications, reports, and documentation.",
    },
    {
      title: "Books",
      href: "/Resource/list?type=BOOK",
      description: "Books and long-form publications related to resilience and sustainability.",
    },
    {
      title: "Toolkits",
      href: "/Resource/list?type=TOOLKIT",
      description: "Practical toolkits, guides, and implementation manuals.",
    }
  ]
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
        {
          title: "Latest Discussions",
          href: "/Resource/Discussion?section=latest-discussions",
        },
        {
          title: "Explore Discussion Forums",
          href: "/Resource/Discussion?section=discussion-list",
        },
      ],
    },

    {
      title: "Notice Board",
      description: "Official announcements and updates",
      href: "/Noticeboard",

      children: [
        
        {
          title: "Awareness",
          href: "/Noticeboard?type=alert",
        },
      
        {
          title: "Newsletters",
          href: "/Noticeboard?type=newsletter",
        },
        {
          title: "Notifications",
          href: "/Noticeboard?type=notification",
        },
      ],
    },
  ],
}

,
  {
    title: "Events & Gallery",
    href: "/events",
    icon: Calendar,
    description: "Stay informed with upcoming events and a gallery capturing past workshops, seminars, and webinars.",
    children: [
    
      { title: "Gallery",        href: "/gallery"  },
    ],
  },
  {
    title: "Thematic Clusters",
    href: "/clusters",                    // ✅ All clusters page
    icon: Layers,
    description: "Collaborative clusters bringing experts together to address key climate, environment and resilience challenges.",
    children: [
      // ✅ These IDs need to be replaced with real cluster IDs from DB
      // OR use slug-based routing. For now href points to /clusters?name=X
      // so the clusters page can pre-filter. Update with real IDs once known.
      { title: "Mountains",         href: "/clusters?name=Mountains"         },
      { title: "MHRM",              href: "/clusters?name=MHRM"              },
      { title: "NBS",               href: "/clusters?name=NBS"               },
      { title: "Green Growth",      href: "/clusters?name=Green+Growth"      },
      { title: "Water Resilience",  href: "/clusters?name=Water+Resilience"  },
      { title: "Training",          href: "/clusters?name=Training"          },
    ],
  },
];