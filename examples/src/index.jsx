import React from 'react';
import { render } from 'react-dom';
import MyComponent from '../../src';
import { highlight } from '../../src/codemirror-highlight';

highlight(
    `
import 'codemirror/mode/meta';
import 'codemirror/mode/javascript/javascript';
import CodeMirror from './codemirror-shim';

export const highlight = (source, language, el) =>
CodeMirror.runMode(source, CodeMirror.findModeByName(language), el);
`,
    'javascript',
    document.getElementById('code-test')
);

// const App = () => <MyComponent />;
// render(<App />, document.getElementById('root'));
