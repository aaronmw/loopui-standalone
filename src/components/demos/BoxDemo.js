import React from 'react';
import {
    BORDER_RADII,
    BORDER_STYLES,
    BOX_SHADOW_STYLES,
    FONT_SIZES,
    FONT_WEIGHTS,
    GRID_SIZES,
} from 'loopui/_tokens';
import Box from 'loopui/Box';
import Demo from 'components/Demo';

const demoSpecs = [
    {
        title: 'as',
        description: `
            Pass whatever tag you'd like your box to render as,
            unlocking all the glorious props for virtually any HTML element.
        `,
        possibleValues: ['p', 'button'],
        snippet: value =>
            [
                `<Box`,
                `    as="III${value}III"`,
                `    border`,
                `    padding`,
                `>`,
                `...`,
                `</Box>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Box as={value} border padding>
                {value}
            </Box>
        ),
    },
    {
        title: 'backgroundColor',
        description: `
            If omitted, the foreground color will be chosen for you, optimizing for
            legibility (either white or our default text color).
        `,
        possibleValues: ['blue--700', 'blue--100'],
        snippet: value =>
            [
                `<Box`,
                `    backgroundColor="III${value}III"`,
                `    padding`,
                `>`,
                `...`,
                `</Box>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Box backgroundColor={value} padding>
                {value}
            </Box>
        ),
    },
    {
        title: 'border',
        possibleValues: Object.keys(BORDER_STYLES),
        snippet: value =>
            [
                `<Box`,
                `    border="III${value}III"`,
                `    padding`,
                `>`,
                `...`,
                `</Box>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Box border={value} padding>
                {value}
            </Box>
        ),
    },
    {
        title: 'borderColor',
        possibleValues: ['teal', 'purple'],
        snippet: value =>
            [
                `<Box`,
                `    border`,
                `    borderColor="III${value}III"`,
                `    padding`,
                `>`,
                `...`,
                `</Box>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Box border borderColor={value} padding>
                {value}
            </Box>
        ),
    },
    {
        title: 'borderRadius',
        possibleValues: Object.keys(BORDER_RADII),
        snippet: value =>
            [
                `<Box`,
                `    border`,
                `    borderRadius="III${value}III"`,
                `    padding`,
                `>`,
                `...`,
                `</Box>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Box border borderRadius={value} padding>
                {value}
            </Box>
        ),
    },
    {
        title: 'boxShadow',
        possibleValues: Object.keys(BOX_SHADOW_STYLES),
        snippet: value =>
            [
                `<Box`,
                `    boxShadow="III${value}III"`,
                `    padding`,
                `>`,
                `...`,
                `</Box>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Box boxShadow={value} padding>
                {value}
            </Box>
        ),
    },
    {
        title: 'color',
        description: `
            If a border is added, it will inherit from the value supplied for color. Handy!
        `,
        possibleValues: ['teal', 'purple'],
        snippet: value =>
            [
                `<Box`,
                `    border`,
                `    color="III${value}III"`,
                `    padding`,
                `>`,
                `...`,
                `</Box>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Box border color={value} padding>
                {value}
            </Box>
        ),
    },
    {
        title: 'columns',
        description: `
            Achieved with CSS Grid, the columns prop accepts either a number (for equal-sized columns),
            or an array of sizes, fractions, or both.
        `,
        possibleValues: [2, ['1fr', '2fr'], ['1fr', '60px']],
        snippet: value =>
            [
                `<Box`,
                `    border`,
                `    columns={III${JSON.stringify(value)}III}`,
                `>`,
                `...`,
                `</Box>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Box border columns={value}>
                <Box backgroundColor="red" padding>
                    Box
                </Box>
                <Box backgroundColor="teal" padding>
                    Box
                </Box>
            </Box>
        ),
    },
    {
        title: 'flexDirection',
        description: `
            Setting this prop will override the "columns" prop, and force the Box
            into "display: flex" mode (vs. "display: grid"). You can still
            set the "gap" prop to control spacing, though! 👏
        `,
        possibleValues: ['row', 'row-reverse', 'column', 'column-reverse'],
        snippet: value =>
            [
                `<Box flexDirection="III${value}III" gap="tight">`,
                `   ...`,
                `</Box>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Box flexDirection={value} gap="tight">
                <Box backgroundColor="red" padding>
                    A
                </Box>
                <Box backgroundColor="teal" padding>
                    B
                </Box>
                <Box backgroundColor="yellow" padding>
                    C
                </Box>
            </Box>
        ),
    },
    {
        title: 'fontSize',
        description: `
            You probably want to use <Heading> instead, but if you need to change font
            size on another type of box, here's how:
        `,
        possibleValues: Object.keys(FONT_SIZES),
        snippet: value => `<Box fontSize="III${value}III"> ... </Box>`,
        // eslint-disable-next-line react/display-name
        demo: value => <Box fontSize={value}>{value}</Box>,
    },
    {
        title: 'fontWeight',
        possibleValues: Object.keys(FONT_WEIGHTS),
        snippet: value => `<Box fontWeight="III${value}III"> ... </Box>`,
        // eslint-disable-next-line react/display-name
        demo: value => <Box fontWeight={value}>{value}</Box>,
    },
    {
        title: 'gap',
        description: `
            Sets the spacing between child elements of a Box in either Flex or Grid mode.
            If you set a "gap" value and none of the other grid-related props (columns, etc.),
            your Box will be put into "display: flex" mode automatically.
        `,
        possibleValues: Object.keys(GRID_SIZES),
        snippet: value =>
            [
                `<Box`,
                `    columns={2}`,
                `    gap="III${value}III"`,
                `>`,
                `...`,
                `</Box>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Box columns={2} gap={value}>
                <Box backgroundColor="red" border padding>
                    A
                </Box>
                <Box backgroundColor="teal" border padding>
                    B
                </Box>
                <Box backgroundColor="yellow" border padding>
                    C
                </Box>
                <Box backgroundColor="purple" border padding>
                    D
                </Box>
            </Box>
        ),
    },
    {
        title: 'justifyContent',
        description: `
            This accepts all the usual values of "justify-content". Setting this prop will force
            your Box into "display: flex" mode (overwriting "columns").
        `,
        possibleValues: [
            'center',
            'flex-start',
            'flex-end',
            'space-around',
            'space-between',
            'space-evenly',
        ],
        snippet: value =>
            [
                `<Box`,
                `   border`,
                `   gap="tight"`,
                `   justifyContent="III${value}III"`,
                `>`,
                `   ...`,
                `</Box>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Box border justifyContent={value} gap="tight">
                <Box backgroundColor="red" padding>
                    A
                </Box>
                <Box backgroundColor="teal" padding>
                    B
                </Box>
                <Box backgroundColor="yellow" padding>
                    C
                </Box>
            </Box>
        ),
    },
    {
        title: 'margin',
        possibleValues: Object.keys(GRID_SIZES),
        snippet: value =>
            [
                `<Box border>`,
                `    <Box`,
                `        backgroundColor="purple--100"`,
                `        margin="III${value}III"`,
                `    >`,
                `    ...`,
                `    </Box>`,
                `</Box>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Box border>
                <Box backgroundColor="purple--100" margin={value}>
                    {value}
                </Box>
            </Box>
        ),
    },
    {
        title: 'padding',
        possibleValues: Object.keys(GRID_SIZES),
        snippet: value =>
            [
                `<Box`,
                `    backgroundColor="purple--100"`,
                `    border`,
                `    padding="III${value}III"`,
                `>`,
                `...`,
                `</Box>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Box backgroundColor="purple--100" border padding={value}>
                {value}
            </Box>
        ),
    },
    {
        title: 'textAlign',
        possibleValues: ['left', 'center', 'right', 'justify'],
        snippet: value =>
            [
                `<Box`,
                `    border`,
                `    padding`,
                `    textAlign="III${value}III"`,
                `>`,
                `   ...`,
                `</Box>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Box border padding textAlign={value}>
                Duis egestas, metus non feugiat porttitor, orci metus tempus
                augue, eget suscipit eros nibh eu dui. Cras pretium elit eget
                augue ultricies maximus. Aenean molestie posuere placerat. Ut
                aliquam rutrum facilisis. Integer fermentum justo lacus. Donec
                vel aliquet tellus, at rutrum diam. In hac habitasse platea
                dictumst.
            </Box>
        ),
    },
];

const BoxDemo = () => (
    <Demo title="Box" ComponentBeingDemoed={Box} demoSpecs={demoSpecs} />
);

export default BoxDemo;
