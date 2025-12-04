import React from "react";
import { useWellness } from "../context/WellnessContext";

export const FavoritesScreen: React.FC = () => {
  const { favorites, goToScreen, loadTipDetail, isLoading } = useWellness();

  return (
    <div className="max-w-md mx-auto pt-4 pb-24 px-4 animate-fadeIn">

      {/* Header */}
      <div className="text-center mb-4">
        <div className="text-4xl mb-1">⭐</div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Your Saved Tips
        </h2>
        <p className="text-gray-500 text-sm">
          Quick access to your favorite wellness tips ✨
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center text-gray-600 py-6">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="mt-2 text-sm">Loading your saved tips...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && favorites.length === 0 && (
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
          <p className="text-gray-600 text-sm">No favorites yet.</p>
          <p className="text-gray-400 text-xs mt-1">
            Tap the ⭐ on any tip to save it here.
          </p>
        </div>
      )}

      {/* Favorites List */}
      {!isLoading && favorites.length > 0 && (
        <div className="space-y-3 mt-2">
          {favorites.map((tip) => (
            <div
              key={tip.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-md p-4 flex items-center justify-between gap-3 hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
            >
              <div className="flex items-start gap-3 w-[75%]">
                <span className="text-3xl">{tip.icon}</span>
                <p className="text-sm font-semibold text-gray-800 leading-snug">
                  {tip.title}
                </p>
              </div>

              <div className="flex justify-end w-[25%]">
                <button
                  className="text-xs sm:text-sm text-teal-600 hover:text-teal-800 underline"
                  onClick={async () => {
                    await loadTipDetail(tip);
                    goToScreen("detail");
                  }}
                >
                  View →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
