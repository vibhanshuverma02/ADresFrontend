import { useState } from "react";

interface ContactsEditorProps {
  contacts: Record<string, any>;
  onChange: (contacts: Record<string, any>) => void;
}

export function ContactsEditor({ contacts, onChange }: ContactsEditorProps) {
  const [items, setItems] = useState<[string, string][]>(() =>
    Object.entries(contacts || {})
  );

  const handleItemChange = (index: number, key: string, value: string) => {
    const updated = [...items];
    updated[index] = [key, value];
    setItems(updated);
    onChange(Object.fromEntries(updated));
  };

  const handleAdd = () => {
    setItems([...items, ["", ""]]);
  };

  const handleRemove = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    onChange(Object.fromEntries(updated));
  };

  // ✅ Return JSX
  return (
    <div className="space-y-2">
      {items.map(([key, value], i) => (
        <div key={i} className="flex space-x-2 items-center">
          <input
            className="border p-2 rounded w-1/3"
            placeholder="Key (e.g., phone)"
            value={key}
            onChange={(e) => handleItemChange(i, e.target.value, value)}
          />
          <input
            className="border p-2 rounded w-2/3"
            placeholder="Value (e.g., 1234567890)"
            value={value}
            onChange={(e) => handleItemChange(i, key, e.target.value)}
          />
          <button
            type="button"
            onClick={() => handleRemove(i)}
            className="text-red-500 font-bold"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="bg-gray-200 text-gray-700 py-1 px-3 rounded hover:bg-gray-300"
      >
        + Add Contact
      </button>
    </div>
  );
}
