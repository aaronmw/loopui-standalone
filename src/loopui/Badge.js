import Box from 'loopui/Box';

const Badge = ({ children, ...otherProps }) => {
    return (
        <Box
            backgroundColor="white"
            border
            borderRadius
            fontSize="small"
            paddingX="tight"
            {...otherProps}
        >
            {children}
        </Box>
    );
};

export default Badge;
