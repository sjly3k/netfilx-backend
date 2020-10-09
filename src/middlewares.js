export const isAuthenticated = (request) => {
    console.log(request.user)
    if (request.user) {
        return true
    } else {
        throw Error('You need to login to perform this action.')
        return false
    }
}