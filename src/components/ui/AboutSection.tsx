import Image from "next/image"
import ReactMarkdown from "react-markdown"
import { buildCloudinaryUrl, buildBlurUrl } from "@/lib/cloudinary"
import type { AboutContent } from "@/lib/photos"

interface AboutSectionProps {
  content: AboutContent
}

export function AboutSection({ content }: AboutSectionProps) {
  const portraitUrl = buildCloudinaryUrl(content.portrait, {
    width: 800,
    quality: "auto:good",
  })
  const portraitBlurUrl = buildBlurUrl(content.portrait)

  return (
    <article className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

        {/* Texte */}
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest text-ink-faint mb-4">
            {content.subtitle}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-ink mb-2">
            {content.title}
          </h1>
          <p className="text-sm text-ink-muted mb-10">
            {content.location} — depuis {content.since}
          </p>

          <div className="prose-custom">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="text-base text-ink-muted leading-relaxed mb-6 last:mb-0">
                    {children}
                  </p>
                ),
              }}
            >
              {content.body}
            </ReactMarkdown>
          </div>
        </div>

        {/* Portrait */}
        <div className="relative w-full">
          <Image
            src={portraitUrl}
            alt="Portrait de S. Lévesque, photographe"
            width={800}
            height={1067}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-auto"
            placeholder="blur"
            blurDataURL={portraitBlurUrl}
          />
        </div>

      </div>
    </article>
  )
}
