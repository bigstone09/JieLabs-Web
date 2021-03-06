import { BACKEND } from './config';

async function parseResp(resp) {
    if (resp.status === 403)
        window.location.href = "/";
    if (resp.status >= 400)
        throw {
            code: resp.code,
            msg: await resp.text(),
        };
    return await resp.json();
}

export async function get(endpoint, method = "GET") {
    const resp = await fetch(BACKEND + endpoint, {
        method,
        credentials: 'include',
    });

    return await parseResp(resp);
}

export async function getLines(endpoint, method = "GET") {
    const resp = await fetch(BACKEND + endpoint, {
        method,
        credentials: 'include',
    });

    if (resp.code >= 400)
        throw {
            code: resp.code,
            msg: resp.text(),
        };
    return (await resp.text()).split("\n");
}

export async function post(endpoint, data, method = "POST") {
    const resp = await fetch(BACKEND + endpoint, {
        method,
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return await parseResp(resp);
}

export async function put(endpoint, data, method = "PUT") {
    const resp = await fetch(BACKEND + endpoint, {
        method,
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return await parseResp(resp);
}

export async function delete_(endpoint, method = "DELETE") {
    const resp = await fetch(BACKEND + endpoint, {
        method,
        credentials: 'include',
    });

    return await parseResp(resp);
}