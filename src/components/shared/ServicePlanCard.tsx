// @path: src/components/shared/ServicePlanCard.tsx
import FeatureLine from './FeatureLine'
import type { ServicePlan } from '@/content/types/services'

type ServicePlanCardProps = Pick<
  ServicePlan,
  'title' | 'price' | 'features' | 'type'
> & {
  className?: string
}

export default function ServicePlanCard({
  title,
  price,
  features,
  type,
  className = '',
}: ServicePlanCardProps) {
  return (
    <article
      className={[
        'flex h-full flex-col rounded-4xl bg-black p-8 text-white',
        className,
      ].join(' ')}
    >
      {type ? <p className="text-caption text-yellow mb-3">{type}</p> : null}

      <h3 className="text-title-2 mb-8">{title.toUpperCase()}</h3>

      {features && features.length > 0 && (
        <ul className="mb-10 space-y-4">
          {features.map((f) => (
            <FeatureLine key={f}>{f}</FeatureLine>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-4">
        <p className="text-title-2 text-yellow text-center uppercase">
          {price}
        </p>
      </div>
    </article>
  )
}
