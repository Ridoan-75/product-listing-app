'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white border border-slate-100 rounded-2xl shadow-lg p-10 w-full max-w-5xl">
        <h2 className="text-4xl font-bold text-slate-900 text-center mb-10">
          Get in Touch with <span className="text-purple-600">Marketify</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info Section */}
          <div className="text-slate-900 space-y-6">
            <div>
              <h3 className="text-2xl font-semibold">Contact Info</h3>
              <p className="text-slate-600">
                Have a question or need support? We're here to help you with
                your shopping journey.
              </p>
            </div>
            <div className="space-y-3">
              <p className="hover:text-purple-600 transition-colors">
                <strong>📍 Address:</strong> New York, USA
              </p>
              <p className="hover:text-purple-600 transition-colors">
                <strong>📧 Email:</strong> support@marketify.com
              </p>
              <p className="hover:text-purple-600 transition-colors">
                <strong>📞 Phone:</strong> +1 (800) 123-4567
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-slate-900 mb-1 font-medium">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Write your name..."
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
              />
            </div>
            <div>
              <label className="block text-slate-900 mb-1 font-medium">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Write your email..."
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
              />
            </div>
            <div>
              <label className="block text-slate-900 mb-1 font-medium">
                Your Message
              </label>
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Type your message..."
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-2 rounded-xl cursor-pointer hover:bg-purple-700 transition-all duration-300"
            >
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
