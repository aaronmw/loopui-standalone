import React from 'react';
import TextInput from 'loopui/TextInput';
import Demo from 'components/Demo';

const demoSpecs = [
    {
        title: 'helpText',
        possibleValues: [
            { helpText: 'Some kind of description', isInvalid: false },
            {
                helpText: 'Uh oh! This field is invalid because...',
                isInvalid: true,
            },
        ],
        keys: ['without-error', 'with-error'],
        snippet: value =>
            [
                `<TextInput`,
                `    helpText="III${value.helpText}III"`,
                value.isInvalid ? '    isInvalid' : null,
                `/>`,
            ]
                .filter(i => i)
                .join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <TextInput helpText={value.helpText} isInvalid={value.isInvalid} />
        ),
    },
    {
        title: 'isInvalid',
        possibleValues: [false, true],
        snippet: value => `<TextInput${value ? ' isInvalid' : ''} />`,
        // eslint-disable-next-line react/display-name
        demo: value => <TextInput isInvalid={value} />,
    },
];

const InputDemo = () => (
    <Demo
        title="TextInput"
        ComponentBeingDemoed={TextInput}
        demoSpecs={demoSpecs}
    />
);

export default InputDemo;
