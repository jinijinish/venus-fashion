// components/category/EmptyState.tsx
"use client";

interface EmptyStateProps {
  onBrowseOther: () => void;
}

export default function EmptyState({ onBrowseOther }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <p className="text-gray-500 text-lg">No products found in this category.</p>
      <button
        onClick={onBrowseOther}
        className="mt-4 px-6 py-2 bg-amber-400 text-white rounded-lg hover:bg-amber-500 transition-colors"
      >
        Browse Other Categories
      </button>
    </div>
  );
}