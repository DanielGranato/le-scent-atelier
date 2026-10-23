import ContactForm from '../features/contact/components/ContactForm'
import ContactInfo from '../features/contact/components/ContactInfo'

export default function Contact() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-10 px-(--gutter) py-(--section-y)">
      <header className="flex flex-col gap-3">
        <h1>Contact Us</h1>
        <p className="text-lg">Do you need further assistance?</p>
      </header>

      {/* form first on phones; form left and info right from md up */}
      <div className="grid items-start gap-12 md:grid-cols-2 md:gap-(--header-h)">
        <ContactForm />
        <ContactInfo />
      </div>
    </main>
  )
}
