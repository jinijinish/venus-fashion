// components/ui/LoadingSpinner.tsx
export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f7f4] to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-400 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    </div>
  );
}