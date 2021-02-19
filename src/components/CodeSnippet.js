import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Box from 'loopui/Box';
import { COLOR_PALETTE } from 'loopui/_tokens';
import useClipboard from './hooks/useClipboard';

const codeAndPreCommonProps = {
    color: 'black',
    background: 'none',
    fontFamily:
        "'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
};

const customHighlightTheme = {
    'code[class*="language-"]': {
        ...codeAndPreCommonProps,
    },
    'pre[class*="language-"]': {
        ...codeAndPreCommonProps,
        position: 'relative',
        margin: '.5em 0',
        overflow: 'visible',
        padding: '0',
        backgroundColor: 'transparent',
        WebkitBoxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        boxSizing: 'border-box',
        marginBottom: '1em',
    },
    'pre[class*="language-"]>code': {
        position: 'relative',
        borderLeft: `10px solid ${COLOR_PALETTE['blue']}`,
        boxShadow: `-1px 0px 0px 0px ${COLOR_PALETTE['blue']}, 0px 0px 0px 1px #dfdfdf`,
        backgroundColor: 'transparent',
        backgroundImage:
            'linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%)',
        backgroundSize: '3em 3em',
        backgroundOrigin: 'content-box',
        backgroundAttachment: 'local',
    },
    'code[class*="language"]': {
        maxHeight: 'inherit',
        height: 'inherit',
        padding: '0 1em',
        display: 'block',
        overflow: 'auto',
    },
    ':not(pre) > code[class*="language-"]': {
        backgroundColor: 'transparent',
        WebkitBoxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        boxSizing: 'border-box',
        marginBottom: '1em',
        position: 'relative',
        padding: '.2em',
        borderRadius: '0.3em',
        color: COLOR_PALETTE['red'],
        border: '1px solid rgba(0, 0, 0, 0.1)',
        display: 'inline',
        whiteSpace: 'normal',
    },
    'pre[class*="language-"]:before': {
        content: "''",
        zIndex: '-2',
        display: 'block',
        position: 'absolute',
        bottom: '0.75em',
        left: '0.18em',
        width: '40%',
        height: '20%',
        maxHeight: '13em',
        boxShadow: '0px 13px 8px #979797',
        WebkitTransform: 'rotate(-2deg)',
        MozTransform: 'rotate(-2deg)',
        msTransform: 'rotate(-2deg)',
        OTransform: 'rotate(-2deg)',
        transform: 'rotate(-2deg)',
    },
    'pre[class*="language-"]:after': {
        content: "''",
        zIndex: '-2',
        display: 'block',
        position: 'absolute',
        bottom: '0.75em',
        left: 'auto',
        width: '40%',
        height: '20%',
        maxHeight: '13em',
        boxShadow: '0px 13px 8px #979797',
        WebkitTransform: 'rotate(2deg)',
        MozTransform: 'rotate(2deg)',
        msTransform: 'rotate(2deg)',
        OTransform: 'rotate(2deg)',
        transform: 'rotate(2deg)',
        right: '0.75em',
    },
    ':not(pre) > code[class*="language-"]:after': {
        right: '0.75em',
        left: 'auto',
        WebkitTransform: 'rotate(2deg)',
        MozTransform: 'rotate(2deg)',
        msTransform: 'rotate(2deg)',
        OTransform: 'rotate(2deg)',
        transform: 'rotate(2deg)',
    },
    comment: {
        color: '#7D8B99',
    },
    'block-comment': {
        color: '#7D8B99',
    },
    prolog: {
        color: '#7D8B99',
    },
    doctype: {
        color: '#7D8B99',
    },
    cdata: {
        color: '#7D8B99',
    },
    punctuation: {
        color: '#5F6364',
    },
    property: {
        color: COLOR_PALETTE['red'],
    },
    tag: {
        color: COLOR_PALETTE['red'],
    },
    boolean: {
        color: COLOR_PALETTE['red'],
    },
    number: {
        color: COLOR_PALETTE['red'],
    },
    'function-name': {
        color: COLOR_PALETTE['red'],
    },
    constant: {
        color: COLOR_PALETTE['red'],
    },
    symbol: {
        color: COLOR_PALETTE['red'],
    },
    deleted: {
        color: COLOR_PALETTE['red'],
    },
    selector: {
        color: COLOR_PALETTE['teal--500'],
    },
    'attr-name': {
        color: COLOR_PALETTE['teal--500'],
    },
    string: {
        color: COLOR_PALETTE['teal--500'],
    },
    char: {
        color: COLOR_PALETTE['teal--500'],
    },
    function: {
        color: COLOR_PALETTE['teal--500'],
    },
    builtin: {
        color: COLOR_PALETTE['teal--500'],
    },
    inserted: {
        color: COLOR_PALETTE['teal--500'],
    },
    operator: {
        color: '#a67f59',
        background: 'rgba(255, 255, 255, 0.5)',
    },
    entity: {
        color: '#a67f59',
        background: 'rgba(255, 255, 255, 0.5)',
        cursor: 'help',
    },
    url: {
        color: '#a67f59',
        background: 'rgba(255, 255, 255, 0.5)',
    },
    variable: {
        color: '#a67f59',
        background: 'rgba(255, 255, 255, 0.5)',
    },
    atrule: {
        color: COLOR_PALETTE['purple'],
    },
    'attr-value': {
        color: COLOR_PALETTE['purple'],
    },
    keyword: {
        color: COLOR_PALETTE['purple'],
    },
    'class-name': {
        color: COLOR_PALETTE['purple'],
    },
    regex: {
        color: COLOR_PALETTE['yellow'],
    },
    important: {
        color: COLOR_PALETTE['yellow'],
        fontWeight: 'normal',
    },
    '.language-css .token.string': {
        color: '#a67f59',
        background: 'rgba(255, 255, 255, 0.5)',
    },
    '.style .token.string': {
        color: '#a67f59',
        background: 'rgba(255, 255, 255, 0.5)',
    },
    bold: {
        fontWeight: 'bold',
    },
    italic: {
        fontStyle: 'italic',
    },
    '.namespace': {
        Opacity: '.7',
    },
    'tab:not(:empty):before': {
        color: '#e0d7d1',
    },
    'cr:before': {
        color: '#e0d7d1',
    },
    'lf:before': {
        color: '#e0d7d1',
    },
    'pre[class*="language-"].line-numbers.line-numbers': {
        paddingLeft: '0',
    },
    'pre[class*="language-"].line-numbers.line-numbers code': {
        paddingLeft: '3.8em',
    },
    'pre[class*="language-"].line-numbers.line-numbers .line-numbers-rows': {
        left: '0',
    },
    'pre[class*="language-"][data-line]': {
        paddingTop: '0',
        paddingBottom: '0',
        paddingLeft: '0',
    },
    'pre[data-line] code': {
        position: 'relative',
        paddingLeft: '4em',
    },
    'pre .line-highlight': {
        marginTop: '0',
    },
};

