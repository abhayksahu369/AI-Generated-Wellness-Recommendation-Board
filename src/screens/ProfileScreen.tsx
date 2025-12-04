import React, { useState } from "react";
import type {
  WellnessGoal,
  WellnessProfile,
} from "../context/WellnessContext";
import { useWellness } from "../context/WellnessContext";
import { LoadingOverlay } from "../components/LoadingOverlay";

const goals: { value: WellnessGoal; label: string }[] = [
  { value: "weight_loss", label: "Weight loss" },
  { value: "stress_management", label: "Stress management" },
  { value: "better_sleep", label: "Better sleep" },
  { value: "productivity", label: "Productivity" },
  { value: "fitness", label: "Overall fitness" },
];

export const ProfileScreen: React.FC = () => {
  const { setProfile, generateTips, goToScreen, isLoading } = useWellness();

  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female" | "other">("other");
  const [goal, setGoal] = useState<WellnessGoal>("stress_management");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAge = Number(age || "0") || 25;

    const profile: WellnessProfile = {
      age: parsedAge,
      gender,
      goal,
    };

    setProfile(profile);
    await generateTips(profile);
    goToScreen("tips");
  };

  return (
    <div className="relative flex justify-center mt-6">
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md bg-white/70 backdrop-blur-xl shadow-lg rounded-2xl p-6 border border-white/40 space-y-6 transition-all duration-300 ${
          isLoading ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">🌱</div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Let’s personalize your journey
          </h2>
          <p className="text-gray-500 text-sm">
            Answer a few questions so we can guide you better ✨
          </p>
        </div>

        {/* Age Input */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            placeholder="Enter your age"
            className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-teal-400 focus:border-teal-500 outline-none transition-all"
          />
        </div>

        {/* Gender Select */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) =>
              setGender(e.target.value as "male" | "female" | "other")
            }
            className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-teal-400 focus:border-teal-500 outline-none transition-all"
          >
            <option value="other">Other / Prefer not to say</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        {/* Goal Choose */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">
            What’s your main focus? 🎯
          </p>

          <div className="grid grid-cols-2 gap-2">
            {goals.map((g) => (
              <button
                key={g.value}
                type="button"
                onClick={() => setGoal(g.value)}
                className={`px-3 py-3 rounded-xl text-sm transition-all shadow-sm border
                  ${
                    goal === g.value
                      ? "bg-teal-500 text-white border-teal-500 scale-105"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:opacity-90 text-white py-3 rounded-xl text-lg transition shadow-md tracking-wide"
        >
          Continue →
        </button>
      </form>

     {isLoading && <LoadingOverlay message="Generating your wellness tips..." />}

    </div>
  );
};
