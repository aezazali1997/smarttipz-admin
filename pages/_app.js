import { useEffect, useState } from 'react'
import '../styles/index.scss';
import "tailwindcss/tailwind.css"

import { parseCookies } from 'nookies';
import CustomLayout from '../Layout';


const MyApp = ({ Component, pageProps }) => {
  const [authorized, setAuthorized] = useState(null)

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies?.token || null;
    setAuthorized(token)
  })

  if (authorized) {
    return (
      <CustomLayout>
        <Component {...pageProps} />
      </CustomLayout>
    )
  }
  return (
    <Component {...pageProps} />
  )
}

export default MyApp;
