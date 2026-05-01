import React, { useState, useEffect } from 'react'

const Dashboard = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All')

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleFilterChange = (e) => {
    setSelectedRegion(e.target.value)
  }

  const searchFilter = countries
    .filter((c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase())
    )
    .filter((c) =>
      selectedRegion === "All" ? true : c.region === selectedRegion
    );

  const uniqueRegions = [...new Set(countries.map(country => country.region))].sort()

  useEffect(() => {

    const fetchCountry = async () => {
      const url="https://restcountries.com/v3.1/all?fields=name,region,flags,population,capital";
      const response = await fetch(url)
      const data = await response.json()
      setCountries(data)
    }
    fetchCountry();

  }, [])
  return (
    <>

      <div className="w-full pb-4">
        <div className="heading">
          <h1 className="text-center font-semibold text-[32px] py-4 rounded-lg bg-blue-400 text-white">
            Global Explorer Dashboard
            </h1>
        </div>

        <div className="flex justify-between items-center px-4 flex-col md:flex-row">
          <div className="mt-8 px-2">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <input
                type="search"
                placeholder="Search countries..."
                className=" pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>


          <div className="countryOption">
            <div className="mt-8 px-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                value={selectedRegion}
                onChange={handleFilterChange}
              >
                <option value="All">All Regions</option>
                {uniqueRegions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>
        </div>


        <div className="countryDetail mt-10 px-4 bg-gray-200 pt-5 rounded-lg">
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
            {
              searchFilter.map((country) => (
                <div className='card flex flex-col justify-center items-center border border-gray-200 py-6 rounded-lg shadow-sm bg-white hover:shadow-lg transition-all duration-300 ease-in-out hover:translate-y-[-10px] hover:bg-blue-100 cursor-pointer'  key={country.cca3}>
                  <div className='w-48 h-32 rounded-lg shadow-md bg-gray-50 flex items-center justify-center'>
                    <img src={country.flags.png} alt={country.name.common} className="w-full h-full object-contain" />
                  </div>
                  <h2 className='text-xl font-bold mt-4 text-gray-800 text-center'>{country.name.common}</h2>
                  <div className='mt-3 space-y-1 text-sm text-gray-600'>
                    <p className='flex items-center gap-2'>
                      <span className='font-medium text-gray-500'>Population:</span>
                      <span>{country.population.toLocaleString("en-IN")}</span>
                    </p>
                    <p className='flex items-center gap-2'>
                      <span className='font-medium text-gray-500'>Region:</span>
                      <span>{country.region}</span>
                    </p>
                    <p className='flex items-center gap-2'>
                      <span className='font-medium text-gray-500'>Capital:</span>
                      <span>{country.capital}</span>
                    </p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;