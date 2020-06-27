export function token_getter() {
    if ((localStorage.getItem('token') !== null)) {
        return JSON.parse(localStorage.getItem('token'));
    }
}
