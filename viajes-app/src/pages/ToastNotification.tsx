import React, { useEffect } from "react";

interface ToastNotificationProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  onClose: () => void;
  duration?: number;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800 border-green-300";
      case "error":
        return "bg-red-100 text-red-800 border-red-300";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
        return "ℹ";
      default:
        return "";
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 animate-slide-in`}>
      <div
        className={`
        flex items-center gap-2 
        px-4 py-3 
        rounded-lg shadow-lg 
        border 
        ${getToastStyles()}
        transition-all duration-300 ease-in-out
      `}
      >
        <span className="text-lg">{getIcon()}</span>
        <p className="font-urbanist text-sm">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 hover:opacity-70 transition-opacity"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;
