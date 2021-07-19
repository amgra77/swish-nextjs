import { useState } from 'react'
import Head from 'next/head';
import CreateUrlForm from '../components/CreateUrlForm';
import ResultUrl from '../components/ResultUrl';
import stats from "../package.json";

export default function HomePage() {
    function handleDataChange(event) {
        setData({
            shortUrl: location.protocol + event.shortUrl,
            longUrl: event.longUrl,
            version: stats.version,
        });
    }

    const [data, setData] = useState({
        longUrl: '',
        shortUrl: '',
        version: stats.version,
    });
    return (
        <div>
            <Head>
                <title>Swish URL</title>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Web app to shorten URLs" />
                <meta name="keywords" content="short, shorten, url, swish, vpalacio, amgra"></meta>
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous"/>
                <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>

            </Head>
            <div className="container mx-auto mt-8">
                <section className="">
                    <h1 className="text-lg text-center font-bold mt-10">Swish URL</h1>
                    <h4 className="text-md text-center mt-10 mb-10">Shorten a url</h4>
                    <div className="mx-auto">
                        <CreateUrlForm props={data} onDataChange={handleDataChange}/>
                        { data.shortUrl ? <ResultUrl props={data} /> : null }
                    </div>
                </section>
                <section className="footer">
                    <p>Version: {data.version}</p>
                </section>
            </div>
            
          
        </div>
    );
}