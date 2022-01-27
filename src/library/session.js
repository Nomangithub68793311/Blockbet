const session = {
    token: String,
    expiration: String,
    user: {
        first_name: String,
        last_name: String,
        email: String,
        username: String,
        type: String,
        is_active: Boolean
    }
}

export const getSession = () => {
    const sessionString = localStorage.getItem(session)
    return JSON.parse(sessionString)
}

export const setSession = (session) => {
    localStorage.setItem('session', JSON.stringify(session))
}

export const getUser = () => {
    const session = getFormattedSession()
    return session?.user
}

export const getToken = () => {
    const session = getFormattedSession()
    return session?.token
}

export const checkClientLoggedIn = () => {
    const user = getUser()
    return user?.type === 'client'
}

export const logout = () => {
    localStorage.clear()
    return true
}

const getFormattedSession = () => {
    const session = localStorage.getItem('session')
    return JSON.parse(session)
}
