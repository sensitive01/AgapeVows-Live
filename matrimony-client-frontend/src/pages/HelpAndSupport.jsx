import React from 'react';
import LayoutComponent from "../components/layouts/LayoutComponent";
import Footer from "../components/Footer";

const HelpAndSupport = () => {
    return (
        <div className="min-h-screen">
            <div className="fixed top-0 left-0 right-0 z-50">
                <LayoutComponent />
            </div>

            <div className="pt-16">
                <div className="str">
                    <div className="ban-inn ab-ban">
                        <div className="container">
                            <div className="row">
                                <div className="hom-ban">
                                    <div className="ban-tit">
                                        <span>
                                            <i className="no1">#1</i> Wedding Website
                                        </span>
                                        <h1>Help & Support</h1>
                                        <p>
                                            We are here to help you with any questions or issues.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <section>
                    <div className="container py-10 min-h-[400px]">
                        <div className="row">
                            <div className="col-md-12">
                                {/* Add your Help & Support content here */}
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            <Footer />
        </div>
    )
}

export default HelpAndSupport;