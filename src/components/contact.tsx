import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing.');
      }
      await emailjs.send(serviceId, templateId, {
        from_name: formData.name, from_email: formData.email,
        message: formData.message, to_email: 'cristtiiank@gmail.com',
      }, publicKey);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const directLinks = [
    {
      href: 'https://www.linkedin.com/in/cristian-castro-pineda/', label: 'LinkedIn',
      color: 'hover:border-[#0A66C2] hover:text-[#0A66C2] hover:shadow-[0_0_20px_rgba(10,102,194,0.15)]',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      href: 'https://github.com/Cristian-DW', label: 'GitHub',
      color: 'hover:border-line/40 hover:text-primary',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      ),
    },
    {
      href: 'mailto:cristtiiank@gmail.com', label: 'Email',
      color: 'hover:border-brand hover:text-brand hover:shadow-[0_0_20px_rgba(0,112,243,0.15)]',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
  ];

  const inputClass = `
    w-full px-4 py-3 rounded-xl border border-line/12 bg-surface-mid
    text-primary text-sm placeholder:text-muted/30
    focus:ring-1 focus:ring-brand focus:border-brand focus:outline-none
    transition-all
  `;

  return (
    <section id="contact" className="py-24 md:py-36 bg-surface-mid relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-cyan/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <span className="section-eyebrow">{t('contact.eyebrow')}</span>
          <h2 className="text-4xl md:text-6xl font-bold font-space text-primary mt-3 mb-5 tracking-tight">
            {t('contact.headline')}
            <span className="text-brand"> {t('contact.headline_accent')}</span>
          </h2>
          <p className="text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('contact.description_v2')}
          </p>
        </div>

        {/* Direct links */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: '100ms' }}>
          {directLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className={`flex items-center gap-2.5 px-6 py-3 rounded-full border border-line/10 text-muted text-sm font-medium transition-all duration-300 ${link.color}`}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="relative h-px max-w-lg mx-auto mb-16 animate-fade-up" style={{ animationDelay: '150ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-line/15 to-transparent" />
          <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-surface-mid text-muted/40 text-xs uppercase tracking-widest">
            {t('contact.or_message')}
          </span>
        </div>

        {/* Form card */}
        <div
          className="max-w-xl mx-auto rounded-2xl border border-line/10 bg-surface-card shadow-xl p-8 md:p-10 animate-fade-up"
          style={{ animationDelay: '200ms' }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold text-muted/60">
                  {t('contact.form.name.label')}
                </label>
                <input
                  className={inputClass}
                  type="text" id="name" name="name" placeholder="Cristian"
                  value={formData.name} onChange={handleChange} required disabled={isSubmitting}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-muted/60">
                  {t('contact.form.email.label')}
                </label>
                <input
                  className={inputClass}
                  type="email" id="email" name="email" placeholder="you@company.com"
                  value={formData.email} onChange={handleChange} required disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-muted/60">
                {t('contact.form.message.label')}
              </label>
              <textarea
                className={`${inputClass} min-h-[140px] resize-none`}
                id="message" name="message"
                placeholder="Tell me about your project, integration challenge, or idea..."
                value={formData.message} onChange={handleChange} required disabled={isSubmitting}
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 text-xs font-bold uppercase tracking-wider text-center animate-fade-in">
                ✓ {t('contact.success') || "Message sent! I'll reply soon."}
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 text-xs font-bold uppercase tracking-wider text-center animate-fade-in">
                ✗ {t('contact.error') || 'Something went wrong. Try again.'}
              </div>
            )}

            <button
              id="contact-submit"
              className="group relative h-12 w-full mt-2 rounded-xl overflow-hidden flex items-center justify-center bg-brand hover:bg-brand-light transition-all duration-300 font-bold text-white text-sm tracking-wide active:scale-[0.98] shadow-[0_0_30px_rgba(0,112,243,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSubmitting}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    {t('contact.form.submit')}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
