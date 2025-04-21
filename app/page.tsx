'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaBug, FaPhoneAlt, FaEnvelope, FaCheckCircle, FaTimes } from 'react-icons/fa';
import './styles.css';

// Form data interface
interface FormData {
  name: string;
  email: string;
  message: string;
  serviceType: string;
  preferredDate: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    serviceType: '',
    preferredDate: '',
  });
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  // Suppress chrome-extension console errors
  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (args.some((arg) => typeof arg === 'string' && arg.includes('chrome-extension://'))) {
        return;
      }
      originalConsoleError(...args);
    };
  }, []);

  // Form input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, message, serviceType, preferredDate } = formData;
    const mailtoLink =
      'mailto:info@welshtownandcountry.co.uk?subject=Service Booking Request from ' +
      encodeURIComponent(name) +
      '&body=Name: ' +
      encodeURIComponent(name) +
      '%0D%0AEmail: ' +
      encodeURIComponent(email) +
      '%0D%0AService Type: ' +
      encodeURIComponent(serviceType) +
      '%0D%0APreferred Date: ' +
      encodeURIComponent(preferredDate) +
      '%0D%0AMessage: ' +
      encodeURIComponent(message);
    window.location.href = mailtoLink;
    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '', serviceType: '', preferredDate: '' });
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  // Gallery modal handlers
  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
    document.getElementById('modal')?.classList.remove('hidden');
  };

  const closeModal = () => {
    setModalImage(null);
    document.getElementById('modal')?.classList.add('hidden');
  };

  // Chat handlers
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      setChatMessages([...chatMessages, `You: ${chatMessage}`]);
      setTimeout(() => {
        setChatMessages((prev) => [...prev, 'Welsh Mole Catcher: Thanks for your message! We’ll get back to you soon.']);
      }, 1000);
      setChatMessage('');
    }
  };

  return (
    <div className="main-container">
      {/* Navigation */}
      <nav className="nav-container">
        <div className="nav-content">
          <Link href="/" className="nav-logo">
            <Image
              src="/images/logo.png"
              alt="Welsh Mole Catcher Logo"
              width={40}
              height={40}
              className="inline-block mr-2"
              priority
            />
            Welsh Mole Catcher
          </Link>
          <button
            className="nav-menu-button sm:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            ☰
          </button>
          <ul className={`nav-menu ${isMenuOpen ? 'open' : 'hidden'} sm:flex font-heading`}>
            {['home', 'services', 'gallery', 'contact', 'faqs'].map((item) => (
              <li key={item} className="nav-item">
                <Link href={`/#${item}`} className="nav-link">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <Image
            src="/images/logo.png"
            alt="Welsh Mole Catcher Logo"
            width={80}
            height={80}
            className="hero-logo"
            priority
          />
          <h1 className="hero-title">Professional Mole & Pest Control</h1>
          <p className="hero-subtitle">Trusted, Eco-Friendly Solutions for South & Mid Wales</p>
          <Link href="/#contact" className="hero-button">
            Book a Service
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-container about-content">
          <h2 className="section-title">About Us</h2>
          <div className="about-text">
            <p>
              Welsh Mole Catcher is a family-run business with deep roots in the Welsh countryside. For over 15 years, we’ve been providing professional pest control services to farms, estates, and homes across South and Mid Wales. Our expertise lies in traditional mole trapping, a method passed down through generations, ensuring effective results with minimal environmental impact.
            </p>
            <p>
              We pride ourselves on our commitment to sustainability and safety. Our techniques are designed to protect your land, livestock, and the surrounding ecosystem. Whether you’re dealing with a mole infestation on your farm or need pest control for your rural property, we offer tailored solutions backed by years of experience and a passion for preserving the beauty of Wales.
            </p>
            <p>
              Our team is dedicated to building lasting relationships with our clients. We understand the unique challenges of rural life and work closely with you to address your needs. From initial consultation to follow-up, we ensure every job is completed with professionalism and care.
            </p>
          </div>
          <div className="about-image-container">
            <Image
              src="/images/area.png"
              alt="Service Area in South and Mid Wales"
              width={400}
              height={250}
              className="about-image"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="why-choose-us-section">
        <div className="section-container why-choose-us-content">
          <h2 className="section-title">Why Choose Us</h2>
          <div>
            <div className="why-choose-us-item">
              <FaCheckCircle className="why-choose-us-icon" />
              <div>
                <h3 className="why-choose-us-title">Experience & Expertise</h3>
                <p className="why-choose-us-text">
                  With over 15 years in the industry, our family has honed traditional mole trapping techniques to deliver reliable and effective results. We understand the unique challenges of rural pest control and provide solutions that work.
                </p>
              </div>
            </div>
            <div className="why-choose-us-item">
              <FaCheckCircle className="why-choose-us-icon" />
              <div>
                <h3 className="why-choose-us-title">Eco-Friendly Methods</h3>
                <p className="why-choose-us-text">
                  Our approach prioritizes the environment. We use humane traps and avoid harmful chemicals, ensuring the safety of your land, livestock, and the Welsh ecosystem.
                </p>
              </div>
            </div>
            <div className="why-choose-us-item">
              <FaCheckCircle className="why-choose-us-icon" />
              <div>
                <h3 className="why-choose-us-title">Personalized Service</h3>
                <p className="why-choose-us-text">
                  As a family-run business, we take the time to understand your specific needs. We offer tailored pest control plans and provide ongoing support to ensure your property remains pest-free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="section-container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <FaBug className="service-icon" />
              <h3 className="service-title">Mole Trapping</h3>
              <Image
                src="/images/moleintrap.jpg"
                alt="Mole in Trap"
                width={200}
                height={150}
                className="service-image"
                loading="lazy"
              />
              <p className="service-text">
                Our traditional mole trapping service is designed to effectively remove moles from your property. We use time-tested methods to ensure minimal disruption to your land while maintaining the highest standards of safety for livestock and the environment.
              </p>
            </div>
            <div className="service-card">
              <FaBug className="service-icon" />
              <h3 className="service-title">Pest Control</h3>
              <div className="service-image-grid">
                <Image
                  src="/images/rat1.jpg"
                  alt="Rat Control"
                  width={100}
                  height={70}
                  className="service-image"
                  loading="lazy"
                />
                <Image
                  src="/images/waspnest.jpg"
                  alt="Wasp Nest Removal"
                  width={100}
                  height={70}
                  className="service-image"
                  loading="lazy"
                />
              </div>
              <p className="service-text">
                We provide comprehensive pest control for rural properties, addressing issues with rats, mice, wasps, and other pests. Our methods are safe, efficient, and tailored to the unique needs of the Welsh countryside.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">What Our Clients Say</h2>
          <div>
            <div className="testimonial-item">
              <p className="testimonial-text">
                Welsh Mole Catcher saved our farm from a severe mole problem. Their traditional methods worked wonders, and the team was incredibly professional and knowledgeable. We’ve had no issues since!
              </p>
              <p className="testimonial-author">- Sarah T., Farmer in Carmarthenshire</p>
            </div>
            <div className="testimonial-item">
              <p className="testimonial-text">
                I was impressed by how quickly they handled a wasp nest on our property. The service was eco-friendly, and they took the time to explain everything. Highly recommend their pest control services.
              </p>
              <p className="testimonial-author">- James L., Homeowner in Powys</p>
            </div>
            <div className="testimonial-item">
              <p className="testimonial-text">
                As a rural estate manager, I needed a reliable pest control solution. Welsh Mole Catcher exceeded my expectations with their personalized approach and effective results.
              </p>
              <p className="testimonial-author">- Emma R., Estate Manager in Ceredigion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section">
        <div className="section-container">
          <h2 className="section-title">Our Work</h2>
          <div className="gallery-grid">
            {[
              { src: '/images/moles_collage.jpg', alt: 'Moles caught on Welsh farms' },
              { src: '/images/farm_moles.jpg', alt: 'Dead moles on a Welsh farm' },
              { src: '/images/farm_son.jpg', alt: 'Father and son team mole trapping' },
              { src: '/images/farm_john_mole.jpg', alt: 'Mole catching expert in field' },
              { src: '/images/moleintrap.jpg', alt: 'Mole in trap' },
            ].map((image, index) => (
              <div key={index} className="gallery-item">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={200}
                  height={150}
                  className="gallery-image"
                  onClick={() => openModal(image.src)}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
        <div id="modal" className="modal hidden">
          {modalImage && (
            <Image
              src={modalImage}
              alt="Gallery Image"
              layout="fill"
              objectFit="contain"
              onClick={closeModal}
            />
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="section-container contact-form-container">
          <h2 className="section-title">Contact Us</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-input"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="serviceType" className="form-label">
                Service Type
              </label>
              <select
                id="serviceType"
                name="serviceType"
                className="form-input"
                required
                value={formData.serviceType}
                onChange={handleChange}
              >
                <option value="">Select a service</option>
                <option value="Mole Trapping">Mole Trapping</option>
                <option value="Pest Control">Pest Control</option>
              </select>
            </div>
            <div>
              <label htmlFor="preferredDate" className="form-label">
                Preferred Date
              </label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                className="form-input"
                required
                value={formData.preferredDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                required
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="form-button">
              Book Now
            </button>
            {submitStatus === 'success' && (
              <p className="text-[#a8c686] text-center">Booking request sent successfully!</p>
            )}
          </form>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="faqs-section">
        <div className="section-container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div>
            <div className="faq-item">
              <h3 className="faq-question">How do you catch moles?</h3>
              <p className="faq-answer">
                We use traditional, humane traps to capture moles, ensuring minimal disruption to your property while maintaining effectiveness. Our methods are time-tested and designed to address mole infestations efficiently.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">What areas do you cover?</h3>
              <p className="faq-answer">
                We provide our services across South and Mid Wales, catering to rural farms, countryside homes, and estates. If you’re unsure whether we cover your area, feel free to contact us for confirmation.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Are your methods safe for livestock?</h3>
              <p className="faq-answer">
                Absolutely. Our methods are designed to be safe for livestock, pets, and the environment. We use eco-friendly techniques and avoid harmful chemicals to ensure the safety of your animals and land.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">How long does a typical pest control job take?</h3>
              <p className="faq-answer">
                The duration depends on the severity of the infestation and the size of the property. Most mole trapping jobs are completed within a few days, while pest control for other animals may require multiple visits. We provide a detailed timeline during our initial consultation.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Do you offer ongoing pest control services?</h3>
              <p className="faq-answer">
                Yes, we offer maintenance plans to ensure your property remains pest-free. These plans include regular inspections and preventative measures tailored to your needs, providing peace of mind throughout the year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Chat */}
      <div className="chat-container">
        <button
          className="chat-button"
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label="Open live chat"
        >
          💬 Chat with Us
        </button>
        {isChatOpen && (
          <div className="chat-window">
            <div className="chat-header">
              <h3>Live Chat</h3>
              <button onClick={() => setIsChatOpen(false)} aria-label="Close chat">
                <FaTimes />
              </button>
            </div>
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <p key={index}>{msg}</p>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="chat-form">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your message..."
                className="chat-input"
              />
              <button type="submit" className="chat-submit">
                Send
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Welsh Mole Catcher</h3>
            <p className="footer-text">
              Professional pest control services for South & Mid Wales. Eco-friendly, reliable, and family-run.
            </p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              {['home', 'services', 'gallery', 'contact', 'faqs'].map((item) => (
                <li key={item}>
                  <Link href={`/#${item}`} className="footer-link">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Contact Info</h3>
            <p className="footer-contact">
              <FaPhoneAlt className="mr-2" />
              <a href="tel:07375303124" className="footer-link">
                07375 303124
              </a>
            </p>
            <p className="footer-contact">
              <FaEnvelope className="mr-2" />
              <a href="mailto:info@welshtownandcountry.co.uk" className="footer-link">
                info@welshtownandcountry.co.uk
              </a>
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/profile.php?id=61564861332160" target="_blank" rel="noopener noreferrer">
                <Image src="/icons/facebook_logo.png" alt="Facebook" width={24} height={24} loading="lazy" />
              </a>
              <a href="https://www.instagram.com/welshtownandcountry" target="_blank" rel="noopener noreferrer">
                <Image src="/icons/Instagram_icon.png" alt="Instagram" width={24} height={24} loading="lazy" />
              </a>
              <a href="https://www.linkedin.com/in/welsh-town-and-country-pest-services" target="_blank" rel="noopener noreferrer">
                <Image src="/icons/linked-in.jpg" alt="LinkedIn" width={24} height={24} loading="lazy" />
              </a>
              <a href="https://www.youtube.com/channel/UC1ty_8r3JnreT1uFf5P2hmA" target="_blank" rel="noopener noreferrer">
                <Image src="/icons/tube-icon.jpg" alt="YouTube" width={24} height={24} loading="lazy" />
              </a>
            </div>
          </div>
        </div>
        <p className="footer-copyright">© 2025 Welsh Mole Catcher. All rights reserved.</p>
      </footer>
    </div>
  );
}