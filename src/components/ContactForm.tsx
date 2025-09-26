import React, { useState } from 'react';

interface ContactFormProps {
  locale: string;
}

export function ContactForm({ locale }: ContactFormProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  // Get translations based on locale
  const t = (key: string) => {
    const translations = locale === 'zh' ? {
      'contactPage.form.name': '姓名',
      'contactPage.form.email': '电子邮件',
      'contactPage.form.subject': '主题',
      'contactPage.form.selectSubject': '请选择一个主题',
      'contactPage.form.generalInquiry': '一般咨询',
      'contactPage.form.technicalSupport': '技术支持',
      'contactPage.form.billing': '账单和订阅',
      'contactPage.form.feedback': '产品反馈',
      'contactPage.form.partnership': '合作机会',
      'contactPage.form.message': '消息',
      'contactPage.form.sending': '发送中...',
      'contactPage.form.send': '发送消息',
      'contactPage.form.success': '您的消息已成功发送。我们将尽快回复您。',
      'contactPage.form.error': '发送消息时出错。请稍后再试。'
    } : {
      'contactPage.form.name': 'Name',
      'contactPage.form.email': 'Email',
      'contactPage.form.subject': 'Subject',
      'contactPage.form.selectSubject': 'Please select a subject',
      'contactPage.form.generalInquiry': 'General Inquiry',
      'contactPage.form.technicalSupport': 'Technical Support',
      'contactPage.form.billing': 'Billing & Subscription',
      'contactPage.form.feedback': 'Product Feedback',
      'contactPage.form.partnership': 'Partnership Opportunities',
      'contactPage.form.message': 'Message',
      'contactPage.form.sending': 'Sending...',
      'contactPage.form.send': 'Send Message',
      'contactPage.form.success': 'Your message has been sent successfully. We will get back to you soon.',
      'contactPage.form.error': 'There was an error sending your message. Please try again later.'
    };
    return translations[key as keyof typeof translations] || key;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call - replace with actual contact form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, just simulate success
      // In a real implementation, you would send the form data to your backend
      console.log('Contact form submitted:', formState);
      
      // Clear the form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitStatus === 'success' && (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-md mb-4">
          <p>{t('contactPage.form.success')}</p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-md mb-4">
          <p>{t('contactPage.form.error')}</p>
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          {t('contactPage.form.name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
          className="block w-full rounded-md border border-border bg-background px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          {t('contactPage.form.email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
          className="block w-full rounded-md border border-border bg-background px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1">
          {t('contactPage.form.subject')}
        </label>
        <select
          id="subject"
          name="subject"
          value={formState.subject}
          onChange={handleChange}
          required
          className="block w-full rounded-md border border-border bg-background px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">{t('contactPage.form.selectSubject')}</option>
          <option value="general">{t('contactPage.form.generalInquiry')}</option>
          <option value="support">{t('contactPage.form.technicalSupport')}</option>
          <option value="billing">{t('contactPage.form.billing')}</option>
          <option value="feedback">{t('contactPage.form.feedback')}</option>
          <option value="partnership">{t('contactPage.form.partnership')}</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          {t('contactPage.form.message')}
        </label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          required
          rows={5}
          className="block w-full rounded-md border border-border bg-background px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        ></textarea>
      </div>
      
      <div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
          disabled={isSubmitting}
        >
          {isSubmitting 
            ? t('contactPage.form.sending')
            : t('contactPage.form.send')}
        </button>
      </div>
    </form>
  );
}
