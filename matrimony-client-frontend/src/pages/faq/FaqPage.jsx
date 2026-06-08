import React from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";
import faqHero from "../../assets/images/ban-bg.jpg";

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
      <div className="pt-[160px] pb-12">
        <div className="relative overflow-hidden rounded-b-[40px] shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${faqHero})` }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative container mx-auto px-6 py-24 text-center">
            <span className="inline-flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#5c2a9d] mb-6">
              AgapeVows Help Center
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'var(--tit-font)' }}>
              Frequently Asked Questions
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-white/85 text-base md:text-lg leading-relaxed">
              Answers to the most common questions about how AgapeVows works, your safety, membership, and matchmaking.
            </p>
          </div>
        </div>
      </div>

      {/* --- FAQ CONTENT --- */}
      <section className="py-20 bg-[#f2f4f9]">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-[28px] p-8 shadow-[0_24px_48px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#f8f5fd] text-[#5c2a9d] rounded-2xl flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-3">{faq.q}</h3>
                    <p className="text-slate-600 leading-relaxed">
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
          <div className="bg-[#5c2a9d] rounded-3xl p-12 text-white max-w-4xl mx-auto shadow-[0_30px_60px_rgba(99,102,241,0.18)]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Still have questions?</h2>
            <p className="text-white/90 mb-8 text-lg leading-relaxed">
              Our support team is here to help you with your matchmaking journey and answer every question.
            </p>
            <a
              href="/help-support"
              className="inline-block bg-white text-[#5c2a9d] px-8 py-3 rounded-full font-semibold hover:bg-slate-50 transition-colors"
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
