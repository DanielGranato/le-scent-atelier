// Fictional contact details, for a portfolio project: no real address, phone or accounts.
const options = [
  { label: 'Email', value: 'hello@lescentatelier.test' },
  { label: 'Replies', value: 'Replies within 2 days' },
  { label: 'Instagram', value: '@lescentatelier' },
]

/** Other ways to reach the brand. Plain text only (nothing here is a real link). */
export default function ContactInfo() {
  return (
    <aside aria-labelledby="contact-info-title" className="flex flex-col gap-6">
      <h2 id="contact-info-title" className="text-[clamp(1.5rem,2.5vw,2rem)] leading-tight">
        Other ways to reach us
      </h2>

      <dl className="flex flex-col">
        {options.map((option) => (
          <div key={option.label} className="flex flex-col gap-1 border-t border-ink py-4">
            <dt className="text-xs font-medium uppercase tracking-(--tracking-label) text-olive">{option.label}</dt>
            <dd className="text-base">{option.value}</dd>
          </div>
        ))}
      </dl>

      <p className="text-sm text-olive">These details are fictional, like the brand.</p>
    </aside>
  )
}
