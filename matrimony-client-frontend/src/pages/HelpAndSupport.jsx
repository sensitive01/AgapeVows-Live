import React from 'react';
import LayoutComponent from "../components/layouts/LayoutComponent";
import Footer from "../components/Footer";
import CommonBanner from "../components/CommonBanner";

const HelpAndSupport = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="fixed top-0 left-0 right-0 z-50">
                <LayoutComponent />
            </div>

            <div className="pt-20">
                <CommonBanner 
                    title="Help & Support" 
                    subtitle="We are here to help you with any questions or issues."
                />

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