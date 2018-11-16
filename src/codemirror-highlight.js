import 'codemirror/mode/meta';
import 'codemirror/mode/javascript/javascript';
import CodeMirror from './codemirror-shim';
import 'codemirror/theme/monokai.css';

export const highlight = (source, language, el) =>
    CodeMirror.runMode(source, CodeMirror.findModeByName(language).mode, el);
