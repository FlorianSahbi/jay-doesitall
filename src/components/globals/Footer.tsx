// @path: src/components/globals/Footer.tsx
import Link from 'next/link'
import SocialBadge from '@/components/shared/SocialBadge'

type NavItem = { label: string; href: string }
type SocialItem = {
  label: string
  href: string
  icon: 'instagram' | 'youtube' | 'tiktok'
}

export default function Footer({
  menu,
  socials,
  followLabel,
  copyright,
}: {
  menu: NavItem[]
  socials: SocialItem[]
  followLabel: string
  copyright: string
}) {
  return (
    <footer className="grid-layout col-span-full bg-black">
      <div className="col-span-4 col-start-2 md:col-span-12 md:col-start-2 lg:mb-16 lg:flex lg:items-end lg:justify-between">
        <nav className="text-title-3 lg:text-title-2 mt-16 flex flex-col gap-6 text-white uppercase md:gap-4">
          {menu?.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 mb-20 lg:mb-0">
          <div className="mb-10 flex md:mb-2.5">
            <span className="text-title-4 lg:text-title-3 relative top-0.5 mr-4 content-center text-white">
              {followLabel}
            </span>

            <div className="flex items-center gap-3">
              {socials?.map((s) => (
                <SocialBadge
                  key={s.label}
                  href={s.href}
                  label={s.label}
                  icon={s.icon}
                />
              ))}
            </div>
          </div>

          <p className="text-dark-grey font-sans text-[12px] font-light normal-case">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
