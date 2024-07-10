import React, { useEffect } from "react";
import "./Landingpage.css";
import Modal from "../../Modal";
import Login from "../../Auth/Login";
import { useNavigate } from "react-router-dom";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";

function Landingpage() {
    const navigator = useNavigate();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isLogin, setIsLogin] = React.useState(false);
    const handleSignupClick = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLogin(true);
        }

    }, []);

  return (
    <div className="min-h-screen">
      <section className="hero-section bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 hero-title">
          Welcome to HomeBazaar
        </h1>
        <p className="text-lg md:text-xl">
          Your one-stop destination for buying and selling properties
        </p>
      </section>

      <section className="features-section bg-gray-100 py-20 text-center">
        <h2 className="text-3xl font-bold mb-8">Discover Our Features</h2>
        <div className="flex flex-wrap justify-center gap-8">
          
          <div className="feature-card bg-white p-8 rounded-lg shadow-md cursor-pointer"
            onClick={()=>navigator('/dreamhome')}
          >
            <h3 className="text-xl font-semibold mb-4">Find Your Dream Home</h3>
            <p className="text-gray-600">
              Search through a wide range of properties and find your perfect
              home.
            </p>
          </div>
          
          <div className="feature-card bg-white p-8 rounded-lg shadow-md cursor-default"
            onClick={()=>{
                if(!isLogin){
                   setIsModalOpen(true)
                }
                else{
                    navigator('/sell')
                }

            }}
          >
            <h3 className="text-xl font-semibold mb-4">Sell Your Property</h3>
            <p className="text-gray-600">
              List your property for sale and reach potential buyers quickly.
            </p>
          </div>
          
        </div>
      </section>

      
      <section className="testimonials-section bg-gray-200 py-20 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
        <div className="testimonial">
          <blockquote className="italic text-gray-600">
            "HomeBazaar helped me find the perfect house for my family. I highly
            recommend their services!"
          </blockquote>
          <p className="font-semibold mt-4">- John Doe</p>
        </div>
        
      </section>

      
      <section className="services-section bg-gray-100 py-20 text-center">
        <h2 className="text-3xl font-bold mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="service bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Property Listing</h3>
            <p className="text-gray-600">
              List your property for sale or rent with ease.
            </p>
          </div>
          
          <div className="service bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Property Search</h3>
            <p className="text-gray-600">
              Find your dream home by browsing through our vast listings.
            </p>
          </div>
          
          <div className="service bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Property Management</h3>
            <p className="text-gray-600">
              Efficiently manage your properties with our management tools.
            </p>
          </div>
          
        </div>
      </section>

      
      <section className="gallery-section bg-gray-200 py-20 text-center ">
        <h2 className="text-3xl font-bold mb-8">Explore Our Gallery</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-5">
          
          <div className="gallery-item">
            <img
              src={image1}
              alt="Gallery"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
          
          <div className="gallery-item">
            <img
              src={image2}
              alt="Gallery"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
          
          <div className="gallery-item">
            <img
              src={image3}
              alt="Gallery"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
          
        </div>
      </section>

      
      <section className="cta-section bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
        <p className="text-lg mb-4">
          Sign up now and start exploring the best properties in town!
        </p>
        <div
          className="inline-block bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 hover:text-blue-800 transition-colors cursor-pointer"
          onClick={handleSignupClick}
        >
          Sign Up
        </div>
        
        {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Login isTrue={false} />
            </Modal>
        )}
      </section>
    </div>
  );
}

export default Landingpage;
