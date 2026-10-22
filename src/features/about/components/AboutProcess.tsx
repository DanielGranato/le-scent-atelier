import { STEPS } from '../content'
import AboutSection from './AboutSection'

export default function AboutProcess() {
  return (
    <AboutSection title={STEPS.title}>
      <ol className="grid gap-8 md:grid-cols-3 md:gap-x-(--gutter)">
        {STEPS.items.map((step, index) => (
          <li key={step.lead} className="flex flex-col gap-3 border-t border-ink pt-5">
            <span aria-hidden="true" className="text-sm font-medium tracking-label text-olive">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3>{step.lead}</h3>
            <p className="max-w-[40ch] text-base">{step.text}</p>
          </li>
        ))}
      </ol>
    </AboutSection>
  )
}
