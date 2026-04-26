import React from 'react';

function AboutPage() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('/assets/images/about us background.jpg')" }}>
      <div className="absolute inset-0 bg-black/85"></div>
      <div className="relative py-8 sm:py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-semibold text-white lg:text-4xl">About Us</h1>
            <p className="mt-4 text-sm leading-7 text-white/85 max-w-3xl mx-auto">
              Forex Trading Hunters is your trusted source for comprehensive forex trading guidance, broker reviews, and expert insights to help you navigate the financial markets.
            </p>
          </div>

          <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-6 lg:p-8 backdrop-blur">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Our Mission</h2>
              <p className="text-sm leading-7 text-white/85">
                We are dedicated to providing traders with accurate, unbiased information about forex brokers and trading strategies. Our team of experienced traders curates content to help you make informed decisions in your trading journey.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-6 lg:p-8 backdrop-blur">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Our Values</h2>
              <ul className="space-y-3 text-sm leading-7 text-white/85">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">•</span>
                  Transparency in all our reviews and recommendations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">•</span>
                  Commitment to trader education and community support
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">•</span>
                  Focus on quality over quantity in our content
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">•</span>
                  Real trading experience backing our advice
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 sm:mt-12">
            <div className="rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-900/20 to-blue-900/20 p-4 sm:p-6 lg:p-8 backdrop-blur shadow-2xl shadow-emerald-500/10">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 text-center">Our Location</h2>
              <div className="rounded-xl overflow-hidden border-2 border-emerald-400/50 shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.1823707265!2d-0.24168149708886973!3d51.52877021967662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99%2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1714147200000!5m2!1sen!2sus"
                  width="100%"
                  height="300 sm:height-400 lg:height-450"
                  style={{ border: 0, filter: 'grayscale(20%) contrast(110%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map of England"
                />
              </div>
              <div className="mt-4 sm:mt-6 flex flex-col items-center gap-3">
                <p className="text-center text-sm text-white/70">
                  Based in London, England • Serving traders worldwide
                </p>
                <div className="flex items-center gap-2 text-emerald-400">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium">London, United Kingdom</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-6 text-center backdrop-blur">
              <div className="text-2xl sm:text-3xl font-semibold text-emerald-400">500+</div>
              <div className="mt-2 text-sm text-white/85">Brokers Reviewed</div>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-6 text-center backdrop-blur">
              <div className="text-2xl sm:text-3xl font-semibold text-emerald-400">10K+</div>
              <div className="mt-2 text-sm text-white/85">Traders Helped</div>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-6 text-center backdrop-blur">
              <div className="text-2xl sm:text-3xl font-semibold text-emerald-400">5+</div>
              <div className="mt-2 text-sm text-white/85">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
