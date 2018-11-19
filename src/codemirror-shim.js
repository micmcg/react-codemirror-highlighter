// Based on codemirror/addons/run-standalone
const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
const splitLines = string => string.split(/\r?\n|\r/);

class StringStream {
    pos = 0;

    start = 0;

    lineStart = 0;

    constructor(string) {
        this.string = string;
    }

    eol() {
        return this.pos >= this.string.length;
    }

    sol() {
        return this.pos === 0;
    }

    peek() {
        return this.string.charAt(this.pos) || null;
    }

    next() {
        return this.pos < this.string.length ? this.string.charAt(this.pos++) : undefined;
    }

    eat(match) {
        const ch = this.string.charAt(this.pos);
        let ok;
        if (typeof match === 'string') {
            ok = ch === match;
        } else {
            ok = ch && (match.test ? match.test(ch) : match(ch));
        }
        if (ok) {
            this.pos += 1;
            return ch;
        }

        return false;
    }

    eatWhile(match) {
        const start = this.pos;
        while (this.eat(match));

        return this.pos > start;
    }

    eatSpace() {
        const start = this.pos;
        while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {
            this.pos += 1;
        }

        return this.pos > start;
    }

    skipToEnd() {
        this.pos = this.string.length;
    }

    skipTo(ch) {
        const found = this.string.indexOf(ch, this.pos);
        if (found > -1) {
            this.pos = found;
            return true;
        }

        return false;
    }

    backUp(n) {
        this.pos -= n;
    }

    column() {
        return this.start - this.lineStart;
    }

    indentation() {
        return 0;
    }

    match(pattern, consume, caseInsensitive) {
        if (typeof pattern === 'string') {
            const cased = str => (caseInsensitive ? str.toLowerCase() : str);
            const substr = this.string.substr(this.pos, pattern.length);

            if (cased(substr) === cased(pattern)) {
                if (consume !== false) {
                    this.pos += pattern.length;
                }
                return true;
            }
        } else {
            const match = this.string.slice(this.pos).match(pattern);

            if (match && match.index > 0) {
                return null;
            }
            if (match && consume !== false) {
                this.pos += match[0].length;
            }

            return match;
        }

        return false;
    }

    current() {
        return this.string.slice(this.start, this.pos);
    }

    hideFirstChars(n, inner) {
        this.lineStart += n;
        try {
            return inner();
        } finally {
            this.lineStart -= n;
        }
    }

    lookAhead() {
        return null;
    }
}

/*
const modes =  {};
const mimeModes = {};

export const startState = (mode, a1, a2) => (mode.startState ? mode.startState(a1, a2) : true);

export function defineMode(name, mode, ...dependencies) {
    if (dependencies) {
        mode.dependencies = dependencies;
    }
    modes[name] = mode;
}

export function defineMIME(mime, spec) {
    mimeModes[mime] = spec;
}

export function resolveMode(spec) {
    if (typeof spec === 'string' && has(mimeModes, spec)) {
        spec = mimeModes[spec];
    } else if (spec && typeof spec.name === 'string' && has(mimeModes, spec.name)) {
        spec = mimeModes[spec.name];
    }

    if (typeof spec === 'string') {
        return { name: spec };
    }

    return spec || { name: 'null' };
}

export function getMode(options, spec) {
    spec = resolveMode(spec);
    const mfactory = modes[spec.name];

    if (!mfactory) {
        throw new Error(`Unknown mode: ${spec}`);
    }

    return mfactory(options, spec);
} */

const CodeMirror = {
    StringStream,
    startState: (mode, a1, a2) => (mode.startState ? mode.startState(a1, a2) : true),
    modes: {},
    mimeModes: {},
    defineMode(name, mode, ...dependencies) {
        if (dependencies) {
            mode.dependencies = dependencies;
        }
        CodeMirror.modes[name] = mode;
    },
    defineMIME(mime, spec) {
        CodeMirror.mimeModes[mime] = spec;
    },
    resolveMode(spec) {
        if (typeof spec === 'string' && has(CodeMirror.mimeModes, spec)) {
            spec = CodeMirror.mimeModes[spec];
        } else if (spec && typeof spec.name === 'string' && has(CodeMirror.mimeModes, spec.name)) {
            spec = CodeMirror.mimeModes[spec.name];
        }

        if (typeof spec === 'string') {
            return { name: spec };
        }

        return spec || { name: 'null' };
    },
    getMode(options, spec) {
        spec = CodeMirror.resolveMode(spec);
        const mfactory = CodeMirror.modes[spec.name];

        if (!mfactory) {
            throw new Error(`Unknown mode: ${spec}`);
        }

        return mfactory(options, spec);
    },
    registerHelper: Math.min,
    registerGlobalHelper: Math.min,
    runMode(string, modespec, callback, options) {
        const mode = CodeMirror.getMode({ indentUnit: 2 }, modespec);

        if (callback.nodeType === 1) {
            const tabSize = (options && options.tabSize) || 4;
            const node = callback;
            let col = 0;
            node.innerHTML = '';
            callback = (text, style) => {
                if (text === '\n') {
                    node.appendChild(document.createElement('br'));
                    col = 0;
                    return;
                }
                let content = '';
                // replace tabs
                for (let pos = 0; ; ) {
                    const idx = text.indexOf('\t', pos);
                    if (idx === -1) {
                        content += text.slice(pos);
                        col += text.length - pos;
                        break;
                    } else {
                        col += idx - pos;
                        content += text.slice(pos, idx);
                        const size = tabSize - (col % tabSize);
                        col += size;
                        for (let i = 0; i < size; ++i) {
                            content += ' ';
                        }
                        pos = idx + 1;
                    }
                }

                if (style) {
                    const sp = node.appendChild(document.createElement('span'));
                    sp.className = `cm-${style.replace(/ +/g, ' cm-')}`;
                    sp.appendChild(document.createTextNode(content));
                } else {
                    node.appendChild(document.createTextNode(content));
                }
            };
        }

        const lines = splitLines(string);
        const state = (options && options.state) || CodeMirror.startState(mode);
        for (let i = 0, e = lines.length; i < e; ++i) {
            if (i) {
                callback('\n');
            }
            const stream = new CodeMirror.StringStream(lines[i]);

            if (!stream.string && mode.blankLine) {
                mode.blankLine(state);
            }

            while (!stream.eol()) {
                const style = mode.token(stream, state);
                callback(stream.current(), style, i, stream.start, state);
                stream.start = stream.pos;
            }
        }
    },
};

CodeMirror.defineMode('null', () => ({
    token(stream) {
        stream.skipToEnd();
    },
}));

CodeMirror.defineMIME('text/plain', 'null');

module.exports = CodeMirror;
