import React from 'react'
import Header from './Header';
import '../app/globals.css'
import Head from 'next/head';


const Layout = ({children}) => {
    return (  
      <>
         <Head >
        <title>ReactNodeSend</title>
        </Head> 
        {/* <body> */}
            <div className="bg-gray-100 min-h-screen">
              <div className="container mx-auto">
                <Header/>
                  <main className="mt-20">
                    {children}
                </main>
              </div>
            </div>
          {/* </body> */}
          
         
      </>
        
    );
}
 
export default Layout;