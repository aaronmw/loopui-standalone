import React from 'react';
import kebabCase from 'lodash/kebabCase';
import Box from 'loopui/Box';
import CodeSnippet from 'components/CodeSnippet';
import PageSection from 'components/PageSection';
import PropTable from 'components/PropTable';

const Demo = ({ title, ComponentBeingDemoed, demoSpecs }) => {
    const demos = demoSpecs.map(demoSpec => (
        <PageSection
            heading={demoSpec.title}
            headingSize="normal"
            id={`${kebabCase(title)}-${kebabCase(demoSpec.title)}`}
            key={demoSpec.title}
        >
            {demoSpec.description && (
                <Box as="p" marginBottom="loose">
                    {demoSpec.description}
                </Box>
            )}
            <Box alignItems="center" columns={2} gap="normal">
                {demoSpec.possibleValues.map((value, index) => (
                    <React.Fragment
                        key={`${demoSpec.title}-${
                            demoSpec.keys ? demoSpec.keys[index] : value
                        }`}
                    >
                        <CodeSnippet>{demoSpec.snippet(value)}</CodeSnippet>
                        <div>{demoSpec.demo(value)}</div>
                    </React.Fragment>
                ))}
            </Box>
        </PageSection>
    ));

    return (
        <PageSection heading={title} headingSize="large">
            {demos}
            <PageSection
                heading="Props Table"
                headingSize="normal"
                id={`${kebabCase(title)}-props`}
            >
                <PropTable Component={ComponentBeingDemoed} />
            </PageSection>
        </PageSection>
    );
};

export default Demo;
