import React, { useEffect } from 'react'
import { random_page } from './api'

const RandomPage = () => {

    // ON LOAD, FETCH RANDOM PAGE & REDIRECT
    useEffect(() => {

        // PERFORM REQUEST
        random_page().then(result => {

            // SUCCESS
            if (result) {
                window.location = result

            // ERROR
            } else { console.log('RANDOM REQUEST FAILED') }
            })
    }, [])
    
    return (
        <div>No page shortcuts found.</div>
    )
}

export default RandomPage;