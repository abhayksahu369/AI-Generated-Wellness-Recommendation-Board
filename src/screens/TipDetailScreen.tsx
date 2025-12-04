// src/screens/TipDetailScreen.tsx
import React from "react";
import { useWellness } from "../context/WellnessContext";

export const TipDetailScreen: React.FC = () => {
  const {
    selectedTip,
    goToScreen,
    toggleFavorite,
    isFavorite,
    isLoading,
  } = useWellness();

  if (!selectedTip)
    return (
      <div className="flex justify-center pt-10">
        <button
          onClick={() => goToScreen("tips")}
          className="text-teal-600 underline text-lg"
        >
          Back
        </button>
      </div>
    );

  return (
    <div className="w-full max-w-2xl mx-auto pt-4 pb-28 px-5 animate-fadeIn"> 
      {/* Main card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-7 space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <span className="text-5xl">{selectedTip.icon}</span>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 break-words">
              {selectedTip.title}
            </h2>
            <p className="text-xs text-gray-500">
              Guided tip based on your health profile ✨
            </p>
          </div>
        </div>

        {/* Favorite button */}
        <div className="flex justify-end">
          <button
            onClick={() => toggleFavorite(selectedTip)}
            className={`flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-full border transition ${
              isFavorite(selectedTip.id)
                ? "border-yellow-400 bg-yellow-50 text-yellow-600"
                : "border-gray-200 bg-gray-50 text-gray-500 hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-600"
            }`}
          >
            <span>{isFavorite(selectedTip.id) ? "⭐" : "☆"}</span>
            <span>{isFavorite(selectedTip.id) ? "Saved" : "Save"}</span>
          </button>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center text-gray-600 py-6">
            <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
            <p className="mt-2 text-sm">Fetching details...</p>
          </div>
        )}

        {/* Content */}
        {!isLoading && (
          <>
            {/* Explanation */}
            {selectedTip.detail && (
              <p className="text-gray-700 text-base leading-relaxed">
                {selectedTip.detail}
              </p>
            )}

            {/* Steps */}
            {selectedTip.steps && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  How to apply it 🧭
                </h3>

                <div className="space-y-5">
                  {selectedTip.steps.map((rawStep, index) => {
                    const match = rawStep.match(/\*\*(.*?)\*\*/);
                    const title = match ? match[1].replace(/:$/, "") : null;
                    const text = match ? rawStep.replace(match[0], "").trim() : rawStep;

                    return (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="h-9 w-9 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 font-semibold">
                          {index + 1}
                        </div>

                        <div className="flex-1">
                          {title && (
                            <p className="text-sm font-semibold text-gray-800">
                              {title}
                            </p>
                          )}
                          <p className="text-sm text-gray-600 leading-relaxed mt-1">
                            {text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
