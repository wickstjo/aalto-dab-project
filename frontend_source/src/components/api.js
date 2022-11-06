import axios from 'axios'

// READ BACKEND PREFIX FROM ENV
const base = 'http://localhost:4002'

// CREATE URL SHORTCUT
const create_shortcut = async (full_url) => {
    return axios.post(base + '/create', {
        url: full_url
    }).then(result => {

        // EXPECTED RESULT
        if (result.status === 201) {
            return result.data
        }

        // OTHERWISE..
        return false
    })
}

// FETCH SPECIFIC URL SHORTCUT
const fetch_page = async (shortcut) => {
    return axios.post(base + '/fetch', {
        shortcut: shortcut
    }).then(result => {
        console.log(result)
        
        // EXPECTED RESULT
        if (result.status === 200) {
            return result.data.full_url
        }

        // OTHERWISE..
        return false
    })
}

// FETCH RANDOM PAGE SHORTCUT
const random_page = async () => {
    return axios.get(base + '/random').then(result => {

        // REDIRECT TO URL
        if (result.status === 200) {
            return result.data.full_url
        }

        // OTHERWISE..
        return false
    })
}

export {
    create_shortcut,
    fetch_page,
    random_page,
}