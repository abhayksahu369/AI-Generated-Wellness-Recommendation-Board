import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { generateTips as aiGenerateTips,  generateTipDetail as aiGenerateTipDetail, } from "../services/aiService";


export type WellnessGoal =
  | "weight_loss"
  | "stress_management"
  | "better_sleep"
  | "productivity"
  | "fitness";

export interface WellnessProfile {
  age: number;
  gender: "male" | "female" | "other";
  goal: WellnessGoal;
}

export interface WellnessTip {
  id: string;
  title: string;
  icon: string;
  summary: string;
  detail?: string;
  steps?: string[];
}

type ScreenName = "profile" | "tips" | "detail" | "favorites";

interface WellnessContextValue {
  profile: WellnessProfile | null;
  setProfile: (profile: WellnessProfile) => void;

  tips: WellnessTip[];
  setTips: React.Dispatch<React.SetStateAction<WellnessTip[]>>;

  currentScreen: ScreenName;
  goToScreen: (screen: ScreenName) => void;

  selectedTip: WellnessTip | null;
  setSelectedTip: (tip: WellnessTip | null) => void;

  isLoading: boolean;
  error: string | null;

  generateTips: (profileOverride?: WellnessProfile) => Promise<void>;
  loadTipDetail: (tip: WellnessTip) => Promise<void>;

  favorites: WellnessTip[];
  toggleFavorite: (tip: WellnessTip) => void;
  isFavorite: (id: string) => boolean;
}

const WellnessContext = createContext<WellnessContextValue | undefined>(undefined);

export const WellnessProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfileState] = useState<WellnessProfile | null>(null);
  const [tips, setTips] = useState<WellnessTip[]>([]);
  const [currentScreen, setCurrentScreen] = useState<ScreenName>("profile");

  const [selectedTip, setSelectedTip] = useState<WellnessTip | null>(null);
const [favorites, setFavorites] = useState<WellnessTip[]>(() => {
  try {
    const stored = localStorage.getItem("wellness_favorites");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


 useEffect(() => {
    try {
      const stored = localStorage.getItem("wellness_favorites");
      if (stored) {
        const parsed: WellnessTip[] = JSON.parse(stored);
        setFavorites(parsed);
        console.log("Loaded favorites from storage:", parsed);
      }
    } catch (err) {
      console.warn("Failed to read local storage, resetting...");
      localStorage.removeItem("wellness_favorites");
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("wellness_favorites", JSON.stringify(favorites));
    console.log("Saved favorites:", favorites);
  }, [favorites]);


  const setProfile = (p: WellnessProfile) => setProfileState(p);

  const goToScreen = (screen: ScreenName) => setCurrentScreen(screen);

  const generateTips = async (profileOverride?: WellnessProfile) => {
    const effectiveProfile = profileOverride ?? profile;
    if (!effectiveProfile) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await aiGenerateTips(effectiveProfile);
      setTips(result);
    } catch {
      setError("Failed to generate tips.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTipDetail = async (tip: WellnessTip) => {
    if (!profile) return;

    setIsLoading(true);
    setError(null);

    try {
      if (!tip.detail) {
        const detail = await aiGenerateTipDetail(tip, profile);
        const full = { ...tip, detail: detail.detail, steps: detail.steps };

        setTips((prev) => prev.map((t) => (t.id === tip.id ? full : t)));
        setSelectedTip(full);
      } else {
        setSelectedTip(tip);
      }
    } catch {
      setError("Failed to load details");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (tip: WellnessTip) => {
    setFavorites((prev) =>
      prev.find((f) => f.id === tip.id)
        ? prev.filter((f) => f.id !== tip.id)
        : [...prev, tip]
    );
  };

  const isFavorite = (id: string) => favorites.some((f) => f.id === id);

  return (
    <WellnessContext.Provider
      value={{
        profile,
        setProfile,
        tips,
        setTips,
        currentScreen,
        goToScreen,
        selectedTip,
        setSelectedTip,
        isLoading,
        error,
        generateTips,
        loadTipDetail,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </WellnessContext.Provider>
  );
};

export const useWellness = () => {
  const ctx = useContext(WellnessContext);
  if (!ctx) throw new Error("useWellness must be used inside WellnessProvider");
  return ctx;
};