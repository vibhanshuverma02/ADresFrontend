


// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import api from "@/lib/axios";
// import { Card } from "@/components/ui/card";
// import { format } from "date-fns";
// import { Button } from "@/components/ui/button";
// import { FcGoogle } from "react-icons/fc";
// import ExternalLoginButtons from "@/components/loginbutton";
// import { useAuth } from "@/context/Authcontext";

// export default function DiscussionDetailPage() {
//   const { id } = useParams();
//   const [forum, setForum] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [newComment, setNewComment] = useState("");
// const [showLogin, setShowLogin] = useState(false);
// const { user } = useAuth(); 
// function isUnauthorized(err: any) {
//   return err?.response?.status === 401;
// }

//   useEffect(() => {
//     if (!id) return;

//     fetchForum();
//   }, [id]);

//   async function fetchForum() {
//     try {
//       const res = await api.get(`/outputs/${id}`);
//       setForum(res.data);
//     } catch (err) {
//       console.error("Error loading forum:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleAddComment() {
//     if (!newComment.trim()) return;

//     try {
//       await api.post(`/forums/${id}/feedback`, { content: newComment });
//       setNewComment("");
//       fetchForum(); // refresh comments
//     } catch (err) {
//        if (isUnauthorized(err)) {
//       setShowLogin(true);
//       return;
//     }
//       console.error(err);
//     }
//   }

//   if (loading) return <p className="p-8">Loading...</p>;
//   if (!forum) return <p className="p-8">Forum not found</p>;

//   return (
//     <div className="max-w-4xl mx-auto py-8 px-4">

//       {/* MAIN CARD */}
//       <Card className="p-6 border rounded-xl shadow-sm bg-white">

//         {/* HEADER */}
//         <div className="flex items-start gap-3">
//           <div className="w-14 h-14 bg-gray-200 rounded-lg overflow-hidden">
//             <img
//               src={forum.output?.logo || "/resource.png"}
//               className="object-cover w-full h-full"
//             />
//           </div>

//           <div>
//             <h1 className="text-2xl font-bold text-blue-700 leading-tight">
//               {forum.output.title}
//             </h1>

//             <p className="text-gray-600 text-sm mt-1">
//               Region: <b>{forum.output.region}</b> • Cluster:{" "}
//               <b>{forum.output.clusterTag}</b> •{" "}
//               {format(new Date(forum.createdAt), "dd MMM yyyy")}
//             </p>
//           </div>
//         </div>

//         <div className="border-t my-5"></div>

//         {/* ADD NEW COMMENT */}
//         {/* <div className="mb-6">
//           <textarea
//             className="w-full p-3 border rounded-md mb-2"
//             rows={3}
//             placeholder="Add a comment..."
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//           />
//           <button
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             onClick={handleAddComment}
//           >
//             Post Comment
//           </button>
          
//         </div> */}
// {/* ADD NEW COMMENT */}
// <div className="mb-6">
//   {showLogin ? (
//     <div className="border rounded-lg p-4 bg-gray-50 text-center">
//       <p className="mb-3 text-sm text-gray-600">
//         Please login to add a comment
//       </p>
//       <ExternalLoginButtons />
//     </div>
//   ) : (
//     <>
//       <textarea
//         className="w-full p-3 border rounded-md mb-2"
//         rows={3}
//         placeholder="Add a comment..."
//         value={newComment}
//         onChange={(e) => setNewComment(e.target.value)}
//       />
//       <button
//         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//         onClick={handleAddComment}
//       >
//         Post Comment
//       </button>
//     </>
//   )}
// </div>

//         {/* COMMENTS SECTION */}
//         <h2 className="text-lg font-semibold mb-4">Discussion</h2>

//       <FeedbackList
//   feedbacks={forum.feedbacks}
//   forumId={id}
//   refresh={fetchForum}
//   onUnauthorized={() => setShowLogin(true)}
//     currentUser={user}
// />

//       </Card>
//     </div>
//   );
// }

