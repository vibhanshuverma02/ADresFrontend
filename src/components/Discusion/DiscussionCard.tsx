"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { format } from "date-fns";
import { FeedbackThread } from "./FeedbackThread";
import { motion } from "framer-motion";

export type ForumCard = {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: string;
  likes: number;
  replies: number;
  views: number;
  tags: string[];
  logo: string;
  latestFeedbacks: any[];
};

export function mapForumToCard(f: any): ForumCard {
  const sortedFeedbacks = (f.feedbacks || []).sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return {
    id: f.id || f.output?.resource?.id,
    title: f.output?.resource?.title ?? "Untitled",
    content: f.output?.resource?.description ?? "No description available",
    createdBy: f.output?.resource?.organization?.name ?? "Unknown",
    logo: f.output?.resource?.organization?.logo ?? "",
    createdAt: f.createdAt,
    likes:
      f.feedbacks?.reduce(
        (acc: number, f: any) => acc + (f.reactionsRel?.length || 0),
        0
      ) ?? 0,
    replies: f._count?.feedbacks ?? 0,
    views: f.views ?? 0,
    tags: [f.output?.resource?.type, f.output?.resource?.clusterTag].filter(
      Boolean
    ),
    latestFeedbacks: sortedFeedbacks.slice(0, 2),
  };
}

export default function DiscussionCard({ item }: { item: ForumCard }) {
  const maxVisibleTags = 3;
  const visibleTags = item.tags.slice(0, maxVisibleTags);

  const score =
    item.likes * 2 + item.replies * 3 + (item.views > 200 ? 20 : 5);

  return (
    <Link href={`/Resource/Discussion/${item.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.25 }}
      >
        <Card
          className="
            p-6 cursor-pointer rounded-2xl transition-all
          "
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border)",
            color: "var(--subtext)",
            boxShadow: "0 4px 14px rgba(0,0,0,.06)",
          }}
        >
          {/* HEADER */}
          <div className="flex items-start gap-4">
            {/* Org Logo */}
            <div
  className="w-12 h-12 rounded-xl overflow-hidden border"
  style={{ borderColor: "var(--border)" }}
>
  <img
    src={item.logo || "/resource.png"}
    alt={item.createdBy}
    className="w-full h-full object-cover"
    onError={(e) => {
      e.currentTarget.src = "/resource.png";
    }}
  />
</div>


            <div className="flex-1">
              {/* Title */}
              <h2
                className="font-bold text-lg leading-tight line-clamp-2"
                style={{ color: "var(--headline)" }}
              >
                {item.title}
              </h2>

              {/* Meta */}
              <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
                Posted by <span className="font-medium">{item.createdBy}</span> •
                Region: <span className="font-medium">{visibleTags[0] ?? "-"}</span> •
                Cluster: <span className="font-medium">{visibleTags[1] ?? "-"}</span> •
                {format(new Date(item.createdAt), "dd MMM yyyy")}
              </p>
            </div>
          </div>

          {/* SUMMARY */}
          <p
            className="text-sm mt-4 line-clamp-3 leading-relaxed"
            style={{ color: "var(--subtext)" }}
          >
            {item.content}
          </p>

          {/* LATEST RESPONSES */}
          {item.latestFeedbacks?.length > 0 && (
            <div className="mt-4">
              <h4
                className="text-sm font-semibold mb-2"
                style={{ color: "var(--headline)" }}
              >
                Latest Responses
              </h4>

              <div className="space-y-2">
                {item.latestFeedbacks.map((fb, i) => (
                  <div
                    key={i}
                    className="pl-2"
                    style={{ borderLeft: "2px solid var(--border)" }}
                  >
                    <FeedbackThread fb={fb} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DIVIDER */}
          <div
            className="mt-5 pt-4"
            style={{ borderTop: "1px solid var(--border)" }}
          ></div>

          {/* FOOTER */}
          <div
            className="flex items-center justify-between text-sm"
            style={{ color: "var(--subtext)" }}
          >
            <div className="flex gap-4">
              <span>💬 {item.replies} Replies</span>
              <span>👀 {score} Views</span>
              <span>👍 {item.likes} Upvotes</span>
            </div>

            <button
              className="px-4 py-1 rounded-md transition"
              style={{
                border: "1px solid var(--accent)",
                color: "var(--accent)",
              }}
            >
              See More →
            </button>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
