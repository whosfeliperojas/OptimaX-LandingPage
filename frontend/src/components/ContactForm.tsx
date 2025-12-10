import React, { useState } from 'react';
import { supabase } from '~/lib/supabaseClient';

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  optIn: boolean;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    optIn: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!form.email) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    const { data, error: supaError } = await supabase.from('leads').insert([{
      first_name: form.firstName || null,
      last_name: form.lastName || null,
      email: form.email,
      phone: form.phone || null,
      message: form.message || null,
      opt_in: form.optIn,
    }]);

    setLoading(false);

    if (supaError) {
      setError(supaError.message);
      return;
    }

    setSuccess('Thank you! Your message has been submitted.');
    setForm({ firstName: '', lastName: '', email: '', phone: '', message: '', optIn: false });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First name</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} className="input input-bordered w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last name</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} className="input input-bordered w-full p-2 border rounded" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} className="w-full p-2 border rounded" rows={4} />
        </div>
        <div className="md:col-span-2 flex items-center gap-2">
          <input id="optIn" name="optIn" type="checkbox" checked={form.optIn} onChange={handleChange} />
          <label htmlFor="optIn" className="text-sm">I agree to be contacted regarding my inquiry.</label>
        </div>
      </div>

      <div className="mt-4">
        <button type="submit" className="bg-sky-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Sending...' : 'Send message'}
        </button>
      </div>

      {error && <p className="mt-3 text-red-600">{error}</p>}
      {success && <p className="mt-3 text-green-600">{success}</p>}
    </form>
  );
}
