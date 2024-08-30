'use client';

import emailjs from 'emailjs-com';
import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const ContactPage = () => {
  const text = {
    title: 'Contactez-nous',
    // subtitle: "N'hésitez pas à nous contacter.",
    name: 'Nom',
    surname: 'Prénom',
    email: 'Email',
    phone: 'Téléphone',

    message: 'Votre message',
    send: 'Envoyer',
    phoneLabel: 'Téléphone',
    emailLabel: 'Email',
    addressLabel: 'Adresse',
    successMessage: 'Message envoyé avec succès!',
    errorMessage: "Échec de l'envoi du message.",
  };

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const serviceID = 'service_588fumj';
    const templateID = 'template_tk1wgv7';
    const userID = 'od4fSJW9rW3eOjwy6';

    emailjs.sendForm(serviceID, templateID, '#contact-form', userID).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message envoyé avec succès!');
      },
      (err) => {
        console.log('FAILED...', err);
        alert("Échec de l'envoi du message.");
      }
    );
  };

  return (
    <main className="flex flex-col items-center justify-between p-4 md:p-8 text-text-light h-screen">
      <div className="z-10 w-full max-w-5xl font-body text-sm flex flex-col lg:flex-row gap-8 space-x-8">
        <div className="lg:w-3/5 space-y-6 bg-primary p-6 rounded-lg shadow-military">
          <h1 className="text-3xl font-heading mb-4 text-accent-orange">
            {text.title}
          </h1>
          {/* <p className="mb-6 text-primary-sand">{text.subtitle}</p> */}

          <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                name="name"
                placeholder={text.name}
                onChange={handleChange}
                className="w-full p-2 border border-primary-sand rounded bg-primary-olive text-primary-sand placeholder-primary-sand"
                required
              />
              <input
                type="text"
                name="surname"
                placeholder={text.surname}
                onChange={handleChange}
                className="w-full p-2 border border-primary-sand rounded bg-primary-olive text-primary-sand placeholder-primary-sand"
                required
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="email"
                name="email"
                placeholder={text.email}
                onChange={handleChange}
                className="w-full p-2 border border-primary-sand rounded bg-primary-olive text-primary-sand placeholder-primary-sand"
                required
              />
              <input
                type="phone"
                name="phone"
                placeholder={text.phone}
                onChange={handleChange}
                className="w-full p-2 border border-primary-sand rounded bg-primary-olive text-primary-sand placeholder-primary-sand"
                required
              />
            </div>

            <textarea
              name="message"
              placeholder={text.message}
              onChange={handleChange}
              className="w-full p-2 border border-primary-sand rounded bg-primary-olive text-primary-sand placeholder-primary-sand h-32"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-accent-orange text-text-light px-4 py-2 hover:bg-accent-red rounded-full"
            >
              {text.send}
            </button>
          </form>
        </div>

        <div className="lg:w-2/5 space-y-4">
          <div className="flex items-center space-x-4 bg-primary p-4 rounded-lg">
            <FaPhone className="text-3xl text-accent-orange rotate-90" />
            <div>
              <h2 className="font-semibold text-primary-sand">
                {text.phoneLabel}
              </h2>
              <p className="text-lg font-bold text-text-light">
                04 75 57 20 10{' '}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-primary p-4 rounded-lg">
            <FaEnvelope className="text-3xl text-accent-orange" />
            <div>
              <h2 className="font-semibold text-primary-sand">
                {text.emailLabel}
              </h2>
              <p className="text-lg font-bold text-text-light">
                le-surplus.contact@gmail.com
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-primary p-4 rounded-lg">
            <FaMapMarkerAlt
              className="text-3xl text-accent-orange m-1"
              size={35}
            />
            <div>
              <h2 className="font-semibold text-primary-sand">
                {text.addressLabel}
              </h2>
              <p className="text-lg font-bold text-text-light">
                Rue Pierre Seghers 26800 Portes-lès-Valence, France{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
