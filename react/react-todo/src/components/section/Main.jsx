import React from 'react'

import Header from './Header'
import Footer from './Footer'
import Search from './Search'

const Main = (props) => {
    return (
        <div>
            <Header />
            <main id='main' role='main'>
                <Search />
                {props.children}
            </main>
            <Footer />
        </div>
    )
}

export default Main