import { useState } from 'react'
import Head from 'next/head';
import CreateUrlForm from '../components/CreateUrlForm';
import ResultUrl from '../components/ResultUrl';

export default function HomePage() {
    function handleDataChange(event) {
        setData({
            shortUrl: event.shortUrl,
            longUrl: event.longUrl,
        });
    }

    const [data, setData] = useState({
        longUrl: '',
        shortUrl: '',
        onDataChange: handleDataChange,
    });
    return (
        <div>
            <Head>
                <title>Swish URL</title>
                <meta name="description" content="Web app to shorten URLs" />
                <meta name="keywords" content="short, shorten, url, swish, vpalacio, amgra"></meta>
            </Head>
            <section className="sectionhome">
                <h3>Welcome to</h3>
                <h1>Swish URL</h1>
                <CreateUrlForm props={data} onDataChange={handleDataChange} />
                { data.shortUrl ? <ResultUrl props={data} /> : null }
            </section>
        </div>
    );
}