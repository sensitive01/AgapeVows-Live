import React, {useState} from 'react';
import { FaCog, FaEllipsisH, FaSearch } from 'react-icons/fa';
import Sidebar from '../../components/layout/Sidebar';

const ReferAndEarn = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  }
  return (
    <>
      {/* Sub Visual of the page */}
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 text-white"></div>
      
      {/* Main content with grid layout */}
      <main className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
                <div className="jobplugin__settings">
                  {/* Settings Nav Opener */}
                  <a href="#" className="jobplugin__settings-opener jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSidebar();
                  }}>
                    <FaCog className="rj-icon rj-settings" />
                  </a>
                  <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
                  {/* Settings Content */}
                  <div className="jobplugin__settings-content">
                    {/* Settings Card 1 */}
                    <div className="jobplugin__settings-card">
                      <div className="jobplugin__settings-card__body shadow">
                        {/* Invitation List */}
                        <ul className="jobplugin__settings-card__infolist invitation-list">
                          <li>
                            <span className="invitation-list__title">Refer Anyone and get discount in Premium Subscription</span>
                            <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                              <span className="rj-icon rj-edit-text"></span>
                            </a>
                          </li>
                          <li>
                            <span className="invitation-list__title"><strong>Owner:</strong> Thomas Walkar (Me)</span>
                            <a href="#" className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary small">Invite New User</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Settings Card 2 */}
                    <div className="jobplugin__settings-card">
                      <div className="jobplugin__settings-card__body shadow">
                        {/* Settings Card Tabset */}
                        <div className="jobplugin__tabset-normal">
                          <ul data-tabset="tabset">
                            <li className="active"><a className="hover:jobplugin__text-primary hover:jobplugin__border-primary" data-tabset="tabset-link" href="refer-us">Referred Users</a></li>
                            <li><a className="hover:jobplugin__text-primary hover:jobplugin__border-primary" data-tabset="tabset-link" href="refer-us">Invitations</a></li>
                          </ul>
                        </div>
                        
                        <div className="jobplugin__tabsholder">
                          <div id="tab-active-members" className="jobplugin__tabscontent active">
                            {/* Settings Filters Search */}
                            <div className="jobplugin__filters-search">
                              <span className="jobplugin__filters-search__icon">
                                <FaSearch />
                              </span>
                              <input className="jobplugin__filters-search__input" type="search" placeholder="Search by Name" />
                              <button type="button" className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary">Filters</button>
                            </div>
                            
                            {/* Members List */}
                            <ul className="jobplugin__mebmers-list">
                              <li className="jobplugin__mebmers-list__head">
                                <div className="jobplugin__mebmers-list__col">
                                  <label className="jobplugin__form-checkbox">
                                    <input type="checkbox" />
                                    <span className="jobplugin__form-checkbox__btn"></span>
                                  </label>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  &nbsp;
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <strong className="jobplugin__mebmers-list__subtitle">User Details</strong>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <strong className="jobplugin__mebmers-list__subtitle">Permission</strong>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  &nbsp;
                                </div>
                              </li>
                              
                              {/* Member Item 1 */}
                              <li>
                                <div className="jobplugin__mebmers-list__col">
                                  <label className="jobplugin__form-checkbox">
                                    <input type="checkbox" />
                                    <span className="jobplugin__form-checkbox__btn"></span>
                                  </label>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <div className="jobplugin__mebmers-list__avatar">
                                    <img src="images/img-avatar.png" alt="User Avatar" />
                                  </div>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <strong className="jobplugin__mebmers-list__subtitle">Elmenor Robin</strong>
                                  <p>fffgasdaasd asdsdas</p>
                                  <p><strong>Team:</strong> Thomas Walkar</p>
                                  <p><strong>Contract Persn:</strong> Thomas Walkar</p>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <p>On Contract</p>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                                    <FaEllipsisH className="rj-icon rj-dots" />
                                  </a>
                                </div>
                              </li>
                              
                              {/* Member Item 2 */}
                              <li>
                                <div className="jobplugin__mebmers-list__col">
                                  <label className="jobplugin__form-checkbox">
                                    <input type="checkbox" />
                                    <span className="jobplugin__form-checkbox__btn"></span>
                                  </label>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <div className="jobplugin__mebmers-list__avatar">
                                    <img src="images/img-avatar.png" alt="User Avatar" />
                                  </div>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <strong className="jobplugin__mebmers-list__subtitle">Elmenor Robin</strong>
                                  <p>fffgasdaasd asdsdas</p>
                                  <p><strong>Team:</strong> Thomas Walkar</p>
                                  <p><strong>Contract Persn:</strong> Thomas Walkar</p>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <p>On Contract</p>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                                    <FaEllipsisH className="rj-icon rj-dots" />
                                  </a>
                                </div>
                              </li>
                            </ul>
                          </div>
                          
                          <div id="tab-invitations" className="jobplugin__tabscontent">
                            {/* Settings Filters Search */}
                            <div className="jobplugin__filters-search">
                              <span className="jobplugin__filters-search__icon">
                                <FaSearch />
                              </span>
                              <input className="jobplugin__filters-search__input" type="search" placeholder="Search by Name" />
                              <button type="button" className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary">Filters</button>
                            </div>
                            
                            {/* Members List */}
                            <ul className="jobplugin__mebmers-list">
                              <li className="jobplugin__mebmers-list__head">
                                <div className="jobplugin__mebmers-list__col">
                                  <label className="jobplugin__form-checkbox">
                                    <input type="checkbox" />
                                    <span className="jobplugin__form-checkbox__btn"></span>
                                  </label>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  &nbsp;
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <strong className="jobplugin__mebmers-list__subtitle">User Details</strong>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <strong className="jobplugin__mebmers-list__subtitle">Permission</strong>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  &nbsp;
                                </div>
                              </li>
                              
                              {/* Member Item 1 */}
                              <li>
                                <div className="jobplugin__mebmers-list__col">
                                  <label className="jobplugin__form-checkbox">
                                    <input type="checkbox" />
                                    <span className="jobplugin__form-checkbox__btn"></span>
                                  </label>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <div className="jobplugin__mebmers-list__avatar">
                                    <img src="images/img-avatar.png" alt="User Avatar" />
                                  </div>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <strong className="jobplugin__mebmers-list__subtitle">Elmenor Robin</strong>
                                  <p>fffgasdaasd asdsdas</p>
                                  <p><strong>Team:</strong> Thomas Walkar</p>
                                  <p><strong>Contract Persn:</strong> Thomas Walkar</p>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <p>On Contract</p>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                                    <FaEllipsisH className="rj-icon rj-dots" />
                                  </a>
                                </div>
                              </li>
                              
                              {/* Member Item 2 */}
                              <li>
                                <div className="jobplugin__mebmers-list__col">
                                  <label className="jobplugin__form-checkbox">
                                    <input type="checkbox" />
                                    <span className="jobplugin__form-checkbox__btn"></span>
                                  </label>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <div className="jobplugin__mebmers-list__avatar">
                                    <img src="images/img-avatar.png" alt="User Avatar" />
                                  </div>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <strong className="jobplugin__mebmers-list__subtitle">Elmenor Robin</strong>
                                  <p>fffgasdaasd asdsdas</p>
                                  <p><strong>Team:</strong> Thomas Walkar</p>
                                  <p><strong>Contract Persn:</strong> Thomas Walkar</p>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <p>On Contract</p>
                                </div>
                                <div className="jobplugin__mebmers-list__col">
                                  <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                                    <FaEllipsisH className="rj-icon rj-dots" />
                                  </a>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
             
            
          </div>
        </div>
      </main>
    </>
  );
};

export default ReferAndEarn;