'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaBug, FaPhoneAlt, FaEnvelope, FaCheckCircle } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ClientHome() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Filter out Chrome extension errors
  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (
        args.some(
          (arg) =>
            typeof arg === 'string' &&
            arg.includes('chrome-extension://')
        )
      ) {
        return;
      }
      originalConsoleError(...args);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const mailtoLink =
      'mailto:info@welshtownandcountry.co.uk?subject=Contact Form Submission from ' +
      encodeURIComponent(name) +
      '&body=Name: ' +
      encodeURIComponent(name) +
      '%0D%0AEmail: ' +
      encodeURIComponent(email) +
      '%0D%0AMessage: ' +
      encodeURIComponent(message);
    window.location.href = mailtoLink;
    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
    document.getElementById('modal')?.classList.add('show');
  };

  const closeModal = () => {
    setModalImage(null);
    document.getElementById('modal')?.classList.remove('show');
  };

  return (
    <div className="bg-[#fefbf6] text-[#4a3b30] min-h-screen">
      {/* Navigation */}
      <nav className="bg-[#2f2a1d] text-[#f5e8c7] p-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-heading tracking-tight">
            Welsh Mole Catcher
          </Link>
          <button
            className="sm:hidden text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            ☰
          </button>
          <ul
            className={`sm:flex sm:space-x-6 font-heading ${isMenuOpen ? 'flex flex-col absolute top-16 left-0 right-0 bg-[#2f2a1d] p-6 shadow-lg' : 'hidden sm:flex'}`}
          >
            {['Home', 'Services', 'Gallery', 'Contact', 'FAQs'].map((item) => (
              <li key={item}>
                <Link
                  href={'#' + item.toLowerCase()}
                  className="text-lg hover:text-[#a8c686] transition-colors duration-300 px-3 py-2 rounded-md"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url("/images/moles_collage.jpg")` }}
      >
        <div className="absolute inset-0 bg-[#2f2a1d]/70"></div>
        <div className="relative text-center px-4">
          <img
            src="/images/logo.png"
            alt="Welsh Mole Catcher Logo"
            width={80}
            height={80}
            className="mx-auto rounded-full border-4 border-[#a8c686] shadow-lg mb-6"
          />
          <h1 className="text-4xl md:text-5xl font-heading text-[#f5e8c7] mb-4 leading-tight">
            Professional Mole & Pest Control
          </h1>
          <p className="text-lg md:text-xl font-heading text-[#f5e8c7] mb-8 max-w-2xl mx-auto">
            Trusted, Eco-Friendly Solutions for South & Mid Wales
          </p>
          <Link
            href="#contact"
            className="bg-[#a8c686] text-[#3e2d20] px-8 py-4 rounded-full font-heading text-lg hover:bg-[#8b9a47] transition-colors duration-300 shadow-md"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-[#fefbf6]">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-heading text-[#4a3b30] text-center mb-8">
            About Us
          </h2>
          <div className="space-y-6 text-lg font-body text-[#4a3b30] leading-relaxed text-center">
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
          <div className="flex justify-center mt-10">
            <img
              src="/images/area.png"
              alt="Service Area in South and Mid Wales"
              width={400}
              height={250}
              className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="py-20 bg-[#f0ead6]">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-heading text-[#4a3b30] text-center mb-12">
            Why Choose Us
          </h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <FaCheckCircle className="text-3xl text-[#a8c686] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-heading text-[#4a3b30] mb-2">Experience & Expertise</h3>
                <p className="text-lg font-body text-[#4a3b30] leading-relaxed">
                  With over 15 years in the industry, our family has honed traditional mole trapping techniques to deliver reliable and effective results. We understand the unique challenges of rural pest control and provide solutions that work.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaCheckCircle className="text-3xl text-[#a8c686] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-heading text-[#4a3b30] mb-2">Eco-Friendly Methods</h3>
                <p className="text-lg font-body text-[#4a3b30] leading-relaxed">
                  Our approach prioritizes the environment. We use humane traps and avoid harmful chemicals, ensuring the safety of your land, livestock, and the Welsh ecosystem.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaCheckCircle className="text-3xl text-[#a8c686] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-heading text-[#4a3b30] mb-2">Personalized Service</h3>
                <p className="text-lg font-body text-[#4a3b30] leading-relaxed">
                  As a family-run business, we take the time to understand your specific needs. We offer tailored pest control plans and provide ongoing support to ensure your property remains pest-free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-[#fefbf6]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-heading text-[#4a3b30] text-center mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#f0ead6] p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <FaBug className="text-3xl text-[#a8c686] mb-4 mx-auto" />
              <h3 className="text-2xl font-heading text-[#4a3b30] mb-4 text-center">Mole Trapping</h3>
              <img
                src="/images/moleintrap.jpg"
                alt="Mole in Trap"
                width={200}
                height={150}
                className="w-full rounded-md mb-4 mx-auto"
              />
              <p className="text-lg font-body text-[#4a3b30] text-center leading-relaxed">
                Our traditional mole trapping service is designed to effectively remove moles from your property. We use time-tested methods to ensure minimal disruption to your land while maintaining the highest standards of safety for livestock and the environment.
              </p>
            </div>
            <div className="bg-[#f0ead6] p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <FaBug className="text-3xl text-[#a8c686] mb-4 mx-auto" />
              <h3 className="text-2xl font-heading text-[#4a3b30] mb-4 text-center">Pest Control</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <img
                  src="/images/rat1.jpg"
                  alt="Rat Control"
                  width={100}
                  height={70}
                  className="w-full rounded-md"
                />
                <img
                  src="/images/waspnest.jpg"
                  alt="Wasp Nest Removal"
                  width={100}
                  height={70}
                  className="w-full rounded-md"
                />
              </div>
              <p className="text-lg font-body text-[#4a3b30] text-center leading-relaxed">
                We provide comprehensive pest control for rural properties, addressing issues with rats, mice, wasps, and other pests. Our methods are safe, efficient, and tailored to the unique needs of the Welsh countryside.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-[#f0ead6]">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-heading text-[#4a3b30] text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="space-y-8">
            <div className="border-l-4 border-[#a8c686] pl-6">
              <p className="text-lg font-body text-[#4a3b30] italic leading-relaxed mb-4">
                Welsh Mole Catcher saved our farm from a severe mole problem. Their traditional methods worked wonders, and the team was incredibly professional and knowledgeable. We\'ve had no issues since!
              </p>
              <p className="text-lg font-heading text-[#4a3b30]">- Sarah T., Farmer in Carmarthenshire</p>
            </div>
            <div className="border-l-4 border-[#a8c686] pl-6">
              <p className="text-lg font-body text-[#4a3b30] italic leading-relaxed mb-4">
                I was impressed by how quickly they handled a wasp nest on our property. The service was eco-friendly, and they took the time to explain everything. Highly recommend their pest control services.
              </p>
              <p className="text-lg font-heading text-[#4a3b30]">- James L., Homeowner in Powys</p>
            </div>
            <div className="border-l-4 border-[#a8c686] pl-6">
              <p className="text-lg font-body text-[#4a3b30] italic leading-relaxed mb-4">
                As a rural estate manager, I needed a reliable pest control solution. Welsh Mole Catcher exceeded my expectations with their personalized approach and effective results.
              </p>
              <p className="text-lg font-heading text-[#4a3b30]">- Emma R., Estate Manager in Ceredigion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 bg-[#fefbf6]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-heading text-[#4a3b30] text-center mb-12">
            Our Work
          </h2>
          <div className="columns-2 md:columns-3 gap-6">
            {[
              { src: '/images/moles_collage.jpg', alt: 'Moles caught on Welsh farms' },
              { src: '/images/farm_moles.jpg', alt: 'Dead moles on a Welsh farm' },
              { src: '/images/farm_son.jpg', alt: 'Father and son team mole trapping' },
              { src: '/images/farm_john_mole.jpg', alt: 'Mole catching expert in field' },
              { src: '/images/moleintrap.jpg', alt: 'Mole in trap' },
            ].map((img, index) => (
              <div key={index} className="mb-6 break-inside-avoid">
                <img
                  src={img.src}
                  alt={img.alt}
                  width={200}
                  height={150}
                  className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => openModal(img.src)}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Modal */}
        <div id="modal" className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 hidden">
          {modalImage && (
            <div className="relative max-w-2xl w-full">
              <img
                src={modalImage}
                alt="Gallery Image"
                className="w-full rounded-lg shadow-2xl"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-[#a8c686] transition-colors duration-300"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-[#f0ead6]">
        <div className="container mx-auto px-4 max-w-lg">
          <h2 className="text-4xl font-heading text-[#4a3b30] text-center mb-12">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-heading text-[#4a3b30] mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-[#a8c686] focus:outline-none focus:ring-2 focus:ring-[#a8c686] focus:border-transparent transition-all duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-heading text-[#4a3b30] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-[#a8c686] focus:outline-none focus:ring-2 focus:ring-[#a8c686] focus:border-transparent transition-all duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-heading text-[#4a3b30] mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-[#a8c686] focus:outline-none focus:ring-2 focus:ring-[#a8c686] focus:border-transparent transition-all duration-300 h-32 resize-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#a8c686] text-[#3e2d20] p-4 rounded-md font-heading text-lg hover:bg-[#8b9a47] transition-colors duration-300 shadow-md"
            >
              Send Message
            </button>
            {submitStatus === 'success' && (
              <p className="text-center text-[#4a3b30] font-heading text-lg mt-4">
                Message sent! We\'ll get back to you soon.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-20 bg-[#fefbf6]">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-heading text-[#4a3b30] text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div className="border-b border-[#a8c686]/30 pb-4">
              <h3 className="text-xl font-heading text-[#4a3b30] mb-2">How do you catch moles?</h3>
              <p className="text-lg font-body text-[#4a3b30] leading-relaxed">
                We use traditional, humane traps to capture moles, ensuring minimal disruption to your property while maintaining effectiveness. Our methods are time-tested and designed to address mole infestations efficiently.
              </p>
            </div>
            <div className="border-b border-[#a8c686]/30 pb-4">
              <h3 className="text-xl font-heading text-[#4a3b30] mb-2">What areas do you cover?</h3>
              <p className="text-lg font-body text-[#4a3b30] leading-relaxed">
                We provide our services across South and Mid Wales, catering to rural farms, countryside homes, and estates. If you’re unsure whether we cover your area, feel free to contact us for confirmation.
              </p>
            </div>
            <div className="border-b border-[#a8c686]/30 pb-4">
              <h3 className="text-xl font-heading text-[#4a3b30] mb-2">Are your methods safe for livestock?</h3>
              <p className="text-lg font-body text-[#4a3b30] leading-relaxed">
                Absolutely. Our methods are designed to be safe for livestock, pets, and the environment. We use eco-friendly techniques and avoid harmful chemicals to ensure the safety of your animals and land.
              </p>
            </div>
            <div className="border-b border-[#a8c686]/30 pb-4">
              <h3 className="text-xl font-heading text-[#4a3b30] mb-2">How long does a typical pest control job take?</h3>
              <p className="text-lg font-body text-[#4a3b30] leading-relaxed">
                The duration depends on the severity of the infestation and the size of the property. Most mole trapping jobs are completed within a few days, while pest control for other animals may require multiple visits. We provide a detailed timeline during our initial consultation.
              </p>
            </div>
            <div className="border-b border-[#a8c686]/30 pb-4">
              <h3 className="text-xl font-heading text-[#4a3b30] mb-2">Do you offer ongoing pest control services?</h3>
              <p className="text-lg font-body text-[#4a3b30] leading-relaxed">
                Yes, we offer maintenance plans to ensure your property remains pest-free. These plans include regular inspections and preventative measures tailored to your needs, providing peace of mind throughout the year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2f2a1d] text-[#f5e8c7] py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-heading mb-4">Welsh Mole Catcher</h3>
              <p className="text-lg font-body leading-relaxed">
                Professional pest control services for South & Mid Wales. Eco-friendly, reliable, and family-run.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-heading mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'Services', 'Gallery', 'Contact', 'FAQs'].map((item) => (
                  <li key={item}>
                    <Link
                      href={'#' + item.toLowerCase()}
                      className="text-lg font-body hover:text-[#a8c686] transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-heading mb-4">Contact Info</h3>
              <p className="text-lg font-body flex items-center mb-2">
                <FaPhoneAlt className="mr-2" />{' '}
                <a href="tel:07375303124" className="hover:text-[#a8c686] transition-colors duration-300">
                  07375 303124
                </a>
              </p>
              <p className="text-lg font-body flex items-center mb-4">
                <FaEnvelope className="mr-2" />{' '}
                <a href="mailto:info@welshtownandcountry.co.uk" className="hover:text-[#a8c686] transition-colors duration-300">
                  info@welshtownandcountry.co.uk
                </a>
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/profile.php?id=61564861332160" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/icons/facebook_logo.png"
                    alt="Facebook"
                    width={24}
                    height={24}
                    className="hover:opacity-80 transition-opacity duration-300"
                  />
                </a>
                <a href="https://www.instagram.com/welshtownandcountry.co.uk" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/icons/Instagram_icon.png"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="hover:opacity-80 transition-opacity duration-300"
                  />
                </a>
                <a href="https://www.linkedin.com/in/welsh-town-and-country-pest-services" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/icons/linked-in.jpg"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="hover:opacity-80 transition-opacity duration-300"
                  />
                </a>
                <a href="https://www.youtube.com/channel/UC1ty_8r3JnreT1uFf5P2hmA" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/icons/tube-icon.jpg"
                    alt="YouTube"
                    width={24}
                    height={24}
                    className="hover:opacity-80 transition-opacity duration-300"
                  />
                </a>
              </div>
            </div>
          </div>
          <p className="text-center text-sm font-body mt-8">
            © {new Date().getFullYear()} Welsh Mole Catcher. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}