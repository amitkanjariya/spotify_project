import React from 'react';

const Temp = () => {
  return (
    <div className="container">
      <style>{`
        body {
          margin: 0px;
          padding: 0px;
          background: #EE6352;
        }
        .container {
          width: 300px;
          height: 500px;
          position: relative;
          top: 66px;
          left: 10%;
          background-image: url(image.jpg);
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0px 6px 24px rgba(0, 0, 0, 0.8);
        }
        .container:before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0px;
          background: rgba(0, 0, 0, 0.8);
        }
        .container .image {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          display: flex;
        }
        .container .image span {
          width: 25%;
          height: 100%;
          background-image: url(image.jpg);
          transition: .6s ease-in-out;
        }
        .container .image span:nth-child(1) {
          background-position: 0;
          transition-delay: 0s;
        }
        .container .image span:nth-child(2) {
          background-position: 33.33%;
          transition-delay: 0.1s;
        }
        .container .image span:nth-child(3) {
          background-position: 66.66%;
          transition-delay: 0.2s;
        }
        .container .image span:nth-child(4) {
          background-position: 99.99%;
          transition-delay: 0.3s;
        }
        .container:hover .image > span {
          transform: translateY(-100%);
        }
        .content {
          justify-content: center;
          align-items: center;
          display: flex;
          color: white;
          width: 100%;
          height: 100%;
          font-family: sans-serif;
          transform: translateY(100%);
        }
        .container:hover .content {
          transform: translateY(0%);
          transition: 1s;
          transition-delay: 0.1s;
        }
      `}</style>
      <div className="image">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="content">
        <h3>Split Image On Hover</h3>
      </div>
    </div>
  );
};

export default Temp;
