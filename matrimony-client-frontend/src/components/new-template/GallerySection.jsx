import gallery1 from '../../assets/new-template/images/gallery/1.jpg';
import gallery3 from '../../assets/new-template/images/gallery/3.jpg';
import gallery4 from '../../assets/new-template/images/gallery/4.jpg';
import gallery5 from '../../assets/new-template/images/gallery/5.jpg';
import gallery6 from '../../assets/new-template/images/gallery/6.jpg';
import gallery7 from '../../assets/new-template/images/gallery/7.jpg';
import gallery8 from '../../assets/new-template/images/gallery/8.jpg';
import gallery9 from '../../assets/new-template/images/gallery/9.jpg';
import couple9 from '../../assets/new-template/images/couples/9.jpg';
import couple11 from '../../assets/new-template/images/couples/11.jpg';

export default function GallerySection() {
  return (
    <section>
      <div className="wedd-gall home-wedd-gall">
        <div className="container-fluid">
          <div className="gall-inn">
            <div className="home-tit">

              {/* 🔥 collections → BLACK */}
              <p style={{ color: '#000000' }}>
                collections
              </p>

              {/* 🔥 Photo gallery → VIOLET */}
              <h2>
                <span style={{ color: '#7c3aed' }}>
                  Photo gallery
                </span>
              </h2>

              <span className="leaf1" />
              <span className="tit-ani-" />
            </div>
            <div className="col-sm-6 col-md-2">
              <div className="gal-im animate animate__animated animate__slow" data-ani="animate__flipInX">
                <img src={gallery1} className="gal-siz-1" alt="" loading="lazy" />
                <div className="txt">
                  <span>Wedding</span>
                  <h4>Bride &amp; Groom</h4>
                </div>
              </div>
              <div className="gal-im animate animate__animated animate__slower" data-ani="animate__flipInX">
                <img src={gallery9} className="gal-siz-2" alt="" loading="lazy" />
                <div className="txt">
                  <span>Wedding</span>
                  <h4>Bride &amp; Groom</h4>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="gal-im animate animate__animated animate__slower" data-ani="animate__flipInX">
                <img src={gallery3} className="gal-siz-2" alt="" loading="lazy" />
                <div className="txt">
                  <span>Wedding</span>
                  <h4>Bride &amp; Groom</h4>
                </div>
              </div>
              <div className="gal-im animate animate__animated animate__slower" data-ani="animate__flipInX">
                <img src={gallery4} className="gal-siz-1" alt="" loading="lazy" />
                <div className="txt">
                  <span>Wedding</span>
                  <h4>Bride &amp; Groom</h4>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-2">
              <div className="gal-im animate animate__animated animate__slower" data-ani="animate__flipInX">
                <img src={gallery5} className="gal-siz-1" alt="" loading="lazy" />
                <div className="txt">
                  <span>Wedding</span>
                  <h4>Bride &amp; Groom</h4>
                </div>
              </div>
              <div className="gal-im animate animate__animated animate__slower" data-ani="animate__flipInX">
                <img src={gallery6} className="gal-siz-2" alt="" loading="lazy" />
                <div className="txt">
                  <span>Wedding</span>
                  <h4>Bride &amp; Groom</h4>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="gal-im animate animate__animated animate__slower" data-ani="animate__flipInX">
                <img src={gallery7} className="gal-siz-2" alt="" loading="lazy" />
                <div className="txt">
                  <span>Wedding</span>
                  <h4>Bride &amp; Groom</h4>
                </div>
              </div>
              <div className="gal-im animate animate__animated animate__slower" data-ani="animate__flipInX">
                <img src={gallery8} className="gal-siz-1" alt="" loading="lazy" />
                <div className="txt">
                  <span>Wedding</span>
                  <h4>Bride &amp; Groom</h4>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="gal-im animate animate__animated animate__slower" data-ani="animate__flipInX">
                <img src={couple9} className="gal-siz-2" alt="" loading="lazy" />
                <div className="txt">
                  <span>Wedding</span>
                  <h4>Bride &amp; Groom</h4>
                </div>
              </div>
              <div className="gal-im animate animate__animated animate__slower" data-ani="animate__flipInX">
                <img src={couple11} className="gal-siz-1" alt="" loading="lazy" />
                <div className="txt">
                  <span>Wedding</span>
                  <h4>Bride &amp; Groom</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
