
import React from 'react'
import AuthState from "@/context/auth/authState";
import Layout from '@/components/Layout';


const MyApp = ({Component, pageProps}) => {
    console.log('desde app.js')
    return(
        <Layout>
                <AuthState>
                <Component {...pageProps} />
                </AuthState>
        </Layout>
     
    )
}
export default MyApp