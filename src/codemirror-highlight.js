import 'codemirror/mode/meta';
import CodeMirror from './codemirror-shim';

export const highlight = (source, language, fileName, mimeType) => {
    let modeSpec;

    if (language) {
        modeSpec = CodeMirror.findModeByName(language) || CodeMirror.findModeByExtension(language);
    }

    if (!modeSpec && fileName) {
        modeSpec = CodeMirror.findModeByFileName(fileName);
    }

    if (!modeSpec && mimeType) {
        modeSpec = CodeMirror.findModeByMIME(mimeType);
    }

    modeSpec = modeSpec || CodeMirror.findModeByMIME('text/plain');

    let loadModePromise;
    try {
        CodeMirror.getMode({}, modeSpec);
        loadModePromise = Promise.resolve();
    } catch (e) {
        loadModePromise = import(`codemirror/mode/${modeSpec.mode}/${modeSpec.mode}`);
    }

    return loadModePromise.then(() => {
        const lines = [];
        let lineOffset = 0;

        CodeMirror.runMode(
            source,
            modeSpec.mime || { name: modeSpec.mode },
            (content, type, lineNumber) => {
                if (lineNumber != null) {
                    if (!lines[lineNumber]) {
                        lines[lineNumber] = [];
                        lineOffset = 0;
                    }
                    if (type) {
                        lines[lineNumber].push({
                            start: lineOffset,
                            end: lineOffset + content.length - 1,
                            type,
                        });
                    }
                }
                lineOffset += content.length;
            }
        );

        return lines;
    });
};
