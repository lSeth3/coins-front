'use client'

import { Toaster, toast } from 'sonner'

export function ToastProvider() {
  return <Toaster position="top-right" />
}

export function useToast() {
  return toast
}