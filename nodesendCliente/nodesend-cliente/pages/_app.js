import React from 'react'
import AuthState from '@/context/auth/authState'
import AppState from '@/context/app/appState'

const MyApp = ({Component, pageProps}) => {
    // console.log('desde _app.js')
    return(
        <AuthState>
            <AppState>
            <Component {...pageProps}/>
            </AppState>
        </AuthState>
    )
}
export default MyApp