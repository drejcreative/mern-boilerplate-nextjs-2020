import Head from 'next/head'
import axios from 'axios';

import App from '../components/App/App'
import { config } from '../services/config';

export default function Home({ dataList }) {
  return (
    <div className="container">
      <Head>
        <title>NextJs TODO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <App dataList={dataList} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await axios.get(`${config.apiUrl}/list`);
  const data = response.data.data;

  // Pass data to the page via props
  return { props: { dataList: data } }
}