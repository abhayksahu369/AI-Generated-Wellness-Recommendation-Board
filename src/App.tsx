import React from "react";
import { useWellness } from "./context/WellnessContext";
import { ProfileScreen } from "./screens/ProfileScreen";
import { TipsBoardScreen } from "./screens/TipsBoardScreen";
import { TipDetailScreen } from "./screens/TipDetailScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { NavBar } from "./components/Navbar";

const App: React.FC = () => {
  const { currentScreen } = useWellness();

  const renderScreen = () => {
    switch (currentScreen) {
      case "profile":
        return <ProfileScreen />;
      case "tips":
        return <TipsBoardScreen />;
      case "detail":
        return <TipDetailScreen />;
      case "favorites":
        return <FavoritesScreen />;
      default:
        return <ProfileScreen />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F5F7F9] flex flex-col items-center pt-4 pb-24 px-4">
      
      {/* App Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 tracking-tight text-center">
        🌿 AI Wellness Board
      </h1>

      {/* Screen Content */}
      <div className="w-full max-w-2xl">{renderScreen()}</div>

      {/* Navigation */}
      <NavBar />
    </div>
  );
};

export default App;
