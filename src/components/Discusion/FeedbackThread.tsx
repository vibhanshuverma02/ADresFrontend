import Image from "next/image";
import { motion } from "framer-motion";
import { getAvatar } from "@/lib/utils";
import { format } from "date-fns";

export const FeedbackThread = ({ fb, level = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 4 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className="mt-4"
  >
    <div className="flex items-start gap-3">
      
      {/* Vertical thread line */}
      {level > 0 && (
        <div
          className="border-l border-gray-300 mr-3"
          style={{ height: "100%", marginLeft: `${level * 20}px` }}
        />
      )}

      {/* Avatar */}
   <Image
  src={getAvatar(fb)}
  width={36}
  height={36}
  alt="avatar"
  unoptimized
  className="rounded-full object-cover border shadow-sm"
  onError={(e: any) => (e.currentTarget.src = "/globe.svg")}
/>


      {/* Main content */}
      <div className="flex-1">
        <div className="flex justify-between text-xs text-gray-500">
          <span className="font-semibold text-gray-800">
            {fb.researcher?.user?.name || fb.externalActor?.name}
          </span>
          <span>{format(new Date(fb.createdAt), "PPP")}</span>
        </div>

        <span className="text-[10px] bg-gray-100 border rounded-md px-1.5 py-0.5 text-gray-600 font-medium">
          {fb.type}
        </span>

        <p className="text-sm text-gray-900 mt-1 leading-relaxed">
          {fb.content}
        </p>

        {/* Replies */}
        {fb.replies?.map((r: any, i: number) => (
          <FeedbackThread key={i} fb={r} level={level + 1} />
        ))}
      </div>
    </div>
  </motion.div>
);
