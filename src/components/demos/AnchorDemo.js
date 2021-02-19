import React from 'react';
import Anchor from 'loopui/Anchor';
import Demo from 'components/Demo';

const demoSpecs = [
    {
        title: 'Usage',
        possibleValues: [''],
        snippet: () =>
            [
                `<Anchor href="http://www.loopio.com/">`,
                `    Go to Loopio.com`,
                `</Anchor>`,
            ].join('\n'),
        // eslint-disable-next-line react/display-name
        demo: () => (
            <Anchor href="http://www.loopio.com/">Go to Loopio.com</Anchor>
        ),
    },
];

const IconDemo = () => (
    <Demo title="Anchor" ComponentBeingDemoed={Anchor} demoSpecs={demoSpecs} />
);

export default IconDemo;
