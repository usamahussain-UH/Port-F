import GuestBook from './GuestBook'

export default function GuestBookSection() {
  return (
    <section className="container section" id="guestbook">
      <div className="section-head">
        <h2 className="section-title">Guest Book</h2>
        <p className="section-sub">Visitors can leave remarks and feedback.</p>
      </div>
      <GuestBook />
    </section>
  )
}
