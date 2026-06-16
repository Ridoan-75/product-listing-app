'use client';

import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

interface ToastProps extends Toast {
  onClose: (id: string) => void;
}

export function Toast({ id, message, type, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    if (duration === 0) return;
    
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const bgColor = {
    success: 'bg-purple-50 border-purple-200',
    error: 'bg-purple-50 border-purple-200',
    info: 'bg-purple-50 border-purple-200',
  }[type];

  const textColor = {
    success: 'text-purple-700',
    error: 'text-purple-700',
    info: 'text-purple-700',
  }[type];

  const iconColor = {
    success: 'text-purple-600',
    error: 'text-purple-600',
    info: 'text-purple-600',
  }[type];

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  }[type];

  return (
    <div
      className={`flex items-start gap-3 border rounded-lg p-4 shadow-lg ${bgColor} ${textColor} animate-in slide-in-from-top fade-in`}
      role="alert"
      aria-live="polite"
    >
      <Icon size={20} className={iconColor} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="ml-2 p-0.5 hover:bg-white/50 rounded transition-colors"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
