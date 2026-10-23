import { OPTIONS } from '../content'

/** The delivery options as a real table: method, time and cost. */
export default function ShippingOptions() {
  const { columns } = OPTIONS

  return (
    <section aria-labelledby="shipping-options-title" className="border-t border-ink/15">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-(--gutter) py-(--section-y) lg:py-[calc(var(--section-y)*1.25)]">
        <h2 id="shipping-options-title">{OPTIONS.title}</h2>

        <table className="w-full max-w-[60rem] text-left">
          <caption className="sr-only">{OPTIONS.caption}</caption>
          <thead>
            <tr>
              {[columns.method, columns.time, columns.cost].map((label) => (
                <th
                  key={label}
                  scope="col"
                  className="pb-3 pr-4 text-xs font-medium uppercase tracking-label text-olive"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {OPTIONS.rows.map((row) => (
              <tr key={row.method} className="border-t border-ink">
                <th scope="row" className="py-4 pr-4 text-sm font-semibold uppercase tracking-[0.04em] md:text-base">
                  {row.method}
                </th>
                <td className="py-4 pr-4 text-sm md:text-base">{row.time}</td>
                <td className="py-4 text-sm md:text-base">{row.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
