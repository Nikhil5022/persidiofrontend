import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdatePropertyForm from './UpdatePropertyForm';

export default function Myspace() {
  const [userid, setUserid] = useState(localStorage.getItem("userid"));
  const [properties, setProperties] = useState([]);
  const [userData, setUserData] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (userid) {
      axios.get(`https://presidioserver.vercel.app/getUser/${userid}`).then((res) => {
        console.log(res.data);
        setUserData(res.data);
      }).catch((err) => {
        console.error(err);
      });

      axios.get(`https://presidioserver.vercel.app/getUserProperties/${userid}`)
        .then((res) => {
          console.log(res.data);
          setProperties(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [userid]);

  const handleDelete = (propertyId) => {
    axios.delete(`https://presidioserver.vercel.app/deleteProperty/${propertyId}`)
      .then((res) => {
        console.log(res.data);
        setProperties(properties.filter(property => property._id !== propertyId));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdate = (updatedProperty) => {
    setProperties(properties.map(property => 
      property._id === updatedProperty._id ? updatedProperty : property
    ));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedProperties = properties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  return (
    <div className="container mx-auto p-6">
      {userData && (
        <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">My Profile</h1>
          <p className="text-gray-600 mb-2"><strong>First Name:</strong> {userData.firstName}</p>
          <p className="text-gray-600 mb-2"><strong>Last Name:</strong> {userData.lastName}</p>
          <p className="text-gray-600 mb-2"><strong>Email:</strong> {userData.email}</p>
          <p className="text-gray-600 mb-2"><strong>Phone Number:</strong> {userData.phoneNumber}</p>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Properties</h1>
      {properties.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProperties.map((property) => (
              <div key={property._id} className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-bold mb-2">{property.place}</h2>
                <p className="text-gray-600 mb-2">Price: ${property.price}</p>
                <p className="text-gray-600 mb-2">Bedrooms: {property.bedrooms}</p>
                <p className="text-gray-600 mb-2">Bathrooms: {property.bathrooms}</p>
                <p className="text-gray-600 mb-2">Area: {property.area} sq ft</p>
                <div className="flex flex-wrap mb-2">
                  {property.amenities.map((amenity, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs mr-2 mb-2">
                      {amenity}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => handleDelete(property._id)} 
                  className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
                <button 
                  onClick={() => setSelectedProperty(property)} 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition duration-200 ml-2"
                >
                  Update
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 mx-2 ${
                  currentPage === i + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-2 bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No properties found</p>
      )}
      {selectedProperty && (
        <UpdatePropertyForm
          property={selectedProperty}
          onUpdate={handleUpdate}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}
