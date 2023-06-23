import React, { useEffect, useState, useCallback, useRef } from 'react';

interface Props {
  handleContentChange: (text: string) => void;
  value: string;
}

const FakeEditor: React.FC<Props> = ({ handleContentChange, value }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorValue, setEditorValue] = useState('');
  const [isBold, setIsBold] = useState(false);

  const handleContent = useCallback(() => {
    if (editorRef.current) {
      const textContent = editorRef.current.textContent;
      const innerHTML = editorRef.current.innerHTML;
      setEditorValue(textContent!);
      handleContentChange(innerHTML);
    }
  }, [handleContentChange]);

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLDivElement>) => {
      const clipboardData = event.clipboardData;
      const textContent = clipboardData.getData('text/plain');
      event.preventDefault();
      document.execCommand('insertText', false, textContent);
    },
    []
  );

  const handleTextAction = () => {
    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      const range = window.getSelection()?.getRangeAt(0);
      const parentElement = range?.commonAncestorContainer.parentElement;
      if (
        parentElement?.nodeName === 'B' &&
        parentElement.parentElement === editorRef.current
      ) {
        const textNode = document.createTextNode(selectedText);
        parentElement.replaceWith(textNode);
        setIsBold(false);
      } else {
        if (parentElement?.parentElement === editorRef.current) {
          range?.deleteContents();
          setIsBold(false);
        } else {
          if (parentElement === editorRef.current) {
            const boldedText = document.createElement('b');
            boldedText.innerText = selectedText;
            range?.deleteContents();
            range?.insertNode(boldedText);
            setIsBold(true);
            window.getSelection()?.removeAllRanges();
          }
        }
      }
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
      handleContent();
    }
  }, []);

  function handleClick() {}

  return (
    <div className='editor-container'>
      <button onClick={handleTextAction}>{isBold ? 'Unbold' : 'Bold'}</button>
      <dialog id='d'>
        <p>ASDKLAD</p>
      </dialog>
      <button>asdkas</button>

      <p
        className='border-2 w-full min-h-[400px] outline-none'
        contentEditable={true}
        role='textbox'
        aria-multiline='true'
        onPaste={handlePaste}
        ref={editorRef}
        onInput={handleContent}
      ></p>
    </div>
  );
};

export default FakeEditor;
