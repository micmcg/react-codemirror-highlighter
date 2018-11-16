import 'codemirror/mode/meta';
import CodeMirror from './codemirror-shim';
import 'codemirror/theme/monokai.css';

export const highlight = (source, language, el) => {
    try {
        CodeMirror.runMode(source, CodeMirror.findModeByName(language).mode, el);
    } catch (e) {
        import(`codemirror/mode/${language}/${language}`).then(() => {
            CodeMirror.runMode(source, CodeMirror.findModeByName(language).mode, el);
        });
    }
};
