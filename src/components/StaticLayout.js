import React from "react";
import * as Components from "../components/all";
import AppShareModal from "./Modal/AppShareModal";
import CallToAction from "./CallToAction";
import NewsletterModal from "./Modal/Newsletter";

export default function StaticLayout(props) {
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { children, page, newsletter } = props;
  const eventId = "encryptedEventId";
  const applicationUrl = "https://www.hoseacodes.com/";

  const handleCloseModal = () => {
    setShowShareModal(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("newsletterSignedUp", true);
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    const lastShown = localStorage.getItem("newsletterLastShown");
    const signedUp = localStorage.getItem("newsletterSignedUp");

    if (signedUp) return;

    const now = new Date().getTime();
    if (lastShown && now - lastShown < 7 * 24 * 60 * 60 * 1000) return;

    const timer = setTimeout(() => {
      setIsModalOpen(true);
      localStorage.setItem("newsletterLastShown", now);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#E2E2E2]">
      <div className="flex-1 flex flex-col items-stretch overflow-hidden">
        {page === "home" ? (
          <Components.Navbar white={false} />
        ) : (
          <Components.Navbar white={true} />
        )}
        {children}
        {showShareModal && (
          <AppShareModal
            forExampleStore={false}
            showShareModal={showShareModal}
            handleClose={handleCloseModal}
            eventId={eventId}
            applicationUrl={applicationUrl}
            title="Share This Content"
            description={`Building to achieve faster and secure deployment. 
		          Check out this amazing content!`}
            url="https://www.hoseacodes.com/"
            // message="Check out this amazing content at https://example.com"
            message={`Check out this application, ${applicationUrl} on HoseaCodes! Show your
              support by treating yourself to making a cash donation, and sharing this event to help get the word out.
              Any support is appreciated; thanks!"}`}
          />
        )}
        <CallToAction
          message="Share This App"
          handleToggle={() => setShowShareModal(!showShareModal)}
        />
        <NewsletterModal
          isOpen={isModalOpen}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
        <Components.Footer hideNewsletter={newsletter} />
      </div>
    </div>
  );
}
