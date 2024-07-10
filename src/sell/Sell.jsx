import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sell() {
  const navigator = useNavigate();
  const[userid,setUserid]=useState(localStorage.getItem("userid"));
  useEffect(() => {
    
    setFormData({...formData,seller:userid});
  }, []);

  const [formData, setFormData] = useState({
    place: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    hospitals: '',
    colleges: '',
    parking: '',
    propertyType: '',
    description: '',
    price: '',
    yearBuilt: '',
    totalFloors: '',
    amenities: [],
    furnishedStatus: '',
    seller:"userid"
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        amenities: checked
          ? [...prevState.amenities, value]
          : prevState.amenities.filter((amenity) => amenity !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    axios.post('https://presidioserver.vercel.app/property', formData).then((res) => {
      console.log(res.data);
      alert('Property added successfully');
      navigator('/')
    }).catch((err) => {
      console.error(err);
    });
  };
  if(!userid){
    return <h1 className='h-screen flex justify-center items-center text-xl font-bold'>Please Login First</h1>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 m-5 shadow-lg rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Sell Your Property</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="place" className="block text-gray-700 font-semibold">Place</label>
          <input
            type="text"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="area" className="block text-gray-700 font-semibold">Area (in sq ft)</label>
          <input
            type="number"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="bedrooms" className="block text-gray-700 font-semibold">Number of Bedrooms</label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="bathrooms" className="block text-gray-700 font-semibold">Number of Bathrooms</label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="hospitals" className="block text-gray-700 font-semibold">Nearby Hospitals</label>
          <input
            type="text"
            id="hospitals"
            name="hospitals"
            value={formData.hospitals}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="colleges" className="block text-gray-700 font-semibold">Nearby Colleges</label>
          <input
            type="text"
            id="colleges"
            name="colleges"
            value={formData.colleges}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="parking" className="block text-gray-700 font-semibold">Parking</label>
          <select
            id="parking"
            name="parking"
            value={formData.parking}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label htmlFor="propertyType" className="block text-gray-700 font-semibold">Property Type</label>
          <select
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block text-gray-700 font-semibold">Property Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="yearBuilt" className="block text-gray-700 font-semibold">Year Built</label>
          <input
            type="number"
            id="yearBuilt"
            name="yearBuilt"
            value={formData.yearBuilt}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="totalFloors" className="block text-gray-700 font-semibold">Total Floors</label>
          <input
            type="number"
            id="totalFloors"
            name="totalFloors"
            value={formData.totalFloors}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="amenities" className="block text-gray-700 font-semibold">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {['Gym', 'Pool', 'Playground'].map((amenity) => (
              <label key={amenity} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="amenities"
                  value={amenity}
                  checked={formData.amenities.includes(amenity)}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-primary"
                />
                <span className="ml-2 text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="furnishedStatus" className="block text-gray-700 font-semibold">Furnished Status</label>
          <select
            id="furnishedStatus"
            name="furnishedStatus"
            value={formData.furnishedStatus}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select</option>
            <option value="Furnished">Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
          </select>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label htmlFor="description" className="block text-gray-700 font-semibold">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows="4"
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary transition-colors duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
