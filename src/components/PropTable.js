import parsePropTypes from 'parse-prop-types';
import PropTypes from 'prop-types';
import buildPropTypes from 'loopui/utils/buildPropTypes';
import Table from 'loopui/Table';

const summarizeAcceptedValues = propType => {
    let acceptedValues;

    switch (propType.name) {
        case 'bool':
            acceptedValues = [true, false];
            break;
        case 'oneOf':
            acceptedValues = propType.value;
            break;
        case 'oneOfType':
            acceptedValues = propType.value.map(value =>
                summarizeAcceptedValues(value)
            );
            break;
        default:
            acceptedValues = propType.name;
    }

    return [].concat(acceptedValues).join(' | ');
};

const columns = [
    'Prop Name',
    'Accepted Values',
    'Default',
    'Required?',
    'Notes',
];

const PropTable = ({ Component, notes }) => {
    const propTypes = parsePropTypes(Component);
    const propNames = Object.keys(propTypes);
    const items = propNames.map(propName => {
        const propType = propTypes[propName];
        const acceptedValues = summarizeAcceptedValues(propType.type);

        return {
            key: propName,
            'Prop Name': propName,
            'Accepted Values': `${acceptedValues}`,
            Default: propType.defaultValue ? propType.defaultValue.value : '—',
            'Required?': propType.required ? 'Required' : 'Optional',
            Notes: notes[propName],
        };
    });

    return <Table columns={columns} items={items} />;
};

buildPropTypes(PropTable, {
    Component: { type: PropTypes.elementType.isRequired },
    notes: { type: PropTypes.arrayOf(PropTypes.node), defaultValue: [] },
});

export default PropTable;
