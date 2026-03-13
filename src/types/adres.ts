import { LucideIcon } from "lucide-react";

export type AdresNode = {
  id: string;
  label: string;
  route: string;
};

export type AdresEdge = {
  id: string;
  source: string;
  target: string;
};

export type Ceo = {
  id: string;
  name: string;
  organization: string;
  email?: string;
};
export type NavItem = {
  title: string;
  href: string;
  icon?: LucideIcon;          // Optional icon
  description?: string;       // Optional description
  children?: NavItem[];       // Optional nested children
};