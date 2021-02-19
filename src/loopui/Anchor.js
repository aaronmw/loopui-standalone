import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from 'loopui/Box';

const Anchor = forwardRef(({ children, href, ...otherProps }, ref) => {
    return (
        <Box
            as="a"
            color="blue--500"
            display="inline-block"
            href={href}
            ref={ref}
            {...otherProps}
        >
            {children}
        </Box>
    );
});

Anchor.displayName = 'Anchor';

Anchor.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
};

export default Anchor;
