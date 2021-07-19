import { useState } from 'react';

export default function CreateUrlForm(props) {
    console.log('props.props ', props.props);
    const handleSubmit = async(event) => {
        event.preventDefault();
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({longUrl: event.target.longUrl.value}),
        };
        try {
            const response = await fetch('/api/url', options);
            const data = await response.json();
            props.onDataChange(data);
        } catch (error) {
            console.log('error ', error);
        }
    };

    return (
        <div className="border-2 rounded p-10 flex flex-col">
            {/* <h3 className="">URL</h3> */}
            <form onSubmit={handleSubmit}>
                <div className="">
                    <input type="text" name="longUrl" placeholder="Enter URL" value={props.longUrl} className="p-8 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                </div>
                <div className="text-right mt-10">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                    <i className="fas fa-paper-plane"></i>    Create
                    </button>
                </div>
            </form>
        </div>
    );
};