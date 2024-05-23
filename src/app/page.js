
import Head from 'next/head';
import Image from "next/image";
import HomePage from "./Home/page";

export default function Home() {
  return (
    <main>
      <Head>
        <link rel="icon" href="./public/favicon.ico" />
      </Head>
      
      <HomePage/>
    </main>
  );
}
