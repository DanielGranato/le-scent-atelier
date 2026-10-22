import { Link } from 'react-router-dom'
import ButtonLink from '../../../components/ui/ButtonLink'
import { FAMILIES } from '../../products/families'
import { FAMILIES_INTRO } from '../content'
import AboutSection from './AboutSection'

export default function AboutFamilies() {
  return (
    <AboutSection title={FAMILIES_INTRO.title}>
      <p className="max-w-[60ch] text-lg">{FAMILIES_INTRO.text}</p>

      {/* the family photos are placeholders for now (the same ones as the Home page) */}
      <ul className="grid grid-cols-2 gap-x-(--gutter) gap-y-6 lg:grid-cols-4">
        {FAMILIES.map((family) => (
          <li key={family.id}>
            <Link to={`/catalog?family=${family.id}`} className="group flex flex-col gap-3">
              <div className="aspect-[4/5] overflow-hidden bg-bottle">
                <img
                  src={`${import.meta.env.BASE_URL}${family.image}`}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover transition-[scale] duration-300 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <span className="text-sm font-semibold uppercase tracking-[0.04em]">{family.title}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink to="/catalog">{FAMILIES_INTRO.primaryButton}</ButtonLink>
        <ButtonLink to="/sample-sets" variant="secondary">
          {FAMILIES_INTRO.secondaryButton}
        </ButtonLink>
      </div>
    </AboutSection>
  )
}
