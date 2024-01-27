import Editor from '@monaco-editor/react';

export default function CodeEditor({language, value='', onChange, theme='vs-dark'}) {
    return (
        <Editor
            height="100%"
            defaultLanguage={language}
            value={value}
            onChange={onChange}
            theme={theme}
        />

    )
}