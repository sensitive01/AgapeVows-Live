import iconRings from '../../assets/new-template/images/icon/rings.png';
import iconWedding2 from '../../assets/new-template/images/icon/wedding-2.png';
import iconLoveBirds from '../../assets/new-template/images/icon/love-birds.png';
import iconNetwork from '../../assets/new-template/images/icon/network.png';
import iconChat from '../../assets/new-template/images/icon/chat.png';
import iconWeddingCouple from '../../assets/new-template/images/icon/wedding-couple.png';

export default function HowItWorksSection() {
  return (
    <section>
      <div
        className="wedd-tline"
        style={{
          paddingTop: '20px',
          paddingBottom: '40px',
        }}
      >
        <div className="container" style={{ maxWidth: '1350px' }}>
          <div className="row">

            {/* TITLE */}
            <div className="home-tit" style={{ textAlign: 'center' }}>
              <p style={{ color: '#000' }}>Moments</p>

              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 'bold',
                }}
              >
                <span style={{ color: '#7c3aed' }}>
                  How it works
                </span>
              </h2>
              <span className="leaf1" />
              <span className="tit-ani-" />
            </div>

            <div className="inn">
              <ul>

                {/* 1 */}
                <li>
                  <div className="tline-inn">
                    <div className="tline-im">
                      <img src={iconRings} alt="" loading="lazy" />
                    </div>
                    <div className="tline-con">
                      <h5 style={{ color: '#7c3aed' }}>Register</h5>
                      <p style={{ color: '#000' }}>
                        Create your profile in minutes. Add your photos, interests,
                        and preferences to start your journey towards finding the
                        perfect life partner.
                      </p>
                    </div>
                  </div>
                </li>

                {/* 2 */}
                <li>
                  <div className="tline-inn tline-inn-reve">
                    <div className="tline-con">
                      <h5 style={{ color: '#7c3aed' }}>Find your Match</h5>
                      <p style={{ color: '#000' }}>
                        Browse through thousands of verified profiles. Use our
                        advanced filters to find someone who shares your values,
                        culture, and lifestyle.
                      </p>
                    </div>
                    <div className="tline-im">
                      <img src={iconWedding2} alt="" loading="lazy" />
                    </div>
                  </div>
                </li>

                {/* 3 */}
                <li>
                  <div className="tline-inn">
                    <div className="tline-im">
                      <img src={iconLoveBirds} alt="" loading="lazy" />
                    </div>
                    <div className="tline-con">
                      <h5 style={{ color: '#7c3aed' }}>Send Interest</h5>
                      <p style={{ color: '#000' }}>
                        Found someone interesting? Express your interest with a
                        single click. It's the first step towards a meaningful
                        conversation and a lasting bond.
                      </p>
                    </div>
                  </div>
                </li>

                {/* 4 */}
                <li>
                  <div className="tline-inn tline-inn-reve">
                    <div className="tline-con">
                      <h5 style={{ color: '#7c3aed' }}>
                        Get Profile Information
                      </h5>
                      <p style={{ color: '#000' }}>
                        Get to know them better. Explore detailed profile
                        information, professional backgrounds, and family details
                        to ensure a perfect compatibility.
                      </p>
                    </div>
                    <div className="tline-im">
                      <img src={iconNetwork} alt="" loading="lazy" />
                    </div>
                  </div>
                </li>

                {/* 5 */}
                <li>
                  <div className="tline-inn">
                    <div className="tline-im">
                      <img src={iconChat} alt="" loading="lazy" />
                    </div>
                    <div className="tline-con">
                      <h5 style={{ color: '#7c3aed' }}>Start Meetups</h5>
                      <p style={{ color: '#000' }}>
                        Connect securely through our platform. Start chatting and
                        arrange meetups to build understanding and strengthen your
                        connection.
                      </p>
                    </div>
                  </div>
                </li>

                {/* 6 */}
                <li>
                  <div className="tline-inn tline-inn-reve">
                    <div className="tline-con">
                      <h5 style={{ color: '#7c3aed' }}>
                        Getting Marriage
                      </h5>
                      <p style={{ color: '#000' }}>
                        Turn your beautiful journey into a lifetime of happiness.
                        We celebrate every successful match and the beginning of a
                        new family legacy.
                      </p>
                    </div>
                    <div className="tline-im">
                      <img src={iconWeddingCouple} alt="" loading="lazy" />
                    </div>
                  </div>
                </li>

              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
