import { useState } from 'react';

// 1. THE CONTACT FORM ELEMENT (Handles Web3Forms API submission seamlessly)
function ContactForm() {
  const [result, setResult] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending....");
    
    const formData = new FormData(event.currentTarget);

    // This assigns your specific Web3Forms key to handle the email notification 
    formData.append("access_key", "6841fdd8-5e1b-4408-9fe7-e0b8cff58569");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully! Check your inbox.");
        (event.target as HTMLFormElement).reset();
      } else {
        console.error("Error", data);
        setResult(data.message || "Submission failed.");
      }
    } catch (error) {
      console.error("Submit Error", error);
      setResult("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-wrapper" style={{ background: '', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <form onSubmit={onSubmit} className="contact-form">
        {/* Customizes the subject header in your incoming email inbox */}
        <input type="hidden" name="subject" value="New Website Contact Form Submission" />
        
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#ffffff' }}>Name</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            required 
            placeholder="Your Name"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#ffffff' }}>Email Address</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            required 
            placeholder="you@example.com"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#ffffff' }}>Message</label>
          <textarea 
            id="message"
            name="message" 
            required 
            placeholder="Type your message here..."
            rows={5}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', resize: 'vertical', fontSize: '1rem' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            width: '100%', 
            padding: '0.85rem', 
            backgroundColor: isSubmitting ? '#cccccc' : '#0070f3', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            fontWeight: '600',
            fontSize: '1rem',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s ease'
          }}
        >
          {isSubmitting ? "Sending..." : "Submit Form"}
        </button>
      </form>

      {result && (
        <span style={{ 
          display: 'block', 
          marginTop: '1.2rem', 
          textAlign: 'center', 
          fontWeight: '500', 
          color: result.includes('Successfully') ? '#2e7d32' : '#d32f2f' 
        }}>
          {result}
        </span>
      )}
    </div>
  );
}

// 2. THE MAIN WRAPPER SECTION COMPONENT (Exported layout matching your existing design structures)
export default function GuestBookSection() {
  return (
    <section className="container section" id="contact-form" style={{ padding: '4rem 0' }}>
      <div className="section-head" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Get in Touch</h2>
        <p className="section-sub" style={{ color: '#666' }}>Send me a message and I'll respond within 24 hours.</p>
      </div>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1rem' }}>
        <ContactForm />
      </div>
    </section>
  );
}