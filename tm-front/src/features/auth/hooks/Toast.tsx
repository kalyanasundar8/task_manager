import { X } from 'lucide-react'
import type { NotificationType } from '../components/signup/types'

interface ToastType {
    message: string,
    status: NotificationType,
    isOpen: boolean,
    onClose: () => void
}

const Toast = ({ message, status, isOpen, onClose }: ToastType) => {
    if (!isOpen) return null;

    const statusStyles = {
        error: {
            bg: 'bg-red-50 border-red-200',
            text: 'text-red-700',
            icon: 'text-red-500'
        },
        warning: {
            bg: 'bg-amber-50 border-amber-200',
            text: 'text-amber-700',
            icon: 'text-amber-500'
        },
        success: {
            bg: 'bg-emerald-50 border-amber-200',
            text: 'text-emerald-700',
            icon: 'text-emerald-500'
        },
        info: {
            bg: 'bg-blue-50 border-blue-200',
            text: 'text-blue-700',
            icon: 'text-blue-500'
        }
    }

    const stlyes = statusStyles[status] || statusStyles.info;

    return (
        <div>
            <div className={`flex items-center justify-between ${stlyes.bg} p-3 mb-3`}>
                <p className={`text-sm font-normal ${stlyes.text}`}>{message}</p>
                <button type='button' onClick={onClose}>
                    <X size={12} />
                </button>
            </div>
        </div>
    )
}

export default Toast