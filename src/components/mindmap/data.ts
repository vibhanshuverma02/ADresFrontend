import { MindMapData } from "./types";

export const mindMapData: MindMapData = {
  id: "root",
  label: "ADRES Network Portal",
  children: [
    {
      id: "admin-role",
      label: "Admin Role Classification",
      children: [
        { id: "manage-coes", label: "Managing CoEs" },
        { id: "resource-review", label: "Resource Review & Approval" },
        { id: "profile-mgmt", label: "Profile Management" },
        { id: "performance", label: "Performance Oversight" },
        { id: "annual-reports", label: "Annual Reports & Documents" },
        { id: "events", label: "Event Management" },
        { id: "stakeholder-forums", label: "Managing Stakeholder Forums" },
        { id: "user-verification", label: "User Verification & Authorization" },
        { id: "forum-moderation", label: "Forum Moderation" },
        { id: "feedback-oversight", label: "Feedback Flow Oversight" },
        { id: "agency-requests", label: "Research Agency Requests" },
        { id: "notice-board", label: "Managing Notice Board" },
        { id: "publishing", label: "Publishing Content" },
        { id: "dst-nmskcc", label: "DST & NMSKCC Notifications" },
        { id: "reporting", label: "Reporting" },
        { id: "misc", label: "Managing Miscellaneous" },
        { id: "about-updates", label: "About Page Updates" },
        { id: "architecture-updates", label: "Architecture Page Maintenance" },
        { id: "nmskcc-updates", label: "NMSKCC Page Updates" },
        { id: "contact-requests", label: "Contact Page Requests" },
      ],
    },
    {
      id: "about",
      label: "About Page",
      children: [
        { id: "genesis", label: "Genesis of ADRES → Background and origin of the portal" },
        { id: "philosophy", label: "Philosophy → Mission linking research, innovation, policy" },
      ],
      href: "/about",
    },
    {
      id: "nmskcc-dst",
      label: "NMSKCC – DST (Govt of India)",
      children: [
        { id: "researcher-networks", label: "Researcher Networks → Directory of researchers" },
        { id: "route-map", label: "Route Map → Interactive map of CoEs" },
      ],
      href: "/nmskcc",
    },
    {
      id: "architecture",
      label: "ADRES Network Architecture",
      children: [
        { id: "route-map-visual", label: "Route Map Visualization → Tiers interaction" },
        { id: "network-tiers", label: "Network Tiers" },
        { id: "link-coes", label: "Link to CoEs Profile Page" },
        { id: "link-sdma", label: "Link to SDMA and StateCCC Page" },
        { id: "ministries", label: "Ministries → Redirect to websites" },
        { id: "resource-library", label: "Resource Library → Strategic Knowledge Forum" },
      ],
      href: "/architecture",
    },
    {
      id: "coes-hub",
      label: "CoEs Collaboration Hub",
      children: [
        { id: "resources", label: "Resource Section → Upload outputs, papers, reports" },
        { id: "annual-docs", label: "Annual Reports/Documents → DST review" },
        { id: "events-mgmt", label: "Events Management → Schedule, invite" },
        { id: "profile", label: "Profile Management → Public profile, team" },
        { id: "forums", label: "Discussion Forums → Feedback flow" },
      ],
      href: "/coes",
    },
    {
      id: "skf",
      label: "Strategic Knowledge Forum page",
      children: [
        { id: "public-hub", label: "Public-facing resource hub → Browse by cluster, CoE, project, title" },
        { id: "pillars", label: "Four Pillars" },
        {
          id: "feeders",
          label: "Feeders (CoEs) → Upload (Admin-reviewed)",
        },
        {
          id: "implementers",
          label: "Implementers (SDMAs, State Cells) → Read/download, feedback",
        },
        {
          id: "policy",
          label: "Policy Makers (NITI, NDMA, Ministries) → Read/download, feedback",
        },
        {
          id: "agencies",
          label: "Research Agencies (International) → Opinions, best practices, collaborate",
        },
      ],
      href: "/skf",
    },
    {
      id: "knowledge-wall",
      label: "Knowledge Wall",
      children: [
        { id: "events-upcoming", label: "Upcoming Events" },
        { id: "pub-alerts", label: "Publication Alerts" },
        { id: "newsletters", label: "Newsletters" },
        { id: "gallery", label: "Public Gallery" },
      ],
      href: "/knowledge-wall",
    },
    { id: "icars", label: "ICARS Periodical Reports" },
    { id: "updates", label: "DST & NMSKCC Updates → Alerts and notifications" },
    {
      id: "contact",
      label: "Contact Page",
      children: [
        { id: "connections", label: "Connection/Request form for new CoEs" },
        { id: "admin-info", label: "Admin Information → ICARS Website" },
      ],
      href: "/contact",
    },
  ],
};
