export default function StatsSection() {
  return (
    <section>
      <div className="ab-cont">
        <div className="container">
          <div className="row">
            <ul>
              <li>
                <div className="ab-cont-po">
                  <i className="fa fa-heart-o" aria-hidden="true" />
                  <div>
                    <h4 style={{ color: '#7c3aed' }}>2K</h4>
                    <span style={{ color: '#000' }}>Couples pared</span>
                  </div>
                </div>
              </li>

              <li>
                <div className="ab-cont-po">
                  <i className="fa fa-users" aria-hidden="true" />
                  <div>
                    <h4 style={{ color: '#7c3aed' }}>4000+</h4>
                    <span style={{ color: '#000' }}>Registerents</span>
                  </div>
                </div>
              </li>

              <li>
                <div className="ab-cont-po">
                  <i className="fa fa-male" aria-hidden="true" />
                  <div>
                    <h4 style={{ color: '#7c3aed' }}>1600+</h4>
                    <span style={{ color: '#000' }}>Mens</span>
                  </div>
                </div>
              </li>

              <li>
                <div className="ab-cont-po">
                  <i className="fa fa-female" aria-hidden="true" />
                  <div>
                    <h4 style={{ color: '#7c3aed' }}>2000+</h4>
                    <span style={{ color: '#000' }}>Womens</span>
                  </div>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
