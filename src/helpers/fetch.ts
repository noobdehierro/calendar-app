const baseUrl = process.env.REACT_APP_API_URL;

interface DataProps { email: string, password: string, name?: string }


const fetchSinToken = ({ endpoint, data, method = 'GET' }: { endpoint: string, data?: DataProps, method?: string }) => {

    const url = `${baseUrl}/${endpoint}`;

    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

const fetchConToken = ({endpoint, data, method = 'GET'}:{endpoint:string,data?:any,method?:string}) => {

    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    }
}



export {
    fetchSinToken,
    fetchConToken
}