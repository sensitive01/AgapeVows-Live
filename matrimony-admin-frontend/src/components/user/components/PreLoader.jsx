import image1 from "../../../assets/images/loder/1.png";
import image2 from "../../../assets/images/loder/2.png";
import image3 from "../../../assets/images/loder/3.png";

const PreLoader = () => {
  return (
    <>
      <div id="preloader">
        <div className="plod">
          <span className="lod1">
            <img src={image1} alt="" loading="lazy" />
          </span>
          <span className="lod2">
            <img src={image2} alt="" loading="lazy" />
          </span>
          <span className="lod3">
            <img src={image3} alt="" loading="lazy" />
          </span>
        </div>
      </div>
      <div className="pop-bg"></div>
    </>
  );
};

export default PreLoader;
