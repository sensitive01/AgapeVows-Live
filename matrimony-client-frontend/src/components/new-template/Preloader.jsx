import loader1 from '../../assets/new-template/images/loder/1.png';
import loader2 from '../../assets/new-template/images/loder/2.png';
import loader3 from '../../assets/new-template/images/loder/3.png';

export default function Preloader() {
  return (
    <>
      {/* PRELOADER */}
      <div id="preloader">
        <div className="plod">
          <span className="lod1">
            <img src={loader1} alt="" loading="lazy" />
          </span>
          <span className="lod2">
            <img src={loader2} alt="" loading="lazy" />
          </span>
          <span className="lod3">
            <img src={loader3} alt="" loading="lazy" />
          </span>
        </div>
      </div>
      <div className="pop-bg" />
      {/* END PRELOADER */}
    </>
  );
}
