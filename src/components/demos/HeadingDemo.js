import React from 'react';
import Box from 'loopui/Box';
import Heading from 'loopui/Heading';
import Demo from 'components/Demo';
import { FONT_SIZES } from 'loopui/_tokens';

const demoSpecs = [
    {
        title: 'isSticky',
        description: `
            Makes the box sticky, and applies a border to the bottom
            when in "stuck" mode. You can still set borderColor and other
            props though 👍
        `,
        possibleValues: [true],
        snippet: () => `
            <Box border height="200" isScrollable>
                <Box height="50" />
                <Heading IIIisStickyIII size="large" padding="normal">
                    Scroll!
                </Heading>
                <Box height="1000" />
            </Box>
        `,
        // eslint-disable-next-line react/display-name
        demo: () => (
            <Box border height="200" isScrollable>
                <Box height="50" />
                <Heading isSticky size="large" padding="normal">
                    Scroll!
                </Heading>
                <Box height="1000" />
            </Box>
        ),
    },
    {
        title: 'size',
        description: `
            The element type (h1, h2, etc.) is chosen for you, based on the size.
            Is that wrong? 🤷‍♂️
        `,
        possibleValues: Object.keys(FONT_SIZES),
        snippet: (value) => `
            <Heading size="III${value}III" padding="normal">
                ${value}
            </Heading>
        `,
        // eslint-disable-next-line react/display-name
        demo: (value) => (
            <Heading size={value} padding="normal">
                {value}
            </Heading>
        ),
    },
];

const HeadingDemo = () => (
    <Demo
        title="Heading"
        ComponentBeingDemoed={Heading}
        demoSpecs={demoSpecs}
    />
);

export default HeadingDemo;
