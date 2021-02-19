import PropTypes from 'prop-types';
import Box from 'loopui/Box';
import buildPropTypes from 'loopui/utils/buildPropTypes';

const COLLECTION_TO_CLASS_NAME_MAP = {
    regular: 'far',
    solid: 'fas',
    brands: 'fab',
    light: 'fal',
    duotone: 'fad',
};

const Icon = ({ name, collection = 'regular', ...otherProps }) => (
    <Box
        className={`${COLLECTION_TO_CLASS_NAME_MAP[collection]} fa-${name}`}
        {...otherProps}
    />
);

buildPropTypes(Icon, {
    name: { type: PropTypes.string.isRequired },
    collection: {
        type: PropTypes.oneOf(Object.keys(COLLECTION_TO_CLASS_NAME_MAP)),
        defaultValue: 'regular',
    },
});

export default Icon;
