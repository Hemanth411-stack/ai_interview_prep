"use client"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light" // or "dark" for dark mode
      className="toaster group"
      toastOptions={{
        style: {
          background: 'var(--popover)',
          color: 'var(--popover-foreground)',
          border: 'var(--border)'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
