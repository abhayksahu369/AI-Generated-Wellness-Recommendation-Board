import { useWellness } from "../context/WellnessContext";

export const NavBar = () => {
  const { currentScreen, goToScreen } = useWellness();

  const navItems = [
    { screen: "tips", label: "🏠", text: "Home" },
    { screen: "favorites", label: "⭐", text: "Saved" },
    { screen: "profile", label: "👤", text: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-200 shadow-lg py-3 flex justify-around items-center animate-fadeIn">
      {navItems.map((item) => {
        const isActive = currentScreen === item.screen;

        return (
          <button
            key={item.screen}
            onClick={() => goToScreen(item.screen as any)}
            className={`flex flex-col items-center text-xs transition-all ${
              isActive
                ? "text-teal-600 font-semibold scale-110"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="text-2xl">{item.label}</span>
            <span className="mt-0.5">{item.text}</span>
          </button>
        );
      })}
    </div>
  );
};
