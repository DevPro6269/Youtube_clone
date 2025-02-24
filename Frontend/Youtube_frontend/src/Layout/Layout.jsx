import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
const Layout = () => {

  const [searchQuery, setSearchQuery] = useState('');

  // Function to update search query
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
    <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
    <div className='flex justify-end  max-h-screen overflow-hidden' >
     <Sidebar/>
     <Outlet context={{ searchQuery }} /> {/* Pass searchQuery to child components */}
    </div>
    </>
  )
}

export default Layout