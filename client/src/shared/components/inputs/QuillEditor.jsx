import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef } from 'react';

import './QuillEditor.css'

export default function QuillEditor({ handleEditorChange, height, placeholder }) {
    const quillRef = useRef();
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3,false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote','code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            
        ],
    }

    const formats = ['header', 'bold', 'italic', 'underline', 'list', 'link','blockquote','strike','code-block' ]
    return (
        <ReactQuill
            ref={quillRef}
            modules={modules}
            formats={formats}
            // bounds={document.querySelector(editorContainer)}
            theme="snow"
            onChange={handleEditorChange}
            style={{ height: height, width: '100%' }}
            placeholder={placeholder}
        />
    )
}
