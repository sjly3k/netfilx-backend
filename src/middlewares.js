export const isAuthenticated = (request) => {
    if (request.user) {
        return true
    } else {
        throw Error('You need to login to perform this action.')
        return false
    }
}