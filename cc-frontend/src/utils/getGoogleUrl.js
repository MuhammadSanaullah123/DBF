export const getGoogleOAuthURL = () => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'

    const options = {
        redirect_uri: 'http://localhost:6002/user/sessions/oauth/google',
        client_id: '544075437857-3m72ku4mvruqpvnpkg31d7g7mf4ajdp0.apps.googleusercontent.com',
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ].join(" ")
    }

    console.log({options})

    const qs = new URLSearchParams(options)

    console.log(qs.toString())

    return `${rootUrl}?${qs.toString()}`
}