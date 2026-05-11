export default function ContactSection() {
  return (
    <section className="container section" id="contact">
      <div className="section-head">
        <h2 className="section-title">Contact Me</h2>
        <p className="section-sub">Add your email, social links, and a contact form.</p>
      </div>
      <div className="grid-2">
        <div className="card glass">
          <div className="card-title">Links</div>
          <div className="muted">Email • GitHub • LinkedIn • X • Instagram • WhatsApp</div>
        </div>
        <div className="card glass">
          <div className="card-title">Message</div>
          <div className="muted">Add a contact form here with validation.</div>
        </div>
      </div>
    </section>
  )
}
