import React from 'react'
import assets from '../assets/assets';

const RightWhenUserNotSelected = () => {
  return (
    <div className="right">
      <img src={`${assets.logo_big}`} alt="logo" className="right-logo" />
      <h2 className="right-desc">Chat anytime, anywhere</h2>
    </div>
  );
}

export default RightWhenUserNotSelected
