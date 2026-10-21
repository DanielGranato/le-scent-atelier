import ContactForm from '../features/contact/ContactForm'

export default function Contact() {
  return (
    <main className="mx-auto flex w-full max-w-[480px] flex-1 flex-col gap-8 px-(--gutter) py-(--section-y)">
      <header className="flex flex-col gap-3">
        <h1>Contact Us</h1>
        <p className="text-lg">Do you need further assistance?</p>
      </header>
      <ContactForm />
    </main>
  )
}
