"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

function ToastItem({ toast, onClose }: ToastProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const Icon = icons[toast.type];

  useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(() => {
        onClose(toast.id);
      }, toast.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onClose]);

  return (
    <div
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg border shadow-lg min-w-[300px] max-w-md animate-slide-in ${colors[toast.type]}`}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Kapat"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const showToast = (event: CustomEvent<Omit<Toast, "id">>) => {
      const toast: Toast = {
        ...event.detail,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };
      setToasts((prev) => [...prev, toast]);
    };

    const hideToast = (event: CustomEvent<{ id: string }>) => {
      setToasts((prev) => prev.filter((t) => t.id !== event.detail.id));
    };

    window.addEventListener("show-toast" as any, showToast as EventListener);
    window.addEventListener("hide-toast" as any, hideToast as EventListener);

    return () => {
      window.removeEventListener("show-toast" as any, showToast as EventListener);
      window.removeEventListener("hide-toast" as any, hideToast as EventListener);
    };
  }, []);

  const handleClose = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={handleClose} />
      ))}
    </div>
  );
}

// Helper function to show toast
export function showToast(
  message: string,
  type: ToastType = "info",
  duration?: number
) {
  const event = new CustomEvent("show-toast", {
    detail: { message, type, duration },
  });
  window.dispatchEvent(event);
}















