import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Login from '../Auth/Login';

function Navbar() {

  useEffect(() => {
    const id=localStorage.getItem('userid');
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="bg-primary text-white py-4 shadow-md transition-all duration-300 p-3 sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <div 
            className="text-2xl font-bold cursor-pointer hover:text-accent transition-all duration-300" 
            onClick={() => navigate('/')}
          >
            HomeBazaar
          </div>
          <div className="space-x-4">
            
            {localStorage.getItem('userid') ? (
              <>
              <span 
                className="hover:text-accent cursor-pointer transition-all duration-300" 
                onClick={() => navigate('/myspace')}
              >
                My Space
              </span>
              <span 
                className="hover:text-accent cursor-pointer transition-all duration-300" 
                onClick={() => {
                  localStorage.removeItem('userid');
                  localStorage.removeItem('token');
                  navigate('/');
                }}
              >
                Logout
              </span>
              </>
            ) : (
              <>
              <span 
                className="hover:text-accent cursor-pointer transition-all duration-300" 
                onClick={handleLoginClick}
              >
                Login
              </span>
              </>
            )}
          </div>
        </div>
      </nav>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Login isTrue={true} />
      </Modal>
    </>
  );
}

export default Navbar;
