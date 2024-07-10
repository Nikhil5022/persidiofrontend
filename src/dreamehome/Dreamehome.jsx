import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../Modal";

export default function DreamHome() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: [0, Infinity],
    minBedrooms: 0,
    minBathrooms: 0,
    amenities: [],
    propertyType: "",
    minYearBuilt: 0,
    furnishedStatus: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get("https://presidioserver.vercel.app/allproperties")
      .then((res) => {
        setProperties(res.data);
        setFilteredProperties(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, currentPage]);

  const applyFilters = () => {
    const filtered = properties.filter(property => {
      const meetsPriceRange = (filters.priceRange[0] === 0 && filters.priceRange[1] === Infinity) || (property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]);
      const meetsBedrooms = filters.minBedrooms === 0 || property.bedrooms >= filters.minBedrooms;
      const meetsBathrooms = filters.minBathrooms === 0 || property.bathrooms >= filters.minBathrooms;
      const meetsAmenities = filters.amenities.length === 0 || filters.amenities.every(amenity => property.amenities.includes(amenity));
      const meetsPropertyType = !filters.propertyType || property.propertyType === filters.propertyType;
      const meetsYearBuilt = filters.minYearBuilt === 0 || property.yearBuilt >= filters.minYearBuilt;
      const meetsFurnishedStatus = !filters.furnishedStatus || property.furnishedStatus === filters.furnishedStatus;
      return meetsPriceRange && meetsBedrooms && meetsBathrooms && meetsAmenities && meetsPropertyType && meetsYearBuilt && meetsFurnishedStatus;
    });
    setFilteredProperties(filtered);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === "") {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(
        properties.filter((property) =>
          property.place.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
    setCurrentPage(1);
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  const handleFilterChange = (filter, value) => {
    setFilters({
      ...filters,
      [filter]: value
    });
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLikeClick = (e, propertyId) => {
    console.log("Like clicked", propertyId);
    e.stopPropagation();
    axios
      .post(`https://presidioserver.vercel.app/likeProperty/${propertyId}`)
      .then((res) => {
        
        setProperties(res.data);
        applyFilters();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const paginatedProperties = filteredProperties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Dream Home Listings
      </h2>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 p-4">
          <input
            type="text"
            placeholder="Search by place"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="mb-6">
            <label htmlFor="priceRange" className="block mb-2">
              Price Range:
            </label>
            <div className="flex">
              <input
                type="number"
                id="minPrice"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) => handleFilterChange("priceRange", [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="mx-2">to</span>
              <input
                type="number"
                id="maxPrice"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange("priceRange", [filters.priceRange[0], parseInt(e.target.value) || Infinity])}
                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="minBedrooms" className="block mb-2">
              Min Bedrooms:
            </label>
            <input
              type="number"
              id="minBedrooms"
              value={filters.minBedrooms}
              onChange={(e) => handleFilterChange("minBedrooms", parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="minBathrooms" className="block mb-2">
              Min Bathrooms:
            </label>
            <input
              type="number"
              id="minBathrooms"
              value={filters.minBathrooms}
              onChange={(e) => handleFilterChange("minBathrooms", parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="propertyType" className="block mb-2">
              Property Type:
            </label>
            <select
              id="propertyType"
              value={filters.propertyType}
              onChange={(e) => handleFilterChange("propertyType", e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Any</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="minYearBuilt" className="block mb-2">
              Min Year Built:
            </label>
            <input
              type="number"
              id="minYearBuilt"
              value={filters.minYearBuilt}
              onChange={(e) => handleFilterChange("minYearBuilt", parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="furnishedStatus" className="block mb-2">
              Furnished Status:
            </label>
            <select
              id="furnishedStatus"
              value={filters.furnishedStatus}
              onChange={(e) => handleFilterChange("furnishedStatus", e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Any</option>
              <option value="Furnished">Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
              <option value="Semifurnished">Semi-Furnished</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block mb-2">Amenities:</label>
            <div className="flex flex-wrap">
              {["Pool", "Gym", "Parking", "Garden"].map((amenity, index) => (
                <label key={index} className="mr-4 mb-2">
                  <input
                    type="checkbox"
                    value={amenity}
                    checked={filters.amenities.includes(amenity)}
                    onChange={(e) => {
                      const selectedAmenities = [...filters.amenities];
                      if (e.target.checked) {
                        selectedAmenities.push(amenity);
                      } else {
                        const index = selectedAmenities.indexOf(amenity);
                        if (index > -1) {
                          selectedAmenities.splice(index, 1);
                        }
                      }
                      handleFilterChange("amenities", selectedAmenities);
                    }}
                    className="mr-2"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="w-3/4 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {paginatedProperties.map((property) => (
              <div
                key={property._id}
                className="bg-white shadow-md rounded-lg cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => handlePropertyClick(property)}
              >
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    {property.place}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Bedrooms: {property.bedrooms}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Bathrooms: {property.bathrooms}
                  </p>
                  <p className="text-gray-600 mb-4">Price: ${property.price}</p>
                  <div className="flex flex-wrap">
                    {property.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs mr-2 mb-2"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 mt-4">
                    Likes: {property.likes}
                  </p>
                  
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-red-600 transition duration-200"
                    onClick={(e) => handleLikeClick(e, property._id)}
                  >
                    Like
                  </button>

                </div>
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
      </div>
      {selectedProperty && (
        <Modal isOpen={!!selectedProperty} onClose={handleCloseModal}>
          <div className="p-4">
            <h3 className="text-2xl font-bold mb-4">
              {selectedProperty.place}
            </h3>
            <p className="text-gray-600 mb-2">
              Area: {selectedProperty.area} sq ft
            </p>
            <p className="text-gray-600 mb-2">
              Price: ${selectedProperty.price}
            </p>
            <p className="text-gray-600 mb-2">
              Bedrooms: {selectedProperty.bedrooms}
            </p>
            <p className="text-gray-600 mb-2">
              Bathrooms: {selectedProperty.bathrooms}
            </p>
            <div className="flex flex-wrap mb-4">
              {selectedProperty.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs mr-2 mb-2"
                >
                  {amenity}
                </span>
              ))}
            </div>
            <p className="text-gray-600 mb-2">
              Property Type: {selectedProperty.propertyType}
            </p>
            <p className="text-gray-600 mb-2">
              Description: {selectedProperty.description}
            </p>
            <p className="text-gray-600 mb-2">
              Year Built: {selectedProperty.yearBuilt}
            </p>
            <p className="text-gray-600 mb-2">
              Total Floors: {selectedProperty.totalFloors}
            </p>
            <p className="text-gray-600 mb-2">
              Furnished Status: {selectedProperty.furnishedStatus}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
