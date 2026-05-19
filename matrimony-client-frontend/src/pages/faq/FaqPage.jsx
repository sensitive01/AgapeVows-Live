import React from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";

const FaqPage = () => {
  const faqs = [
    {
      q: "What is AgapeVows?",
      a: "AgapeVows is a Christian matrimony platform designed to help Christian singles connect for meaningful, faith-centered relationships and marriage. Our focus is on trust, privacy, and genuine matchmaking."
    },
    {
      q: "Who can join AgapeVows?",
      a: "AgapeVows is exclusively for Christians and followers of Jesus Christ who are seeking serious relationships leading to marriage."
    },
    {
      q: "Are profiles verified on AgapeVows?",
      a: "Yes. We encourage profile verification to maintain authenticity and create a safer experience for our users. Users may be asked to submit valid identification for verification purposes."
    },
    {
      q: "Is my personal information safe?",
      a: "Yes. We take user privacy and security seriously. Your personal information and uploaded documents are protected and will never be shared publicly without your consent."
    },
    {
      q: "Is AgapeVows free to use?",
      a: "AgapeVows offers limited free access during the launch phase. Additional premium features and subscription plans may be introduced in the future."
    },
    {
      q: "How does AgapeVows help prevent fake profiles?",
      a: "We use profile verification, moderation processes, reporting tools, and account monitoring to reduce fake or suspicious activity and help maintain a trustworthy community."
    },
    {
      q: "Can I search profiles based on Christian denomination or community?",
      a: "Yes. Users can search and filter profiles based on Christian denomination, community, age group, location, and other preferences."
    },
    {
      q: "Can families or parents create profiles on behalf of someone?",
      a: "Yes. Parents, guardians, or family members may create and manage profiles for their son, daughter, or relative with their knowledge and consent."
    },
    {
      q: "How can I report suspicious or inappropriate behavior?",
      a: "You can use the report or block options available within the platform or contact our support team directly. We review reported accounts seriously to maintain user safety."
    },
    {
      q: "How do I contact AgapeVows support?",
      a: "You can reach our support team through the Contact Us page or the Help & Support section available on the website. We’re here to assist you with any questions or concerns."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <LayoutComponent />
      </div>

      {/* --- PAGE HEADER --- */}
      <div className="pt-[160px] pb-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: 'var(--tit-font)' }}>
            Frequently Asked Questions
          </h1>
          <div className="h-1 w-16 bg-purple-600 mt-4"></div>
        </div>
      </div>

      {/* --- FAQ CONTENT --- */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.q}</h3>
                    <div className="h-px w-12 bg-gray-100 mb-4"></div>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT CTA --- */}
      <section className="pb-24">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-purple-600 rounded-2xl p-12 text-white max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-purple-100 mb-8">Our support team is here to help you 24/7.</p>
            <a 
              href="/help-support" 
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FaqPage;
