export default function TopicCard() {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer">
      <h3 className="text-xl font-semibold text-slate-800">
        How to apply for a passport in 2025?
      </h3>
      <p className="text-gray-600 mt-2">
        Looking for up-to-date info on appointment slots and required documents.
      </p>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span>👤 John Doe</span>
        <span>💬 14 Replies</span>
      </div>
    </div>
  );
}
