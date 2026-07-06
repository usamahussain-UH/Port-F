import ContactForm from './ContactForm'

export default function GuestBookSection() {
  return (
    <section className="container section" id="contact-form">
      <div className="section-head">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-sub">Send me a message and I'll respond within 24 hours.</p>
      </div>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <ContactForm />
      </div>
    </section>
  )
}
