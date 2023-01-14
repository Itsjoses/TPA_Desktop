import React from 'react'
import Navbar from '../navbar'
import '../index.css'

const Home = () => {
  return (
    <div>
      <div className="container flex flex-row">
        <Navbar/>
          <div className="ml-[270px]">
              <div className="min-h-screen min-w-full flex items-center">
                  <h1 className='text-7xl mx-auto'>Welcome to Stuck in the Movie</h1>
              </div>
          </div>
      </div>
        
    </div>
  )
}

export default Home
