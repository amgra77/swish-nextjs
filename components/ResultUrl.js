export default function ResultUrl({props}) {
    function copyToClipboard () {
        const element = document.getElementById('textarea');
        const _copyButtonLabel = document.getElementById('copyButtonLabel');
        const _copyIcon = document.getElementById('copyIcon');
        const _checkIcon = document.getElementById('checkIcon');
        
        element.select();
        element.setSelectionRange(0,element.value.length);
        document.execCommand('copy');
        
        _copyIcon.classList.add('hidden');
        _checkIcon.classList.remove('hidden');
        _copyButtonLabel.innerText = "Text Copied!";
        
        setTimeout(function() {
            _copyButtonLabel.innerText = "Copy to clipboard";
            _copyIcon.classList.remove('hidden');
            _checkIcon.classList.add('hidden');
        }, 1000);
    }
    return (
        <div className="border-2 rounded p-10 flex flex-col text-center mt-4">
            <span>{props.shortUrl}</span>
            <input type="text" id="textarea" value={props.shortUrl} readOnly className="code opacity-0"/>
            <button type="button" id="copyButton" onClick={copyToClipboard} className="w-48 mx-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-8">
            <i className="fas fa-copy mr-2" id="copyIcon"></i>
            <i className="fas fa-check mr-2 hidden" id="checkIcon"></i>
                <span id="copyButtonLabel">Copy to clipboard</span>
            </button>
        </div> 
    );
}