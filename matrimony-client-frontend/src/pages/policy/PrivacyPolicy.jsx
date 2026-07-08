import React from 'react';
import Footer from '../../components/Footer';
import LayoutComponent from '../../components/layouts/LayoutComponent';
import './privacypolicy.css';
import SEOHelmet from '../../components/common/SEOHelmet';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <SEOHelmet 
        title="Privacy Policy | AgapeVows Christian Matrimony" 
        description="Learn how AgapeVows protects your personal information and maintains a secure, private environment for Christian matchmaking." 
      />
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="privacy-policy-page pt-32" style={{ marginTop: '160px', padding: '40px' }}>
        <h1 className="text-[#58219f] text-3xl font-bold border-b-2 border-gray-200 pb-2 mb-6">Privacy Statement &amp; Safety Guidelines</h1>
        <section>
          <p>
            At AgapeVows, we value the trust you place in us and recognize the importance of protecting your personal information. We are committed to maintaining the privacy, security, and confidentiality of our members&apos; data. This Privacy Policy explains how AgapeVows.com collects, uses, stores, shares, and otherwise processes your personal information when you use our website and related services.
          </p>
        </section>

        <section>
          <h2 className="text-[#58219f] text-xl font-bold mb-4">Introduction</h2>
          <p>AgapeVows.com (&quot;AgapeVows&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) values the trust placed in us by our members and is committed to protecting the privacy and security of personal information shared with us.</p>
          <p>AgapeVows is a Christian matrimony platform designed to help individuals find meaningful, faith-centered matrimonial alliances. This Privacy Policy explains how we collect, use, store, protect, and share information provided by users of our Platform.</p>
          <p>By registering on or using AgapeVows, you consent to the collection and use of your information in accordance with this Privacy Policy.</p>
        </section>

        <section>
          <h2 className="text-[#58219f] text-xl font-bold mb-4">Information We Collect</h2>
          <p>To provide our services effectively, we collect information that you voluntarily provide during registration, profile creation, verification, communication, and membership management.</p>
          <p>This information may include your name, date of birth, age, gender, marital status, denomination, educational qualifications, occupation, family details, photographs, contact information, partner preferences, and other profile-related information.</p>
          <p>We may also collect Government-issued identity documents submitted for verification purposes, along with technical information such as IP addresses, browser type, device information, login activity, and website usage information.</p>
          <p>Members are responsible for ensuring that all information submitted to AgapeVows is accurate and up to date.</p>
        </section>

        <section>
          <h2 className="text-[#58219f] text-xl font-bold mb-4">How We Use Your Information</h2>
          <p>The information collected by AgapeVows is used to create and manage member profiles, facilitate matrimonial introductions, verify identity, provide customer support, process memberships, improve platform functionality, prevent fraud, maintain platform security, and comply with applicable legal obligations.</p>
          <p>We may also use your information to communicate important updates regarding your account, membership, verification status, security matters, policy changes, and other service-related notifications.</p>
          <p>AgapeVows does not sell personal information to third parties.</p>
        </section>

        <section>
          <h2 className="text-[#58219f] text-xl font-bold mb-4">Government ID Verification Policy</h2>
          <p>To maintain a trusted and secure matrimonial environment, AgapeVows requires all members to submit a valid Government-issued identity document within three (3) days of registration.</p>
          <p>Accepted documents may include Aadhaar Card, or Passport.</p>
          <p>These documents are collected solely for identity verification, fraud prevention, duplicate profile detection, platform security, and legal compliance. Failure to submit the required identification documents within the specified timeframe may result in profile suspension, restriction, or deactivation.</p>
          <p>While AgapeVows takes reasonable measures to safeguard verification documents, members acknowledge that no online system can guarantee absolute security.</p>
        </section>

        <section>
          <h2 className="text-[#58219f] text-xl font-bold mb-4">OTP Verification and Communications</h2>
          <p>AgapeVows may use One-Time Passwords (OTP) and other verification methods for account registration, mobile number verification, login authentication, password recovery, account security, and fraud prevention.</p>
          <p>By registering on AgapeVows, you consent to receiving communications through SMS, telephone calls, WhatsApp, and email for profile verification, account activation, customer support, membership servicing, security alerts, and other service-related purposes.</p>
          <p>These communications are considered essential to the operation of the Platform. Members may opt out of promotional communications where applicable; however, essential service communications may continue.</p>
        </section>

        <section>
          <h2 className="text-[#58219f] text-xl font-bold mb-4">Cookies and Website Analytics</h2>
          <p>AgapeVows may use cookies and similar technologies to improve website functionality, remember user preferences, enhance user experience, analyze website performance, and maintain platform security.</p>
          <p>Cookies help us understand how visitors use the Platform so that we can improve our services. Most web browsers allow users to manage or disable cookies through browser settings; however, doing so may affect certain features of the Platform.</p>
        </section>

        <section>
          <h2 className="text-[#58219f] text-xl font-bold mb-4">Location Information</h2>
          <p>AgapeVows may request access to your location information through your web browser or device settings in order to provide location-based features and improve your experience on the Platform.</p>
          <p>Location information may be used to display relevant matrimonial profiles, nearby matches, Christian events, activities, services, and other content that may be relevant to your geographic area. This helps members discover profiles and opportunities that may be more suitable based on their preferred or current location.</p>
          <p>Location access is entirely optional and is collected only with your permission. You may choose to enable or disable location access at any time through your browser or device settings. Please note that disabling location access may limit the availability or accuracy of certain location-based features offered by AgapeVows.</p>
          <p>AgapeVows does not continuously track your real-time location. Any location information collected is used solely for legitimate operational purposes related to the services provided on the Platform and in accordance with this Privacy Policy.</p>
        </section>

        <section>
          <h2 className="text-[#58219f] text-xl font-bold mb-4">Sharing of Information</h2>
          <p>AgapeVows respects your privacy and does not sell or rent personal information to third parties.</p>
          <p>Information may be shared with trusted service providers who assist in operating the Platform, including payment processors, hosting providers, verification partners, technical support providers, and professional advisors where necessary for business operations.</p>
          <p>Information may also be disclosed where required by law, court order, regulatory authority, law enforcement agency, or where such disclosure is necessary to protect the rights, safety, security, or legal interests of AgapeVows or its members.</p>
        </section>

        <section>
          <h2 className="text-[#58219f] text-xl font-bold mb-4">Counseling and Vendor Services</h2>
          <p>AgapeVows may facilitate introductions to faith-based counselors, pastors, ministries, photographers, caterers, wedding planners, bridal makeup artists, insurance providers, and other wedding-related service providers.</p>
          <p>If you choose to engage with such third-party providers, any information shared with them shall be governed by their own privacy practices and policies. AgapeVows is not responsible for how such third parties collect, use, store, or disclose information provided by members.</p>
          <p>Members are encouraged to review the privacy policies of any third-party provider before sharing personal information.</p>
        </section>

        <section>
          <h2 className="text-[#58219f] text-xl font-bold mb-4">Data Security and Retention</h2>
          <p>AgapeVows takes reasonable administrative, technical, and organizational measures to protect personal information from unauthorized access, misuse, loss, alteration, or disclosure.</p>
          <p>We retain information only for as long as reasonably necessary to provide services, maintain records, prevent fraud, resolve disputes, comply with legal obligations, and enforce our policies.</p>
          <p>Certain information, including verification records, may be retained for a reasonable period even after profile closure where required for security, legal, or compliance purposes.</p>
          <p>While we strive to protect personal information, no internet-based service can guarantee complete security, and members acknowledge the inherent risks associated with online communications.</p>
        </section>

        <section>
          <h2 className="text-[#58219f] text-xl font-bold mb-4">Safety and Community Guidelines</h2>
          <p>AgapeVows is committed to maintaining a safe, respectful, and Christ-centered matrimonial community.</p>
          <p>Members are expected to interact honestly, respectfully, and responsibly with fellow members and their families. Harassment, abuse, threats, financial solicitation, dowry demands, fraud, impersonation, identity misrepresentation, and inappropriate conduct are strictly prohibited.</p>
          <p>Members should exercise caution when interacting with prospective matches and should independently verify important information before making matrimonial decisions.</p>
          <p>AgapeVows reserves the right to investigate complaints and take appropriate action, including suspension or termination of membership, where violations of these guidelines are identified.</p>
        </section>

        <section>
          <h2 className="text-[#58219f] text-xl font-bold mb-4">Safety Tips</h2>
          <p>AgapeVows is committed to providing a safe and trusted environment for Christian individuals seeking a life partner. While we take reasonable measures to verify profiles, review content, and investigate reported concerns, online safety also depends on the precautions taken by our members.</p>
          <p>We encourage all members to use good judgment, proceed carefully, and take time to build trust before sharing personal information or making important decisions. The following guidelines may help you have a safer and more positive experience on the Platform.</p>
          
          <h3 className="text-[#58219f] text-lg font-semibold mt-6 mb-2">Start Slowly and Communicate Carefully</h3>
          <p>When getting to know a new person, take your time and allow the relationship to develop gradually.</p>
          <h4>Do&apos;s</h4>
          <ul>
            <li>Use the AgapeVows platform and messaging features whenever possible during the initial stages of communication.</li>
            <li>Take time to learn about the other person before sharing personal information.</li>
            <li>Pay attention to inconsistencies in conversations or profile information.</li>
            <li>Trust your instincts if something feels uncomfortable or suspicious.</li>
            <li>Communicate at a pace that feels comfortable to you.</li>
          </ul>
          <h4>Don&apos;ts</h4>
          <ul>
            <li>Do not feel pressured to share personal information before you are ready.</li>
            <li>Do not disclose sensitive information such as home address, financial details, passwords, or OTPs.</li>
            <li>Do not continue conversations with individuals who pressure, manipulate, or intimidate you.</li>
          </ul>

          <h3 className="text-[#58219f] text-lg font-semibold mt-6 mb-2">Request Recent Photos and Verify Identity</h3>
          <p>Photos and profile information can help you better understand the person you are communicating with.</p>
          <h4>Do&apos;s</h4>
          <ul>
            <li>Request recent photographs if they are not already available.</li>
            <li>Ask for additional photos if you feel it is necessary.</li>
            <li>Verify important profile details through conversations and appropriate references.</li>
            <li>Make use of AgapeVows verification features whenever available.</li>
          </ul>
          <h4>Don&apos;ts</h4>
          <ul>
            <li>Do not ignore repeated excuses for avoiding identity verification or sharing recent photographs.</li>
            <li>Do not assume that profile information alone is sufficient verification.</li>
          </ul>

          <h3 className="text-[#58219f] text-lg font-semibold mt-6 mb-2">Speak Before You Meet</h3>
          <p>A phone or video conversation can help you understand a person&apos;s communication style and intentions before arranging an in-person meeting.</p>
          <h4>Do&apos;s</h4>
          <ul>
            <li>Have phone or video conversations before meeting in person.</li>
            <li>Use privacy settings or caller identification controls if you prefer not to share your personal number initially.</li>
            <li>Share your contact details only when you feel comfortable and confident.</li>
            <li>Make use of AgapeVows &apos;alternate contact details&apos; feature and provide a contact information of a parent or a representative who can communicate with the interested matches on behalf of you.</li>
          </ul>
          <h4>Don&apos;ts</h4>
          <ul>
            <li>Do not feel obligated to share your personal phone number immediately.</li>
            <li>Do not disclose excessive personal information during early conversations.</li>
          </ul>

          <h3 className="text-[#58219f] text-lg font-semibold mt-6 mb-2">Meet Only When You Feel Ready</h3>
          <p>One of the advantages of online matrimony is that relationships can develop gradually.</p>
          <h4>Do&apos;s</h4>
          <ul>
            <li>Take sufficient time to know the person before arranging a meeting.</li>
            <li>Proceed at a pace that feels right for you.</li>
            <li>Discuss important topics openly before moving the relationship offline.</li>
            <li>Involve family members or trusted advisors wherever appropriate.</li>
          </ul>
          <h4>Don&apos;ts</h4>
          <ul>
            <li>Do not allow anyone to pressure you into meeting before you are comfortable.</li>
            <li>Do not ignore concerns simply because you have invested time in the conversation.</li>
          </ul>

          <h3 className="text-[#58219f] text-lg font-semibold mt-6 mb-2">Meet in a Safe Environment</h3>
          <p>If you decide to meet someone in person, always prioritize your safety.</p>
          <h4>Do&apos;s</h4>
          <ul>
            <li>Meet in a public place such as a restaurant, café, or similar location.</li>
            <li>Inform a family member or trusted friend about your plans.</li>
            <li>Arrange your own transportation to and from the meeting location.</li>
            <li>Carry a mobile phone and remain reachable.</li>
            <li>Consider involving family members during initial meetings.</li>
          </ul>
          <h4>Don&apos;ts</h4>
          <ul>
            <li>Do not meet for the first time in a private residence or isolated location.</li>
            <li>Do not rely on the other person for transportation.</li>
            <li>Do not attend a first meeting alone if you have any concerns.</li>
          </ul>

          <h3 className="text-[#58219f] text-lg font-semibold mt-6 mb-2">Watch for Warning Signs</h3>
          <p>Pay attention to behaviour that appears inconsistent, manipulative, or dishonest.</p>
          <h4>Do&apos;s</h4>
          <ul>
            <li>Ask questions and look for consistency in responses.</li>
            <li>Observe how the person treats you and others.</li>
            <li>Involve family members, church leaders, or trusted advisors when evaluating a potential match.</li>
            <li>Take concerns seriously and seek clarification when something does not seem right.</li>
          </ul>
          <h4>Don&apos;ts</h4>
          <ul>
            <li>Do not ignore repeated inconsistencies regarding age, education, employment, marital status, family background, or other important information.</li>
            <li>Do not overlook controlling, disrespectful, aggressive, or manipulative behavior.</li>
            <li>Do not dismiss concerns raised by family members or trusted individuals without careful consideration.</li>
          </ul>

          <h3 className="text-[#58219f] text-lg font-semibold mt-6 mb-2">Be Alert to Financial Scams</h3>
          <p>Unfortunately, online fraud can occur on any platform. Exercise caution whenever money is involved.</p>
          <h4>Do&apos;s</h4>
          <ul>
            <li>Be cautious if someone requests money, gifts, investments, loans, or financial assistance.</li>
            <li>Report any financial solicitation immediately to AgapeVows.</li>
            <li>End communication with individuals who repeatedly request financial support.</li>
            <li>Verify information independently before making any financial commitments.</li>
          </ul>
          <h4>Don&apos;ts</h4>
          <ul>
            <li>Do not send money to anyone you meet through the Platform.</li>
            <li>Do not share banking details, credit card information, passwords, OTPs, or financial credentials.</li>
            <li>Do not make financial decisions based solely on online interactions.</li>
            <li>Do not assume that expressions of affection are proof of trustworthiness.</li>
          </ul>
          
          <h3 className="text-[#58219f] text-lg font-semibold mt-6 mb-2">Report Suspicious Activity</h3>
          <p>If you encounter fake profiles, harassment, financial scams, dowry demands, impersonation, abuse, or any other suspicious behavior, please report the matter to AgapeVows immediately.</p>
          <p>Prompt reporting helps us investigate concerns, protect other members, and maintain a safe and trustworthy community for everyone.</p>
          <p>Ultimately, your safety is important. Use good judgment, trust your instincts, involve trusted family members where appropriate, and take the time needed to make informed decisions throughout your matrimonial journey.</p>
        </section>

        <section>
          <h2 className="text-[#58219f] text-xl font-bold mb-4">Changes to this Privacy Policy</h2>
          <p>AgapeVows reserves the right to modify, amend, or update this Privacy Policy from time to time to reflect changes in legal requirements, industry practices, business operations, or Platform features.</p>
          <p>Any updates will be published on the Platform. Continued use of AgapeVows following such updates shall constitute acceptance of the revised Privacy Policy.</p>
        </section>

        <section>
          <h2 className="text-[#58219f] text-xl font-bold mb-4">Contact Information</h2>
          <p>For privacy-related questions, abuse reports, data requests, verification concerns, or general enquiries, please contact:</p>
          <p>
            <strong>AgapeVows.com</strong><br />
            <strong>Email:</strong> <a href="mailto:support@agapevows.com">support@agapevows.com</a>
          </p>
          <p>By registering on AgapeVows and continuing to use the Platform, you acknowledge that you have read, understood, and agreed to this Privacy Policy.</p>
        </section>
      </div>
      <Footer />
    </div>
  );
};


export default PrivacyPolicy;