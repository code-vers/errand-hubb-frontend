import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'danger' | 'warning' | 'info' | 'success';
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  type = 'danger',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger': return <AlertTriangle className="text-red-500" size={32} />;
      case 'warning': return <AlertTriangle className="text-amber-500" size={32} />;
      case 'success': return <CheckCircle className="text-green-500" size={32} />;
      default: return <Info className="text-blue-500" size={32} />;
    }
  };

  const getButtonClass = () => {
    switch (type) {
      case 'danger': return 'bg-red-500 hover:bg-red-600';
      case 'warning': return 'bg-amber-500 hover:bg-amber-600';
      case 'success': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-200">
        <div className="p-8 flex flex-col items-center text-center">
          <div className="mb-5 p-4 bg-gray-50 rounded-2xl">
            {getIcon()}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed px-2">{message}</p>
        </div>
        <div className="flex border-t border-gray-100">
          <button
            onClick={onCancel}
            className="flex-1 py-4.5 text-sm font-bold text-gray-400 hover:bg-gray-50 transition-colors border-r border-gray-100"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-4.5 text-sm font-bold text-white transition-colors ${getButtonClass()}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
