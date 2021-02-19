import React from 'react';
import capitalize from 'lodash/capitalize';
import Box from 'loopui/Box';
import Button from 'loopui/Button';
import Icon from 'loopui/Icon';
import Demo from 'components/Demo';
import { COLOR_NAMES } from 'loopui/_tokens';

const demoSpecs = [
    {
        title: 'color',
        possibleValues: COLOR_NAMES,
        snippet: value =>
            [
                `<Button`,
                `    color="III${value}III"`,
                `    onClick={() => null}`,
                `>`,
                `   ...`,
                `</Button>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Box gap="normal">
                <Button color={value} priority="primary" onClick={() => null}>
                    {capitalize(value)} Button
                </Button>
                <Button color={value} priority="secondary" onClick={() => null}>
                    {capitalize(value)} Button
                </Button>
                <Button color={value} priority="normal" onClick={() => null}>
                    <Icon name="monkey" />
                </Button>
            </Box>
        ),
    },
    {
        title: 'isPending',
        possibleValues: ['primary', 'secondary', 'normal'],
        snippet: value =>
            [
                `<Button`,
                `    isPending`,
                `    priority="III${value}III"`,
                `    onClick={() => null}`,
                `>`,
                `   ...`,
                `</Button>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Box gap="normal">
                <Button isPending priority={value} onClick={() => null}>
                    {value}
                </Button>
                <Button isPending priority={value} onClick={() => null}>
                    <Icon name="monkey" />
                </Button>
            </Box>
        ),
    },
    {
        title: 'priority',
        possibleValues: ['primary', 'secondary', 'normal'],
        snippet: value =>
            [
                `<Button`,
                `    priority="III${value}III"`,
                `    onClick={() => null}`,
                `>`,
                `   ...`,
                `</Button>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Box gap="normal">
                <Button priority={value} onClick={() => null}>
                    {capitalize(value)} Button
                </Button>
                <Button priority={value} onClick={() => null}>
                    <Icon name="monkey" />
                </Button>
            </Box>
        ),
    },
];

const ButtonDemo = () => (
    <Demo title="Button" ComponentBeingDemoed={Button} demoSpecs={demoSpecs} />
);

export default ButtonDemo;
