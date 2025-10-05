// @path: src/app/[lang]/not-found.tsx
import NotFoundHero from '@/components/shared/NotFoundHero'

export default function NotFoundPage() {
  return (
    <NotFoundHero
      backgroundImage="/seed/home_hero.png"
      imageAlt="404 Not Found background"
      title="404"
      subtitle="Cette page n'existe pas."
      ctaLabel="Retour à l’accueil"
      ctaHref="/"
    />
  )
}