// /* ---------------------------------------
//    FEEDBACK & REPLY COMPONENTS
// --------------------------------------- */

// function FeedbackList({ feedbacks, forumId, refresh , onUnauthorized, currentUser }: any) {
//   return (
//     <div className="space-y-6">
//       {feedbacks.map((fb: any) => (
//         <FeedbackItem key={fb.id} fb={fb} depth={0} forumId={forumId} refresh={refresh} onUnauthorized={onUnauthorized} currentUser={currentUser}/>
//       ))}
//     </div>
//   );
// }

// function FeedbackItem({ fb, depth, forumId, refresh ,  onUnauthorized,  currentUser, }: any) {
//   const [editing, setEditing] = useState(false);
//   const [editContent, setEditContent] = useState(fb.content);
//   const [replyContent, setReplyContent] = useState("");
// const isOwner =
//   currentUser &&
//   fb.author?.toLowerCase() === currentUser.username?.toLowerCase();

//   async function handleToggleReaction(type: "LIKE" | "DISLIKE") {
//     try {
//       await api.post(`/forums/${forumId}/feedback/${fb.id}/reaction`, { type });
//       refresh();
//     } catch (err) {
//       console.error(err);
//     }
//   }

// async function handleEdit() {
//   try {
//     await api.patch(
//       `/forums/${forumId}/feedback/${fb.id}`,
//       { content: editContent }
//     );
//     setEditing(false);
//     refresh();
//   } catch (err: any) {
//     if (onUnauthorized(err)) {
//       onUnauthorized();
//       return;
//     }
//     console.error(err);
//   }
// }


// async function handleDelete() {
//   try {
//     await api.delete(`/forums/${forumId}/feedback/${fb.id}`);
//     refresh();
//   } catch (err: any) {
//     if (onUnauthorized(err)) {
//       onUnauthorized();
//       return;
//     }
//     console.error(err);
//   }
// }

//  async function handleReply() {
//   if (!replyContent.trim()) return;

//   try {
//     await api.post(
//       `/forums/${forumId}/feedback/${fb.id}/reply`,
//       { content: replyContent }
//     );
//     setReplyContent("");
//     refresh();
//   } catch (err: any) {
//     if (onUnauthorized(err)) {
//       onUnauthorized();
//       return;
//     }
//     console.error(err);
//   }
// }


//   return (
//     <div style={{ marginLeft: depth * 20 }}>
//       <div className="p-4 border rounded-lg bg-gray-50">
//         {editing ? (
//           <div>
//             <textarea
//               className="w-full p-2 border rounded-md mb-2"
//               rows={2}
//               value={editContent}
//               onChange={(e) => setEditContent(e.target.value)}
//             />
//             <div className="flex gap-2">
//               <button
//                 className="px-2 py-1 bg-green-600 text-white rounded-md"
//                 onClick={handleEdit}
//               >
//                 Save
//               </button>
//               <button
//                 className="px-2 py-1 bg-gray-300 rounded-md"
//                 onClick={() => setEditing(false)}
//               >
//                 Cancel
//               </button>
        
//             </div>
//           </div>
//         ) : (
//           <>
//             <p className="text-gray-800">{fb.content}</p>

//             <div className="flex gap-4 mt-2 text-xs text-gray-500 items-center">
//               <span>By <b>{fb.author}</b></span>
//               <span>{format(new Date(fb.createdAt), "dd MMM yyyy")}</span>
//               {isOwner && (
//   <>
//     <button
//       className="text-blue-600 hover:underline"
//       onClick={() => setEditing(true)}
//     >
//       Edit
//     </button>

//     <button
//       className="text-red-600 hover:underline"
//       onClick={handleDelete}
//     >
//       Delete
//     </button>
//   </>
// )}

//               <button
//                 className="text-green-600 hover:underline"
//                 onClick={() => handleToggleReaction("LIKE")}
//               >
//                 👍 {fb.likes}
//               </button>
//               <button
//                 className="text-orange-600 hover:underline"
//                 onClick={() => handleToggleReaction("DISLIKE")}
//               >
//                 👎 {fb.dislikes}
//               </button>
//             </div>

