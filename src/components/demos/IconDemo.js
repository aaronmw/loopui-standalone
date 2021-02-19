import React from 'react';
import Icon from 'loopui/Icon';
import Demo from 'components/Demo';

const demoSpecs = [
    {
        title: 'collection',
        description: `
            Couldn't call this "style" because that word's taken.
        `,
        possibleValues: ['light', 'regular', 'solid', 'duotone', 'brands'],
        snippet: value =>
            [
                `<Icon`,
                `    fontSize="xlarge"`,
                `    name="${value === 'brands' ? 'twitter' : 'monkey'}"`,
                `    collection="III${value}III"`,
                `/>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: value => (
            <Icon
                fontSize="xlarge"
                name={value === 'brands' ? 'twitter' : 'monkey'}
                collection={value}
            />
        ),
    },
];

const IconDemo = () => (
    <Demo title="Icon" ComponentBeingDemoed={Icon} demoSpecs={demoSpecs} />
);

export default IconDemo;
