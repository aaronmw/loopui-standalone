import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from 'loopui/Box';
import { GRID_SIZES } from 'loopui/_tokens';
import buildPropTypes from 'loopui/utils/buildPropTypes';

const BORDER_WIDTH = '1px';

const Container = styled(Box)(
    () => `
        padding-top: calc(${GRID_SIZES.xtight} + ${BORDER_WIDTH});
        padding-bottom: calc(${GRID_SIZES.xtight} + ${BORDER_WIDTH});
    `
);

const TextInput = ({ isInvalid, helpText, ...otherProps }) => (
    <>
        <Container
            forwardedAs="input"
            backgroundColor={isInvalid ? 'red--100' : null}
            border
            borderColor={isInvalid ? 'red' : null}
            borderRadius
            paddingX="tight"
            type="text"
            {...otherProps}
        />
        {helpText && (
            <Box
                color={isInvalid ? 'red--500' : 'gray--500'}
                fontSize="small"
                marginTop="xtight"
            >
                {helpText}
            </Box>
        )}
    </>
);

buildPropTypes(TextInput, {
    helpText: { type: PropTypes.node, defaultValue: null },
});

export default TextInput;
