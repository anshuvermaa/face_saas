import React from 'react'

type Props = {}

const Navbar = async () => {
  return (
    <div className="flex items-center p-4">
      {/* <MobileSidebar /> */} mobile side
      <div className="flex w-full justify-end">
        user profile
        {/* <UserButton afterSignOutUrl="/" /> */}
      </div>
    </div>
  )
}

export default Navbar