import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetch_page } from './api'

const Goto = () => {

    // READ URL PARAMS
    const params = useParams()

    // ON LOAD.. CHECK DB IF PARAM EXISTS
    useEffect(() => {

        // PERFORM REQUEST
        fetch_page(params.short_url).then(result => {

            // SUCCESS
            if (result) {
                window.location = result
            
            // ERROR
            } else { console.log('FETCH REQUEST FAILED') }
        })
    }, [])

    return (
        <div id={ 'wrapper' }>
            <div id={ 'container' }>Shortcut not found</div>
        </div>
    )
}

export default Goto;