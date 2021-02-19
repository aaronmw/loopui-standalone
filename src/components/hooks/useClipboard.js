import { useEffect, useState } from 'react';

const setClipboardContents = (str) => {
    const textarea = document.createElement('textarea');
    textarea.value = str;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
};

const useClipboard = () => {
    const [isCopiedToClipboard, setIsCopiedToClipboard] = useState(false);

    useEffect(() => {
        // Tooltips won't change for elements under the cursor
        // unless we fire this scroll event
        window.dispatchEvent(new CustomEvent('scroll'));
    }, [isCopiedToClipboard]);

    const copyToClipboard = (strToCopy) => {
        setClipboardContents(strToCopy);
        setIsCopiedToClipboard(true);
        setTimeout(() => setIsCopiedToClipboard(false), 1000);
    };

    return [copyToClipboard, isCopiedToClipboard];
};

export default useClipboard;
