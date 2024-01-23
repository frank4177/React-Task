import React from 'react'

const MainContainer = ({children}) => {
  return (
    <div className='w-full max-w-[100rem] mx-auto px-[10%] py-5 h-[inherit]'>
        {children}
    </div>
  )
}

export default MainContainer