const HIGHLIGHTED_CODE_CLASS_NAME = 'highlightedCode';

const CodeSnippetContainer = styled(Box)`
    .${HIGHLIGHTED_CODE_CLASS_NAME} {
        font-weight: 900;
        text-decoration: underline;
        text-underline-offset: 3px;
    }
`;

const CopyToClipboardButton = styled(Box)`
    position: absolute;
    right: 0;
    bottom: 5px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;

    ${CodeSnippetContainer}:hover & {
        opacity: 1;
    }
`;

const escapeRegExp = new RegExp(/([.*+?^=!:$(){}|[\]/\\])/g);

const safeRegExp = (string) => {
    return string.replace(escapeRegExp, '\\$1');
};

const SuperHighlighter = ({ children, delimeter = 'III' }) => {
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;

        if (element) {
            const html = element.innerHTML;
            const delimeterMatcher = safeRegExp(delimeter);

            element.innerHTML = html.replace(
                new RegExp(`${delimeterMatcher}(.*?)${delimeterMatcher}`, 'gm'),
                `<span class="${HIGHLIGHTED_CODE_CLASS_NAME}">$1</span>`
            );
        }
    }, [delimeter, elementRef]);

    return <div ref={elementRef}>{children}</div>;
};

const CodeSnippet = ({ children, highlightDelimeter = 'III' }) => {
    const [copyToClipboard, isCopiedToClipboard] = useClipboard();

    const lines = children.toString().split('\n');

    const smallestWhiteSpace = lines.reduce((smallestWhiteSpaceSoFar, line) => {
        if (line.trim() === '') {
            return smallestWhiteSpaceSoFar;
        }
        const leadingWhitespace = line.match(/\s*/g)[0].length;
        return leadingWhitespace < smallestWhiteSpaceSoFar
            ? leadingWhitespace
            : smallestWhiteSpaceSoFar;
    }, Infinity);

    const trimmedLines = lines
        .map((line) =>
            line.trim() === '' ? line : line.substring(smallestWhiteSpace)
        )
        .join('\n')
        .trim();

    const handleCopyToClipboard = () => copyToClipboard(trimmedLines);

    return (
        <CodeSnippetContainer isRelative>
            <CopyToClipboardButton
                onClick={handleCopyToClipboard}
                icon="copy"
                title={isCopiedToClipboard ? 'Copied!' : 'Copy to Clipboard'}
            />
            <SuperHighlighter delimeter={highlightDelimeter}>
                <SyntaxHighlighter language="jsx" style={customHighlightTheme}>
                    {trimmedLines}
                </SyntaxHighlighter>
            </SuperHighlighter>
        </CodeSnippetContainer>
    );
};

CodeSnippet.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CodeSnippet;
