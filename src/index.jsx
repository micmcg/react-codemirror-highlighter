import React, { PureComponent } from 'react';
import './styles.css';
import { highlight } from './codemirror-highlight';

export default class CodeBlock extends PureComponent {
    state = {};

    constructor(props) {
        super();
        highlight(props.source, props.language).then(highlighted => this.setState({ highlighted }));
    }

    render() {
        const {
            source,
            lineNumberStart = 1,
            lineNumberMax = lineNumberStart + source.split('\n').length,
        } = this.props;
        const { highlighted } = this.state;

        return (
            <code className="cm-s-stash-default">
                <pre>
                    {source.split('\n').map((line, i) => (
                        <Line
                            key={`line-${lineNumberStart + i}`}
                            line={line}
                            number={lineNumberStart + i}
                            lineNumberMax={lineNumberMax}
                            markers={highlighted && highlighted[i]}
                        />
                    ))}
                </pre>
            </code>
        );
    }
}

const padNumber = (number, max) => {
    number = number.toString();
    max = max.toString().length;

    while (number.length < max) {
        number = ` ${number}`;
    }

    return number;
};

class Line extends PureComponent {
    render() {
        const { line, number, lineNumberMax, markers } = this.props;

        return (
            <div>
                <span className="line-number">{padNumber(number, lineNumberMax)}</span>
                {markers && markers.length ? <MarkedLine line={line} markers={markers} /> : line}
            </div>
        );
    }
}

class MarkedLine extends PureComponent {
    render() {
        const { line, markers } = this.props;

        let lastEnd = 0;

        return markers.reduce((lineSegments, marker, index) => {
            if (lastEnd < marker.start) {
                lineSegments.push(line.substring(lastEnd, marker.start));
            }

            lineSegments.push(
                <span className={`cm-${marker.type}`} key={marker.type + index}>
                    {line.substring(marker.start, marker.end + 1)}
                </span>
            );

            if (index === markers.length - 1 && marker.end < line.length - 1) {
                lineSegments.push(line.substring(marker.end + 1));
            }

            lastEnd = marker.end + 1;
            return lineSegments;
        }, []);
    }
}
