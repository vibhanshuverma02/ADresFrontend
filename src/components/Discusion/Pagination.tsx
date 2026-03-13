"use client";

import { Button } from "@/components/ui/button";

export default function Pagination({ page, total, onPage }: any) {
  return (
    <div className="flex items-center justify-center gap-3 py-6">
      <Button disabled={page <= 1} onClick={() => onPage(page - 1)} variant="outline">
        Prev
      </Button>

      <span className="font-semibold text-gray-600">Page {page}</span>

      <Button
        disabled={total && page >= total}
        onClick={() => onPage(page + 1)}
        variant="outline"
      >
        Next
      </Button>
    </div>
  );
}
