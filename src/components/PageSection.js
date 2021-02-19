import kebabCase from 'lodash/kebabCase';
import Box from 'loopui/Box';
import Heading from 'loopui/Heading';

const PageSection = ({ children, heading, headingSize, ...otherProps }) => {
    return (
        <Box
            as="section"
            id={kebabCase(heading)}
            marginBottom="xloose"
            {...otherProps}
        >
            <Heading
                data-is-page-heading
                backgroundColor="white"
                isSticky={headingSize === 'large'}
                paddingY="normal"
                size={headingSize}
            >
                {heading}
            </Heading>

            {children}
        </Box>
    );
};

export default PageSection;
