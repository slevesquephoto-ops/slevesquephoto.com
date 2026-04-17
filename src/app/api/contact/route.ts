import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const SERIES_LABELS: Record<string, string> = {
  mammiferes: "Mammifères sauvages",
  oiseaux: "Oiseaux",
  paysages: "Paysages",
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body: unknown = await request.json()

  if (
    typeof body !== "object" ||
    body === null ||
    !("name" in body) ||
    !("email" in body) ||
    !("message" in body)
  ) {
    return NextResponse.json(
      { error: "Champs requis manquants." },
      { status: 400 }
    )
  }

  const { name, email, message, series, website } = body as {
    name: string
    email: string
    message: string
    series?: string
    website?: string
  }

  // Honeypot : un bot remplit ce champ invisible, un humain non
  if (website) {
    return NextResponse.json({ success: true })
  }

  if (!name.trim() || !email.trim() || !message.trim()) {
    return NextResponse.json(
      { error: "Les champs nom, courriel et message sont obligatoires." },
      { status: 400 }
    )
  }

  const seriesLabel =
    series && SERIES_LABELS[series] ? SERIES_LABELS[series] : "Aucune"

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: "Site Web <onboarding@resend.dev>",
    to: "slevesquephoto@gmail.com",
    replyTo: email,
    subject: `Nouveau message de ${name}`,
    text: [
      `Nom : ${name}`,
      `Courriel : ${email}`,
      `Série d'intérêt : ${seriesLabel}`,
      ``,
      `Message :`,
      message,
    ].join("\n"),
  })

  if (error) {
    console.error("Resend error:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'envoi." },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
