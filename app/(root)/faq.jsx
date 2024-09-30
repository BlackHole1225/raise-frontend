import * as React from 'react';

const FaqItem = ({ question, answer }) => (
  <div className={`bg-brand-eucalyptus p-8 h-full`}>
    <h3 className="text-3xl font-bold tracking-widest uppercase text-stone-700 mb-2 font-heading">
      {question}
    </h3>
    <p className="text-lg text-stone-700">{answer}</p>
  </div>
);

function FAQComponent() {
  const faqData = [
    {
      question: 'How to start a campaign?',
      answer:
        "We need to socialize the comms with the wider stakeholder community guerrilla marketing, but reinvent the wheel strategic high-level 30,000 ft view, for going forward. Flesh that out the horse is out of the barn. We need to button up our approach who's responsible for the ask for this request? waste of resources.",
      bgColor: 'bg-yellow-200'
    },
    {
      question: 'How much funds can be raised?',
      answer:
        "We need to socialize the comms with the wider stakeholder community guerrilla marketing, but reinvent the wheel strategic high-level 30,000 ft view, for going forward. Flesh that out the horse is out of the barn. We need to button up our approach who's responsible for the ask for this request? waste of resources."
    },
    {
      question: "Can I donate even if I don't have an account?",
      answer:
        "We need to socialize the comms with the wider stakeholder community guerrilla marketing, but reinvent the wheel strategic high-level 30,000 ft view, for going forward. Flesh that out the horse is out of the barn. We need to button up our approach who's responsible for the ask for this request? waste of resources."
    },
    {
      question: 'How to verify my account?',
      answer:
        "We need to socialize the comms with the wider stakeholder community guerrilla marketing, but reinvent the wheel strategic high-level 30,000 ft view, for going forward. Flesh that out the horse is out of the barn. We need to button up our approach who's responsible for the ask for this request? waste of resources."
    },
    {
      question: 'Can I promote my campaign?',
      answer:
        "We need to socialize the comms with the wider stakeholder community guerrilla marketing, but reinvent the wheel strategic high-level 30,000 ft view, for going forward. Flesh that out the horse is out of the barn. We need to button up our approach who's responsible for the ask for this request? waste of resources."
    },
    {
      question: 'What if I lost my account credentials?',
      answer:
        "We need to socialize the comms with the wider stakeholder community guerrilla marketing, but reinvent the wheel strategic high-level 30,000 ft view, for going forward. Flesh that out the horse is out of the barn. We need to button up our approach who's responsible for the ask for this request? waste of resources."
    }
  ];

  return (
    <section className="bg-amber-50 px-6 py-16 md:px-16 md:py-32">
      <h2 className="text-4xl md:text-7xl font-bold uppercase text-brand-dark font-heading tracking-wider mb-12">
        Clear your every <br />
        single question!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {faqData.map((faq, index) => (
          <FaqItem key={index} {...faq} />
        ))}
      </div>
    </section>
  );
}

export default FAQComponent;
