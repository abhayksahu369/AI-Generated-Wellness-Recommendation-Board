import React from "react";
import { useWellness } from "../context/WellnessContext";
import { LoadingOverlay } from "../components/LoadingOverlay"; // 🔥 import component

export const TipsBoardScreen: React.FC = () => {
  const {
    tips,
    loadTipDetail,
    goToScreen,
    isLoading,
    error,
    toggleFavorite,
    isFavorite,
  } = useWellness();

  return (
    <div className="relative max-w-md mx-auto pt-4 pb-24 px-4 space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <div className="text-4xl mb-2">✨</div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Personalized Wellness For You
        </h2>
        <p className="text-gray-500 text-sm">
          Based on your profile and goals 🌱
        </p>
      </div>

      {/* Favorites Button */}
      <button
        onClick={() => goToScreen("favorites")}
        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-medium py-3 rounded-xl shadow-md hover:opacity-90 transition active:scale-95"
      >
        ⭐ View Favorites
      </button>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center font-medium">{error}</p>
      )}

      {/* No tips */}
      {!isLoading && tips.length === 0 && (
        <p className="text-gray-500 text-center italic mt-6">
          No tips yet — start by completing your profile 🌿
        </p>
      )}

      {/* Tips List */}
      <div className="space-y-4">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white/70 backdrop-blur-xl shadow-xl border border-white/40 rounded-2xl p-5 flex justify-between items-center gap-4 hover:shadow-2xl hover:scale-[1.01] transition-all duration-200"
          >
            <div className="flex gap-4 items-start w-[75%]">
              <span className="text-4xl">{tip.icon}</span>

              <div className="min-w-0">
                <p className="text-lg text-gray-800 font-semibold leading-tight">
                  {tip.title}
                </p>
                <p className="text-gray-500 text-sm leading-snug mt-1 break-words">
                  {tip.summary}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 w-[25%]">
              <button
                onClick={() => toggleFavorite(tip)}
                className={`text-2xl transition transform ${
                  isFavorite(tip.id)
                    ? "text-yellow-500 scale-110"
                    : "text-gray-400 hover:text-yellow-500 hover:scale-110"
                }`}
              >
                {isFavorite(tip.id) ? "⭐" : "☆"}
              </button>

              <button
                onClick={async () => {
                  await loadTipDetail(tip);
                  goToScreen("detail");
                }}
                className="text-sm font-medium text-teal-600 hover:text-teal-800 underline transition"
              >
                View →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 Global Loading Overlay */}
      {isLoading && (
        <LoadingOverlay message="Preparing fresh tips for you..." />
      )}
    </div>
  );
};
