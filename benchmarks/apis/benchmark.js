import http from 'k6/http';

// RUNTIME CONFIG
export const options = {
    vus: 30,
    duration: '120s',
    summaryTrendStats: ['min', 'max', 'avg', 'med', 'p(95)', 'p(99)'],
};

// WHICH BACKEND ENDPOINT TO BOMBARD
const PORT = 4002

// CREATE SHORTCUT
const create_shortcut = () => {

    const url = `http://localhost:${ PORT }/create`;

    const payload = JSON.stringify({
        url: 'https://www.youtube.com/'
    });

    const params = {
        headers: { 'Content-Type': 'application/json', },
    };

    return http.post(url, payload, params);
}

// FETCH RANDOM SHORTCUT -- REQUIRES DB RECORDS
const get_random = () => {
    const url = `http://localhost:${ PORT }/random`;
    return http.get(url);
}

// FETCH SPECIFIC SHORTCUT -- REQUIRES DB RECORDS
const fetch_shortcut = () => {

    const url = `http://localhost:${ PORT }/fetch`;

    const payload = JSON.stringify({
        shortcut: 'emK3T'
    });

    const params = {
        headers: { 'Content-Type': 'application/json', },
    };

    return http.post(url, payload, params);
}


// TEST
export default () => {
    const result = create_shortcut()
    // console.log(result)
}