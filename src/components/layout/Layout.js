import React from 'react'
import Footer from './Footer'
import Loader from './Loader'
import Navbar from './Navbar'

const Layout = (props) => {
    return (
        <div>

            {props.loading && (<Loader/>)}

            <Navbar />
            <div className='content'>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout
