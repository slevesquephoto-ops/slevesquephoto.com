"use client"

import { useState } from "react"

interface FormState {
  name: string
  email: string
  series: string
  message: string
}

const SERIES_OPTIONS = [
  { value: "", label: "Aucune série en particulier" },
  { value: "mammiferes", label: "Mammifères sauvages" },
  { value: "oiseaux", label: "Oiseaux" },
  { value: "paysages", label: "Paysages" },
]

type SubmitStatus = "idle" | "loading" | "success" | "error"

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    series: "",
    message: "",
  })
  const [status, setStatus] = useState<SubmitStatus>("idle")

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("Erreur serveur")

      setStatus("success")
      setForm({ name: "", email: "", series: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="py-16 text-center">
        <p className="font-serif text-2xl font-light text-ink mb-3">
          Message envoyé.
        </p>
        <p className="text-sm text-ink-muted">
          Je vous répondrai dans les 48 heures.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-xs uppercase tracking-widest text-ink-muted hover:text-ink transition-colors duration-200"
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-xl">
      <div className="flex flex-col gap-6">

        {/* Nom */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-xs uppercase tracking-widest text-ink-muted"
          >
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className="bg-transparent border-b border-border py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink transition-colors duration-200"
            placeholder="Votre nom"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-xs uppercase tracking-widest text-ink-muted"
          >
            Courriel
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="bg-transparent border-b border-border py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink transition-colors duration-200"
            placeholder="votre@courriel.com"
          />
        </div>

        {/* Série */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="series"
            className="text-xs uppercase tracking-widest text-ink-muted"
          >
            Série d&apos;intérêt
          </label>
          <select
            id="series"
            name="series"
            value={form.series}
            onChange={handleChange}
            className="bg-transparent border-b border-border py-2.5 text-sm text-ink focus:outline-none focus:border-ink transition-colors duration-200 cursor-pointer"
          >
            {SERIES_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="message"
            className="text-xs uppercase tracking-widest text-ink-muted"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="bg-transparent border-b border-border py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink transition-colors duration-200 resize-none"
            placeholder="Votre message…"
          />
        </div>

        {/* Erreur */}
        {status === "error" && (
          <p className="text-sm text-red-600">
            Une erreur est survenue. Veuillez réessayer ou écrire directement à{" "}
            <a
              href="mailto:info@slevesquephoto.com"
              className="underline underline-offset-2"
            >
              info@slevesquephoto.com
            </a>
            .
          </p>
        )}

        {/* Bouton */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="self-start bg-accent text-white text-xs uppercase tracking-widest px-8 py-3 hover:opacity-85 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Envoi…" : "Envoyer"}
        </button>

      </div>
    </form>
  )
}
