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
        <div className="card">
            <h3>URL</h3>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <input type="text" name="longUrl" placeholder="Enter URL" value={props.longUrl} />
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    );
};