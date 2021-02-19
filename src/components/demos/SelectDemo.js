import React from 'react';
import Select from 'loopui/Select';
import Demo from 'components/Demo';

const indentLines = (text, tabCharacter = '    ') =>
    text
        .split('\n')
        .map((line, i) => `${i > 0 ? tabCharacter : ''}${line}`)
        .join('\n');

const demoSpecs = [
    {
        title: 'options',
        possibleValues: [
            [
                { label: 'Oranges', value: 'oranges' },
                { label: 'Bananas', value: 'bananas' },
            ],
        ],
        keys: ['simple'],
        snippet: options =>
            [
                `<Select`,
                `    options={${indentLines(
                    JSON.stringify(options, null, 4)
                )}}`,
                `/>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: options => <Select options={options} />,
    },
];

const SelectDemo = () => (
    <Demo title="Select" ComponentBeingDemoed={Select} demoSpecs={demoSpecs} />
);

export default SelectDemo;
