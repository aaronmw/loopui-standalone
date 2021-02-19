import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import buildPropTypes from 'loopui/utils/buildPropTypes';
import { BORDER_RADII, FONT_SIZES, GRID_SIZES, SPOT_COLORS } from './_tokens';
import getColorByName from './utils/getColorByName';
import getRelativeSwatch from './utils/getRelativeSwatch';

const customStyles = {
    clearIndicator: (base, state) => ({
        ...base,
        color: state.isDisabled ? 'transparent' : getColorByName('gray--500'),
        cursor: 'pointer',
        padding: 0,
        ':hover': {
            color: state.isDisabled ? 'transparent' : getColorByName('red'),
        },
    }),
    container: (base, state) => ({
        ...base,
        borderRadius: BORDER_RADII.normal,
        height: state.selectProps.fullHeight ? '100%' : '32px',
        minHeight: '32px',
        pointerEvents: 'all',
        ':focus-within': {
            boxShadow: `0 0 0 2px white, 0 0 0 6px ${getColorByName(
                'focusRing'
            )}`,
        },
    }),
    control: (base, state) => ({
        ...base,
        backgroundColor: state.isDisabled
            ? getColorByName('gray--100')
            : 'white',
        borderColor: state.selectProps.hasError
            ? getColorByName('red')
            : getColorByName('border'),
        boxShadow: null,
        cursor: state.isDisabled
            ? 'not-allowed'
            : state.selectProps.hasHover
            ? 'pointer'
            : 'default',
        ...(state.menuIsOpen && state.selectProps.hasHover
            ? { backgroundColor: getColorByName('blue--100') }
            : null),
        ...(state.selectProps.noBorder ? { borderWidth: 0 } : null),
        height: state.selectProps.fullHeight ? '100%' : '32px',
        minHeight: '32px',
        ':hover': {
            borderColor: getColorByName('border'),
        },
    }),
    dropdownIndicator: (base, state) => ({
        ...base,
        color: state.isDisabled
            ? getColorByName('gray--500')
            : getColorByName('purple--700'),
        padding: '0 8px',
        ':hover': {
            color: state.isDisabled
                ? getColorByName('gray--500')
                : getColorByName('purple--700'),
        },
    }),
    groupHeading: base => ({
        ...base,
        color: getColorByName('gray--500'),
    }),
    multiValue: base => ({
        ...base,
        backgroundColor: getColorByName('blue--200'),
    }),
    multiValueLabel: base => ({
        ...base,
        color: getColorByName('purple--700'),
        fontSize: FONT_SIZES.normal,
        fontStyle: 'normal',
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: GRID_SIZES.tight,
        paddingLeft: GRID_SIZES.tight,
    }),
    multiValueRemove: base => ({
        ...base,
        '&:hover': {
            backgroundColor: getColorByName('blue--100'),
            color: 'inherit',
            cursor: 'pointer',
        },
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused
            ? getColorByName(getRelativeSwatch('selected', 100))
            : state.isSelected
            ? getColorByName('selected')
            : null,
        color: getColorByName('text'),
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: getColorByName(getRelativeSwatch('selected', 100)),
        },
    }),
    placeholder: (base, state) => ({
        ...base,
        color: state.selectProps.hasError
            ? getColorByName('red--500')
            : getColorByName('gray--500'),
        fontStyle: 'italic',
        opacity: state.isDisabled || state.selectProps.hasError ? 0.5 : 1,
    }),
    singleValue: (base, state) => ({
        ...base,
        color: getColorByName('purple--700'),
        opacity: state.isDisabled ? 0.5 : 1,
        maxWidth: 'calc(100% - 10px)',
        width: '100%',
    }),
    valueContainer: base => ({
        ...base,
        padding: '0 8px',
    }),
};

const Select = ({ options, ...otherProps }) => (
    <ReactSelect options={options} styles={customStyles} {...otherProps} />
);

buildPropTypes(Select, {
    options: {
        type: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.node,
                value: PropTypes.string,
            })
        ).isRequired,
    },
});

export default Select;
