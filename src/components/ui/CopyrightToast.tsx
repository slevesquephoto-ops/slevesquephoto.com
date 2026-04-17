"use client"

import { useState, useEffect, useCallback } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

const MESSAGE =
  "© S. Lévesque Photo — Tous droits réservés. La reproduction est interdite sans autorisation."

export function CopyrightToast() {
  const [visible, setVisible] = useState(false)
  const reduceMotion = useReducedMotion()

  const show = useCallback(() => {
    setVisible(true)
  }, [])

  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(timer)
  }, [visible])

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "IMG") {
        e.preventDefault()
        show()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const isSave = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s"
      if (isSave) {
        e.preventDefault()
        show()
      }
    }

    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [show])

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {visible && (
          <motion.p
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
            transition={{ duration: 0.25 }}
            className="bg-ink text-white text-xs px-5 py-3 max-w-sm text-center leading-relaxed"
          >
            {MESSAGE}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