//             {/* REPLY INPUT */}
//             <div className="mt-2">
//               <textarea
//                 className="w-full p-2 border rounded-md mb-2"
//                 rows={2}
//                 placeholder="Reply..."
//                 value={replyContent}
//                 onChange={(e) => setReplyContent(e.target.value)}
//               />
//               <button
//                 className="px-3 py-1 bg-blue-600 text-white rounded-md"
//                 onClick={handleReply}
//               >
//                 Reply
//               </button>

              
//             </div>
//           </>
//         )}

//         {/* REPLIES */}
//         {fb.replies?.length > 0 && (
//           <div className="mt-4 space-y-3">
//             {fb.replies.map((child: any) => (
//               <FeedbackItem
//                 key={child.id}
//                 fb={child}
//                 depth={depth + 1}
//                 forumId={forumId}
//                 refresh={refresh}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { format, formatDistanceToNow } from "date-fns";
import ExternalLoginButtons from "@/components/loginbutton";
import { useAuth } from "@/context/Authcontext";

function isUnauthorized(err: any) {
  return err?.response?.status === 401;
}

interface Reaction { id: string; type: "LIKE" | "DISLIKE"; userId: string }
interface FeedbackNode {
  id: string;
  content: string;
  createdAt: string;
  author: string;
  authorImage: string | null;
  isOwner: boolean;
  likes: number;
  dislikes: number;
  reactions: Reaction[];
  replies: FeedbackNode[];
}

// ─────────────────────────────────────────────────────────────────
// Immutable helpers — update nested feedback trees without mutation
// ─────────────────────────────────────────────────────────────────

function updateFeedbackInTree(
  feedbacks: FeedbackNode[],
  targetId: string,
  updater: (fb: FeedbackNode) => FeedbackNode,
): FeedbackNode[] {
  return feedbacks.map((fb) => {
    if (fb.id === targetId) return updater(fb);
    return { ...fb, replies: updateFeedbackInTree(fb.replies, targetId, updater) };
  });
}

function deleteFeedbackFromTree(feedbacks: FeedbackNode[], targetId: string): FeedbackNode[] {
  return feedbacks
    .filter((fb) => fb.id !== targetId)
    .map((fb) => ({ ...fb, replies: deleteFeedbackFromTree(fb.replies, targetId) }));
}

function addReplyToTree(
  feedbacks: FeedbackNode[],
  parentId: string,
  reply: FeedbackNode,
): FeedbackNode[] {
  return feedbacks.map((fb) => {
    if (fb.id === parentId) {
      return { ...fb, replies: [...fb.replies, reply] };
    }
    return { ...fb, replies: addReplyToTree(fb.replies, parentId, reply) };
  });
}

