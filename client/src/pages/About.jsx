import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/logo.png';

export default function About() {
  const faqs = [
    {
      question: "What is Alt-West Connect?",
      answer: "Alt-West Connect is a community platform that connects neighbours in Alt-West Leipzig who need help with those who can offer assistance. It's designed to strengthen local community bonds and promote mutual aid."
    },
    {
      question: "How does it work?",
      answer: "Members can post requests for help or offer assistance to existing requests. Whether it's helping with groceries, providing transport, or offering tech support, our platform makes it easy to connect with neighbours."
    },
    {
      question: "Is it free to use?",
      answer: "Yes, Alt-West Connect is completely free. We believe in building stronger communities through voluntary cooperation."
    },
    {
      question: "How can I ensure my safety?",
      answer: "We recommend meeting in public places, verifying user profiles through their zip codes, and using our messaging system for initial communication. Never share sensitive personal information."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-16 lg:mt-0">
      {/* Platform Info Section */}
      <section className="mb-12">
        <h1 className="text-2xl lg:text-4xl font-bold text-charcoal mb-6">About Alt-West Connect</h1>
        <img src={logo} alt="Alt-West Connect Logo" className="w-32 h-32 mb-4 mx-auto" />
        <p className="text-lg text-gray-700 mb-4">
          Welcome to Alt-West Connect, where we believe in the power of neighbourhood support and community connection. 
          Our platform brings together residents of Alt-West Leipzig to create stronger, more resilient communities through acts of kindness and mutual assistance.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Whether you need help with everyday tasks or want to offer your skills to help others, 
          Alt-West Connect provides a safe and easy way to connect with people in your local area.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-12 bg-brick/20 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-charcoal mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700">
          To strengthen community bonds in Alt-West Leipzig by facilitating meaningful connections and mutual support between neighbours, 
          making it easier for people to help each other and create more resilient neighbourhoods.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="mb-12 bg-olive/20 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-charcoal mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold text-charcoal mb-2">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-12 bg-charcoal/30 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-charcoal mb-4">Get in Touch</h2>
        <p className="text-lg text-gray-700 mb-4">
          Have questions or suggestions? We'd love to hear from you!
        </p>
        <a 
          className="text-oliveHover font-bold"
        >
          fake.email@alt-west-connect.com
        </a>
      </section>

      {/* Navigation */}
      <div className="text-center">
        <Link 
          to="/" 
          onClick={() => window.scrollTo(0, 0)}
          className="inline-block bg-brick hover:bg-brickHover text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
