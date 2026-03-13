export type MindMapNode = {
  id: string;
  label: string;
  color?: string; // tailwind color class or hex
  children?: MindMapNode[];
  href?: string; // optional route to navigate on click
};

export type MindMapData = MindMapNode;



// components/discussion/types.ts
export type ForumCard = {
  id: string;
  outputId?: string;
  title: string;
  preview?: string;
  createdBy?: string | null;
  createdAt: string;
  lastReplyAt?: string | null;
  likes: number;
  replies: number;
  views: number;
  tags: string[];
};