// ─────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────
export default function DiscussionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const [forum, setForum] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [posting, setPosting] = useState(false);
  const [pendingComment, setPendingComment] = useState<string | null>(null);

  useEffect(() => {
    if (id) fetchForum();
  }, [id]);

  async function fetchForum() {
    setLoading(true);
    try {
      const res = await api.get(`/outputs/forum/${id}`);
      setForum(res.data);
    } catch (err) {
      console.error("Error loading forum:", err);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Optimistic local state updater — no server round-trip needed
  const updateFeedbacks = useCallback((
    updater: (feedbacks: FeedbackNode[]) => FeedbackNode[]
  ) => {
    setForum((prev: any) => prev
      ? { ...prev, feedbacks: updater(prev.feedbacks ?? []) }
      : prev
    );
  }, []);

  // Background sync after moderation (new comment/reply/edit)
  function syncAfterModeration(onClear?: () => void) {
    setTimeout(async () => {
      try {
        const res = await api.get(`/outputs/forum/${id}`);
        setForum(res.data);
      } catch {}
      onClear?.();
    }, 2500);
  }

  async function handleAddComment() {
    if (!newComment.trim() || posting) return;
    setPosting(true);
    const content = newComment;
    try {
      await api.post(`/forums/${id}/feedback`, { content });
      setNewComment("");
      setPendingComment(content);
      syncAfterModeration(() => setPendingComment(null));
    } catch (err) {
      if (isUnauthorized(err)) { setShowLogin(true); return; }
      console.error(err);
    } finally {
      setPosting(false);
    }
  }

  if (loading)
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-100 rounded w-1/3" />
        <div className="h-40 bg-gray-100 rounded mt-8" />
      </div>
    );

  if (!forum)
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center text-gray-500">
        Discussion not found.
      </div>
    );

  const { output } = forum;
  const resource = output?.resource;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <button onClick={() => router.back()}
        className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
        ← Back
      </button>

      {/* Resource context card */}
      {output && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-1 flex-1">
              {resource?.type && (
                <span className="inline-block text-[11px] font-semibold bg-blue-50 text-blue-700 rounded-full px-3 py-0.5 mb-2">
                  {resource.type.replace(/_/g, " ")}
                </span>
              )}
              <h1 className="text-2xl font-bold text-gray-900 leading-snug">{output.title}</h1>
              <p className="text-sm text-gray-500 mt-1 flex flex-wrap gap-3">
                {resource?.organization?.name && <span>🏢 {resource.organization.name}</span>}
                {resource?.region && resource.region !== "ALL" && <span>📍 {resource.region}</span>}
                {resource?.year && resource.year !== "ALL" && <span>📅 {resource.year}</span>}
              </p>
              {output.summary && (
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{output.summary}</p>
              )}
            </div>
            {(output.fileUrl || resource?.fileUrl) && (
              <a href={output.fileUrl ?? resource.fileUrl} target="_blank" rel="noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                📄 View Resource
              </a>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-400">
            <span>Discussion started {formatDistanceToNow(new Date(forum.createdAt), { addSuffix: true })}</span>
            <span>{forum.feedbacks?.length ?? 0} comment{forum.feedbacks?.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      )}

      {/* Add comment */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Join the Discussion</h2>
        {showLogin ? (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center space-y-3">
            <p className="text-sm text-gray-600">Please log in to participate</p>
            <ExternalLoginButtons />
          </div>
        ) : (
          <div className="space-y-3">
            <textarea
              className="w-full p-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              rows={3} placeholder="Share your thoughts…"
              value={newComment} onChange={(e) => setNewComment(e.target.value)}
            />
            <button disabled={!newComment.trim() || posting} onClick={handleAddComment}
              className="px-5 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              {posting ? "Posting…" : "Post Comment"}
            </button>
          </div>
        )}
      </div>

      {/* Comments thread */}
      <div>
        <h2 className="text-base font-semibold text-gray-700 px-1 mb-3">
          {forum.feedbacks?.length
            ? `${forum.feedbacks.length} Comment${forum.feedbacks.length !== 1 ? "s" : ""}`
            : "No comments yet — be the first!"}
        </h2>

        {pendingComment && (
          <div className="rounded-xl border border-dashed border-emerald-300 bg-emerald-50 p-4 mb-4 text-sm text-gray-700">
            <div className="flex items-center gap-2 mb-2 text-xs text-emerald-600 font-medium">
              <span className="animate-pulse">●</span> Posting your comment…
            </div>
            <p>{pendingComment}</p>
          </div>
        )}

        {forum.feedbacks?.length > 0 && (
          <div className="space-y-4">
            {forum.feedbacks.map((fb: FeedbackNode) => (
              <FeedbackItem
                key={fb.id}
                fb={fb}
                depth={0}
                forumId={id}
                updateFeedbacks={updateFeedbacks}
                syncAfterModeration={syncAfterModeration}
                onUnauthorized={() => setShowLogin(true)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// FeedbackItem — fully optimistic: reactions/deletes instant,
// new comments/replies/edits show pending then sync after moderation
// ─────────────────────────────────────────────────────────────────
function FeedbackItem({
  fb,
  depth,
  forumId,
  updateFeedbacks,
  syncAfterModeration,
  onUnauthorized,
}: {
  fb: FeedbackNode;
  depth: number;
  forumId: string;
  updateFeedbacks: (updater: (fbs: FeedbackNode[]) => FeedbackNode[]) => void;
  syncAfterModeration: (onClear?: () => void) => void;
  onUnauthorized: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(fb.content);
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingReply, setPendingReply] = useState<string | null>(null);

  // ✅ REACTIONS — fully optimistic, instant UI update
  async function handleReaction(type: "LIKE" | "DISLIKE") {
    // Optimistically toggle the count immediately
    updateFeedbacks((fbs) =>
      updateFeedbackInTree(fbs, fb.id, (target) => {
        const alreadyReacted = target.reactions.some(
          (r) => r.type === type && r.userId === "me"
        );
        return {
          ...target,
          likes: type === "LIKE"
            ? alreadyReacted ? target.likes - 1 : target.likes + 1
            : target.likes,
          dislikes: type === "DISLIKE"
            ? alreadyReacted ? target.dislikes - 1 : target.dislikes + 1
            : target.dislikes,
          reactions: alreadyReacted
            ? target.reactions.filter((r) => !(r.type === type && r.userId === "me"))
            : [...target.reactions, { id: "optimistic", type, userId: "me" }],
        };
      })
    );

    try {
      await api.post(`/forums/${forumId}/feedback/${fb.id}/reaction`, { type });
      // No need to re-fetch — optimistic state is correct
    } catch (err) {
      if (isUnauthorized(err)) { onUnauthorized(); return; }
      // Revert on error — just re-toggle back
      updateFeedbacks((fbs) =>
        updateFeedbackInTree(fbs, fb.id, (target) => ({
          ...target,
          likes: type === "LIKE"
            ? target.reactions.some((r) => r.type === type && r.userId === "me")
              ? target.likes - 1 : target.likes + 1
            : target.likes,
          dislikes: type === "DISLIKE"
            ? target.reactions.some((r) => r.type === type && r.userId === "me")
              ? target.dislikes - 1 : target.dislikes + 1
            : target.dislikes,
        }))
      );
      console.error(err);
    }
  }

  // ✅ EDIT — optimistic content update, background sync for moderation
  async function handleEdit() {
    if (!editContent.trim()) return;
    setBusy(true);
    const previousContent = fb.content;

    // Optimistically update content immediately
    updateFeedbacks((fbs) =>
      updateFeedbackInTree(fbs, fb.id, (target) => ({
        ...target,
        content: editContent,
      }))
    );
    setEditing(false);

    try {
      await api.patch(`/forums/${forumId}/feedback/${fb.id}`, { content: editContent });
      syncAfterModeration(); // background sync to get approved status
    } catch (err) {
      // Revert on error
      updateFeedbacks((fbs) =>
        updateFeedbackInTree(fbs, fb.id, (target) => ({
          ...target,
          content: previousContent,
        }))
      );
      setEditing(true);
      if (isUnauthorized(err)) { onUnauthorized(); return; }
      console.error(err);
    } finally {
      setBusy(false);
    }
  }

  // ✅ DELETE — instant optimistic removal
  async function handleDelete() {
    if (!confirm("Delete this comment?")) return;

    // Optimistically remove immediately
    updateFeedbacks((fbs) => deleteFeedbackFromTree(fbs, fb.id));

    try {
      await api.delete(`/forums/${forumId}/feedback/${fb.id}`);
      // Already removed — no refresh needed
    } catch (err) {
      if (isUnauthorized(err)) { onUnauthorized(); return; }
      // On error re-fetch to restore
      const res = await api.get(`/outputs/forum/${forumId}`).catch(() => null);
      if (res) updateFeedbacks(() => res.data.feedbacks ?? []);
      console.error(err);
    }
  }

  // ✅ REPLY — optimistic preview bubble, syncs after moderation
  async function handleReply() {
    if (!replyContent.trim()) return;
    setBusy(true);
    const content = replyContent;
    try {
      await api.post(`/forums/${forumId}/feedback/${fb.id}/reply`, { content });
      setReplyContent("");
      setShowReply(false);
      setPendingReply(content);
      syncAfterModeration(() => setPendingReply(null));
    } catch (err) {
      if (isUnauthorized(err)) { onUnauthorized(); return; }
      console.error(err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ marginLeft: depth > 0 ? 20 : 0 }}>
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

        {/* Avatar + author */}
        <div className="flex items-center gap-2 mb-3">
          {fb.authorImage ? (
            <img src={fb.authorImage} className="w-7 h-7 rounded-full object-cover" alt={fb.author} />
          ) : (
            <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">
              {fb.author?.[0]?.toUpperCase() ?? "?"}
            </div>
          )}
          <span className="text-sm font-medium text-gray-800">{fb.author}</span>
          <span className="text-xs text-gray-400 ml-auto">
            {format(new Date(fb.createdAt), "dd MMM yyyy")}
          </span>
        </div>

        {/* Content or edit form */}
        {editing ? (
          <div className="space-y-2">
            <textarea
              className="w-full p-2 border border-gray-200 rounded-lg text-sm resize-none"
              rows={2} value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="flex gap-2">
              <button onClick={handleEdit} disabled={busy}
                className="px-3 py-1 bg-emerald-600 text-white text-xs rounded-lg hover:bg-emerald-700 disabled:opacity-40">
                {busy ? "Saving…" : "Save"}
              </button>
              <button onClick={() => setEditing(false)}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-800 leading-relaxed">{fb.content}</p>
        )}

        {/* Action bar */}
        {!editing && (
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-400">
            <button onClick={() => handleReaction("LIKE")}
              className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
              👍 {fb.likes}
            </button>
            <button onClick={() => handleReaction("DISLIKE")}
              className="flex items-center gap-1 hover:text-orange-500 transition-colors">
              👎 {fb.dislikes}
            </button>
            {depth < 2 && (
              <button onClick={() => setShowReply(!showReply)}
                className="hover:text-blue-600 transition-colors">
                💬 Reply{fb.replies?.length > 0 ? ` (${fb.replies.length})` : ""}
              </button>
            )}
            {fb.isOwner && (
              <>
                <button onClick={() => setEditing(true)} className="hover:text-blue-600 transition-colors">
                  ✏️ Edit
                </button>
                <button onClick={handleDelete} className="hover:text-red-500 transition-colors">
                  🗑️ Delete
                </button>
              </>
            )}
          </div>
        )}

        {/* Reply input */}
        {showReply && (
          <div className="mt-3 space-y-2">
            <textarea
              className="w-full p-2 border border-gray-200 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
              rows={2} placeholder="Write a reply…"
              value={replyContent} onChange={(e) => setReplyContent(e.target.value)}
            />
            <div className="flex gap-2">
              <button onClick={handleReply} disabled={busy || !replyContent.trim()}
                className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 disabled:opacity-40">
                {busy ? "Posting…" : "Reply"}
              </button>
              <button onClick={() => setShowReply(false)}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Nested replies + pending reply bubble */}
        {(fb.replies?.length > 0 || pendingReply) && (
          <div className="mt-4 space-y-3 border-l-2 border-gray-100 pl-3">
            {pendingReply && (
              <div className="rounded-lg border border-dashed border-blue-200 bg-blue-50 p-3 text-xs text-gray-600">
                <span className="text-blue-500 font-medium animate-pulse">● </span>
                Posting reply… <span className="italic text-gray-500">{pendingReply}</span>
              </div>
            )}
            {fb.replies?.map((child) => (
              <FeedbackItem
                key={child.id}
                fb={child}
                depth={depth + 1}
                forumId={forumId}
                updateFeedbacks={updateFeedbacks}
                syncAfterModeration={syncAfterModeration}
                onUnauthorized={onUnauthorized}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
