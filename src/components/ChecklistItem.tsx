interface ChecklistItemProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
}

export function ChecklistItem({ id, label, checked, onChange }: ChecklistItemProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-yellow-500/5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(id, e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-yellow-500"
      />
      <span className={`text-sm leading-relaxed ${checked ? "text-gray-500 line-through" : "text-white"}`}>
        {label}
      </span>
    </label>
  );
}