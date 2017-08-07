import fetch from 'request'

export function logout() {
    return fetch('/mes/v1/user/logout', {}, { method: 'get' })
}


export function login(login_name, passwd) {
    return fetch('/mes/v1/user/login', {
        username: login_name,
        password: passwd
    })
}

