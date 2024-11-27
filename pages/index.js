import React from 'react'
import { parseCookies } from 'nookies'

const Home = () => {
  return (
    <div>
      <p>home</p>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const cookie = parseCookies(context);
  if (cookie.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard/admin",
      },
      props: {},
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/auth/login",
    },
    props: {},
  };
}

export default Home;
