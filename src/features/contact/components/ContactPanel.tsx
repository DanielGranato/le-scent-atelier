import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'

/** The contact content for the side drawer: a short lead, the same form and the same info as the Contact page. */
export default function ContactPanel() {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-lg">Do you need further assistance?</p>
      <ContactForm />
      <div className="border-t border-ink/15 pt-8">
        <ContactInfo />
      </div>
    </div>
  )
}
