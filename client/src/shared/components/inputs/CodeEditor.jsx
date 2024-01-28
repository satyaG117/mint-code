import Editor from '@monaco-editor/react';

export default function CodeEditor({ language='c', value = '', onChange, theme = 'vs-dark' }) {
    return (
        <Editor
            key={language}
            height="100%"
            defaultLanguage={language}
            value={value}
            onChange={onChange}
            theme={theme}
        />

    )
}