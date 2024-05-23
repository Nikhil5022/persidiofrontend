import React from 'react';

function Footer() {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} HomeBazaar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
