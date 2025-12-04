export const LoadingOverlay = ({
  message = "Loading...",
}: {
  message?: string;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md animate-fadeIn">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />

      {/* Text */}
      <p className="mt-4 text-gray-700 font-medium text-base text-center px-4">
        {message}
      </p>
    </div>
  );
};
