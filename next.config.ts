// @path: next.config.ts
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const config: NextConfig = {
  async headers() {
    return [
      {
        source: '/((?!sitemap\\.xml$|robots\\.txt$|_next/|favicon\\.ico).*)',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }],
      },
    ]
  },
}

export default withNextIntl(config)
