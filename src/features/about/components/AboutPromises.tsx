import { PROMISES } from '../content'
import AboutSection from './AboutSection'

export default function AboutPromises() {
  return (
    <AboutSection title={PROMISES.title}>
      <ul className="grid gap-8 md:grid-cols-3 md:gap-x-(--gutter)">
        {PROMISES.items.map((promise) => (
          <li key={promise.lead} className="flex flex-col gap-3 border-t border-ink pt-5">
            <h3>{promise.lead}</h3>
            <p className="max-w-[40ch] text-base">{promise.text}</p>
          </li>
        ))}
      </ul>
    </AboutSection>
  )
}
