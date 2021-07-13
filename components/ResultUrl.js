export default function ResultUrl({props}) {
    function copyToClipboard () {
        const element = document.getElementById('textarea');
        element.select();
        element.setSelectionRange(0,element.value.length);
        document.execCommand('copy');
        document.getElementById('copyButton').innerText = "Text Copied!";
        setTimeout(function() {
            document.getElementById('copyButton').innerText = "Copy to clipboard";
        }, 1000);
    }
    return (
        <div className="card">
            <h1>Short</h1>
            <textarea id="textarea" value={props.shortUrl} readOnly className="code"></textarea>
            <button type="button" id="copyButton" onClick={copyToClipboard}>Copy to clipboard</button>
        </div> 
    );
}