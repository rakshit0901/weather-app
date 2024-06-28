import React from 'react';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';

const SocialMediaButtons = ({ data, shareOnSocialMedia }) => {
  return (
    <div className="social-media">
      <button onClick={() => shareOnSocialMedia('twitter')}>
        <FaTwitter /> 
      </button>
      <button onClick={() => shareOnSocialMedia('facebook')}>
        <FaFacebook /> 
      </button>
      <button onClick={() => shareOnSocialMedia('linkedin')}>
        <FaLinkedin /> 
      </button>
    </div>
  );
};

export default SocialMediaButtons;
