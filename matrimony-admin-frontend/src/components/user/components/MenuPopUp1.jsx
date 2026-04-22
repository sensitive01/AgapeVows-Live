import logoImg from "../../admin/images/logo.png";
import profImg1 from "../../../assets/images/profiles/1.jpg";


const MenuPopUp1 = () => {
  return (
    <div className="menu-pop menu-pop1">
      <span className="menu-pop-clo">
        <i className="fa fa-times" aria-hidden="true" />
      </span>
      <div className="inn">
        <img src={logoImg} alt="" loading="lazy" className="logo-brand-only" />
        <p>
          <strong>Best Wedding Matrimony</strong> lacinia viverra lectus. Fusce
          imperdiet ullamcorper metus eu fringilla.Lorem Ipsum is simply dummy
          text of the printing and typesetting industry.
        </p>
        <ul className="menu-pop-info">
          <li>
            <a href="#!">
              <i className="fa fa-phone" aria-hidden="true" />
              +92 (8800) 68 - 8960
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="fa fa-whatsapp" aria-hidden="true" />
              +92 (8800) 68 - 8960
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="fa fa-envelope-o" aria-hidden="true" />
              help@company.com
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="fa fa-map-marker" aria-hidden="true" />
              3812 Lena Lane City Jackson Mississippi
            </a>
          </li>
        </ul>
        <div className="menu-pop-help">
          <h4>Support Team</h4>
          <div className="user-pro">
            <img src={profImg1} alt="" loading="lazy" />
          </div>
          <div className="user-bio">
            <h5>Ashley emyy</h5>
            <span>Senior personal advisor</span>
            <a href="enquiry.html" className="btn btn-primary btn-sm">
              Ask your doubts
            </a>
          </div>
        </div>
        <div className="menu-pop-soci">
          <ul>
            <li>
              <a href="#!">
                <i className="fa fa-facebook" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fa fa-twitter" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fa fa-whatsapp" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fa fa-linkedin" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fa fa-youtube-play" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fa fa-instagram" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenuPopUp1;
