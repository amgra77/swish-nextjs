export default function ResultUrl({props}) {
    return (
        <div className="card">
            <h1>Result</h1>
            <code>
                <a href={props.shortUrl}>{props.shortUrl}</a>
            </code>
        </div> 
    );
}