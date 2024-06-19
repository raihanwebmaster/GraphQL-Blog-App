import React, { useState } from 'react';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'How to create an account?',
      answer: `To create an account, find the 'Sign up' or 'Create account' button, fill out the registration form with your personal information, and click 'Create account' or 'Sign up.' Verify your email address if needed, and then log in to start using the platform.`,
    },
    {
      question: 'Have any trust issue?',
      answer: `Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease.`,
    },
    {
      question: 'How can I reset my password?',
      answer: `To reset your password, click on the 'Forgot Password' link on the login page. Enter your registered email address, and we will send you instructions to reset your password.`,
    },
    {
      question: 'What is the payment process?',
      answer: `Our payment process is simple and secure. You can use various payment methods such as credit cards, debit cards, and online payment gateways. Once the payment is processed, you will receive a confirmation email with the details.`,
    },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/2">
            <img
              src="https://pagedone.io/asset/uploads/1696230182.png"
              alt="FAQ tailwind section"
              className="w-full"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-6 lg:mb-16">
                <h6 className="text-lg text-center font-medium text-indigo-600 mb-2 lg:text-left">
                  faqs
                </h6>
                <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-left">
                  Looking for answers?
                </h2>
              </div>
              <div className="accordion-group">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`accordion pb-8 border-b border-solid border-gray-200 ${activeIndex === index ? 'active' : ''}`}
                    id={`basic-heading-${index}`}
                  >
                    <button
                      className="accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600"
                      aria-controls={`basic-collapse-${index}`}
                      onClick={() => handleToggle(index)}
                    >
                      <h5>{faq.question}</h5>
                      <svg
                        className={`text-gray-900 transition duration-500 group-hover:text-indigo-600 ${activeIndex === index ? 'rotate-180' : ''}`}
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <div
                      id={`basic-collapse-${index}`}
                      className={`accordion-content w-full px-0 overflow-hidden pr-4 ${activeIndex === index ? 'active' : ''}`}
                      style={{ maxHeight: activeIndex === index ? '100px' : '0px' }}
                      aria-labelledby={`basic-heading-${index}`}
                    >
                      <p className="text-base font-normal text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
