// eslint-disable-next-line no-unused-vars
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

/**
 * ContactForm component.
 * This component displays a contact form allowing users to input their name, email, and a message.
 * The form data is sent via EmailJS to cristtiiank@gmail.com
 */
const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  /**
   * Handles input changes and updates the formData state.
   *
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The change event object.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission and sends email via EmailJS.
   *
   * @param {FormEvent<HTMLFormElement>} e - The form event object.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Get environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Validate environment variables
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check your .env file.');
      }

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'cristtiiank@gmail.com',
        },
        publicKey
      );

      // Success - clear form and show success message
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');

      // Auto-hide error message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact"
      className="min-h-[60vh] flex items-center justify-center py-12 md:py-16 px-8 md:px-20 2xl:px-40"
    >
      <div className="2xl:grid grid-cols-7 w-full max-w-screen-2xl">
        <div className="mb-10 2xl:col-span-3 2xl:col-start-2 flex flex-col justify-center items-center 2xl:items-start 2xl:pr-20">
          <h3 className="text-fondo2 text-[10px] md:text-xs uppercase tracking-[0.4em] font-black mb-3">{t('contact.title')}</h3>
          <h4 className="mb-3">
            <span className="text-lg md:text-2xl 2xl:text-3xl font-black text-white uppercase tracking-tighter leading-none">
              {t('contact.subtitle')}
            </span>
          </h4>
          <p className="text-gray-400 text-xs md:text-sm 2xl:text-base font-medium text-center 2xl:text-left leading-relaxed max-w-md">
            {t('contact.description')}
          </p>
        </div>

        <div className="2xl:col-span-2 2xl:col-start-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 text-[10px] md:text-xs uppercase tracking-widest font-black text-white/40">{t('contact.form.name.label')}</label>
              <input
                className="w-full px-3 py-2.5 rounded-2xl border border-white/10 bg-white/5 text-white text-sm focus:ring-fondo2 focus:border-fondo2 focus:outline-none focus:ring-1 transition-all"
                type="text"
                id="name"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-[10px] md:text-xs uppercase tracking-widest font-black text-white/40">{t('contact.form.email.label')}</label>
              <input
                className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-white text-sm focus:ring-fondo2 focus:border-fondo2 focus:outline-none focus:ring-1 transition-all"
                type="email"
                id="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="mb-2 text-[10px] md:text-xs uppercase tracking-widest font-black text-white/40">{t('contact.form.message.label')}</label>
              <textarea
                className="w-full min-h-[100px] px-3 py-2.5 rounded-2xl border border-white/10 bg-white/5 text-white text-sm focus:ring-fondo2 focus:border-fondo2 focus:outline-none focus:ring-1 transition-all resize-none"
                id="message"
                name="message"
                placeholder="¿Cómo puedo ayudarte?"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-[10px] md:text-xs font-bold uppercase tracking-wider text-center animate-fade-in">
                ✓ {t('contact.form.success') || 'Message sent! I\'ll reply soon.'}
              </div>
            )}

            <button
              className="group relative h-11 w-full mt-5 rounded-full overflow-hidden flex items-center justify-center bg-white text-black hover:bg-white/90 transition-all font-black uppercase text-[10px] md:text-xs tracking-[0.2em] active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-50"
              type="submit"
              disabled={isSubmitting}
            >
              <span className="relative z-10">
                {isSubmitting ? '...' : t('contact.form.submit')}
              </span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
