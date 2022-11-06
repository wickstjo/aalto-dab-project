import http from 'k6/http';

// RUNTIME CONFIG
export const options = {
    vus: 30,
    duration: '120s',
    summaryTrendStats: ['min', 'max', 'avg', 'med', 'p(95)', 'p(99)'],
};

// TEST
export default () => {
    // const url = 'http://localhost:3000'
    // const url = 'http://localhost:3000/#/random'
    const url = 'http://localhost:3000/#/emK3T'
    const result = http.get(url)
}