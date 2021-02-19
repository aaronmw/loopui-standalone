const buildPropTypes = (Component, propTypes) => {
    Component.propTypes = {};
    Component.defaultProps = {};

    Object.keys(propTypes).forEach((propName) => {
        const { type, defaultValue } = propTypes[propName];
        Component.propTypes[propName] = type;
        Component.defaultProps[propName] = defaultValue;
    });
};

export default buildPropTypes;
