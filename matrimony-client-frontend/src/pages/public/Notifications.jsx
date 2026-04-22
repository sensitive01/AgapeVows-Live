import React, {useState} from 'react';
import { FaCog, FaCheckCircle, FaChevronRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import Sidebar from '../../components/layout/Sidebar';

const Notifications = () => {
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
                  }}
                  >
                    <FaCog className="rj-icon rj-settings" />
                  </a>
                  <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
                  {/* Settings Content */}
                  <div className="jobplugin__settings-content"> 
                    {/* Settings Content Head */}
                    <div className="jobplugin__settings-head">
                      <strong className="jobplugin__settings-card__subtitle text-large">Notifications</strong>
                      <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      <p>Notifications sent will display here</p>
                    </div>

                    {/* Settings Card */}
                    <div className="jobplugin__settings-card">
                      {/* Settings Card Head */}
                      <header className="jobplugin__settings-card__head">
                        <h3 className="h6">No Notifications</h3>
                        <a href="add-job-alerts.php" className="jobplugin__button jobplugin__bg-white jobplugin__border-primary small hover:jobplugin__bg-white">Unread All</a>
                      </header>
                      {/* Settings Card Body */}
                      <div className="jobplugin__settings-card__body">
                        <ul className="jobplugin__settings-card__infolist">
                          <li>
                            <p>No Notifications received</p>
                          </li>
                        </ul>
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

export default Notifications;