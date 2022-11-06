import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { create_shortcut } from './api'

const Create = () => {

    // INPUT DATA
    const [input, set_input] = useState('')
    const [added, set_added] = useState({
        active: false,
        shorthand: '',
        url: ''
    })

    const FRONTEND_PORT = 3002;

    const navigate = useNavigate();

    // CREATE NEW SHORTCUT URL
    const create = async () => {
        console.log('create trigger')

        if (input.length > 0) {

            // PERFORM REQUEST
            const result = await create_shortcut(input)

            // SUCCESS
            if (result) {
                set_input('')

                set_added({
                    active: true,
                    shorthand: result.shortcut,
                    url: `http://localhost:${ FRONTEND_PORT }/#/${ result.shortcut }`
                })
            
            // ERROR
            } else { console.log('RANDOM REQUEST FAILED') }
        }
    }
    
    return (
        <div id={ 'wrapper' }>
            <div id={ 'container' }>
                <input
                    type={ 'text' }
                    value={ input }
                    placeholder={ 'Enter the URL you want to shorten' }
                    onChange={ event => set_input(event.target.value) }
                />
                <div id={ 'buttons' }>
                    <input
                        type={ 'submit' }
                        value={ 'CREATE SHORTCUT' }
                        onClick={ () => create() }
                    />
                    <input
                        type={ 'submit' }
                        value={ 'RANDOM PAGE' }
                        onClick={ () => navigate('/random') }
                    />
                </div>
            </div>
            { added.active &&
                <div id={ 'added' }>
                    <Link to={ added.shorthand } target={ '_blank' } rel={ 'noopener noreferrer' }>
                        { added.url }
                    </Link>
                </div>
            }
        </div>
    )
}

export default Create;