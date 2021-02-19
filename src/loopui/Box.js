import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import capitalize from 'lodash/capitalize';
import {
    BORDER_RADII,
    BORDER_STYLES,
    BOX_SHADOW_STYLES,
    COLOR_PALETTE,
    GRID_SIZES,
    FONT_SIZES,
    FONT_WEIGHTS,
} from 'loopui/_tokens';
import buildPropTypes from 'loopui/utils/buildPropTypes';
import getColorByName from 'loopui/utils/getColorByName';
import getReadableTextColor from 'loopui/utils/getReadableTextColor';
import setSwatchLightness from 'loopui/utils/setSwatchLightness';

const isNumber = str => /^[0-9]+$/.test(str);

const EDGE_ALIASES = {
    left: ['', 'X', 'Left'],
    right: ['', 'X', 'Right'],
    top: ['', 'Y', 'Top'],
    bottom: ['', 'Y', 'Bottom'],
};

const FLEX_DIRECTION_GAP_MAP = {
    row: 'left',
    'row-reverse': 'right',
    column: 'top',
    'column-reverse': 'bottom',
};

const getEdgeStylesForProperty = ({
    propertyName,
    props,
    valueRenderer = v => v,
}) => {
    const edgeStyles = {};

    Object.keys(EDGE_ALIASES).forEach(edgeName => {
        EDGE_ALIASES[edgeName].forEach(edgeAlias => {
            const propValue = props[`${propertyName}${capitalize(edgeAlias)}`];
            const matchedEdgeValue = propValue === true ? 'normal' : propValue;

            if (matchedEdgeValue) {
                edgeStyles[`${propertyName}-${edgeName}`] = valueRenderer(
                    matchedEdgeValue
                );
            }
        });
    });

    return edgeStyles;
};

export const getStylesFromProps = props => {
    const {
        alignItems = null,
        backgroundColor = null,
        borderColor = null,
        borderRadius = null,
        boxShadow = null,
        color = null,
        columns = null,
        display = null,
        flexDirection = null,
        fontSize = null,
        fontWeight = null,
        gap = null,
        height = null,
        isFlexible = false,
        isOnlyForScreenReaders = false,
        isRelative = false,
        isScrollable = false,
        justifyContent = null,
        textAlign = null,
        width = null,
        onClick = null,
    } = props;

    const styleRules = {};
    const nestedSelectors = {};

    styleRules['align-items'] = alignItems || null;
    styleRules['background-color'] = backgroundColor
        ? getColorByName(backgroundColor)
        : null;
    styleRules['border-radius'] = borderRadius
        ? BORDER_RADII[borderRadius === true ? 'normal' : borderRadius]
        : null;
    styleRules['box-shadow'] = boxShadow
        ? BOX_SHADOW_STYLES[boxShadow === true ? 'normal' : boxShadow]
        : null;
    styleRules['color'] = color
        ? getColorByName(color)
        : backgroundColor
        ? getReadableTextColor(getColorByName(backgroundColor)).colorCode
        : null;

    if (onClick || props.href) {
        styleRules['cursor'] = 'pointer';

        if (
            // Only for onClick, or block-level links
            !props.href ||
            props.display.indexOf('inline') === -1
        ) {
            nestedSelectors['&:hover'] = `
                background-color: ${getColorByName(
                    setSwatchLightness(
                        backgroundColor || color || 'purple',
                        100
                    )
                )};
            `;
        }
    }

    styleRules['display'] = display || null;
    styleRules['flex-grow'] = isFlexible ? 1 : 0;
    styleRules['flex-shrink'] = isFlexible ? 1 : 0;
    styleRules['font-size'] = fontSize ? FONT_SIZES[fontSize] : null;
    styleRules['font-weight'] = fontWeight ? FONT_WEIGHTS[fontWeight] : null;
    styleRules['overflow'] = isScrollable ? 'auto' : null;
    styleRules['position'] = isRelative ? 'relative' : null;
    styleRules['text-align'] = textAlign || null;
    styleRules['width'] = (isNumber(width) ? `${width}px` : width) || null;
    styleRules['height'] = (isNumber(height) ? `${height}px` : height) || null;

    if (columns && !justifyContent) {
        styleRules['grid-template-columns'] = Array.isArray(columns)
            ? columns.join(' ')
            : `repeat(${columns}, 1fr)`;
        styleRules['display'] = 'grid';
        styleRules['grid-gap'] = gap ? GRID_SIZES[gap] : 0;
        nestedSelectors['@media screen and (max-width: 960px)'] = `
            grid-template-columns: 1fr;
        `;
    }

    if (
        flexDirection ||
        justifyContent ||
        (gap && !columns) ||
        (alignItems && !columns)
    ) {
        styleRules['display'] = 'flex';
        styleRules['flex-direction'] = flexDirection || null;
        styleRules['justify-content'] = justifyContent || null;

        if (gap) {
            const marginEdge = FLEX_DIRECTION_GAP_MAP[flexDirection || 'row'];
            nestedSelectors['& > * + *'] = `
                margin-${marginEdge}: ${GRID_SIZES[gap] || 0};
            `;
        }
    }

    if (isOnlyForScreenReaders) {
        styleRules['position'] = 'absolute';
        styleRules['width'] = '1px';
        styleRules['height'] = '1px';
        styleRules['padding'] = 0;
        styleRules['margin'] = '-1px';
        styleRules['overflow'] = 'hidden';
        styleRules['clip'] = 'rect(0, 0, 0, 0)';
        styleRules['white-space'] = 'nowrap';
        styleRules['border'] = 0;
    }

    nestedSelectors['&:focus-visible'] = `
        box-shadow: 0 0 0 2px white, 0 0 0 6px ${getColorByName('focusRing')};
    `;

    const allStyleRules = {
        ...getEdgeStylesForProperty({
            propertyName: 'margin',
            props,
            valueRenderer: edgeValue => GRID_SIZES[edgeValue],
        }),
        ...getEdgeStylesForProperty({
            propertyName: 'padding',
            props,
            valueRenderer: edgeValue => GRID_SIZES[edgeValue],
        }),
        ...getEdgeStylesForProperty({
            propertyName: 'border',
            props,
            valueRenderer: edgeValue =>
                `${BORDER_STYLES[edgeValue]} ${getColorByName(
                    borderColor || color || 'border'
                )}`,
        }),
        ...styleRules,
    };

    // Smoosh into an array of style definitions
    const styles = Object.keys(allStyleRules).map(propertyName => {
        const propertyDefinition = allStyleRules[propertyName];
        return propertyDefinition
            ? `${propertyName}: ${propertyDefinition};`
            : null;
    });

    Object.keys(nestedSelectors).forEach(selector => {
        styles.push(`
            ${selector} {
                ${nestedSelectors[selector]}
            }
        `);
    });

    return styles.filter(v => !!v);
};

const Container = styled.div(props => getStylesFromProps(props).join('\n'));

const Box = forwardRef(({ children, ...otherProps }, ref) => (
    <Container ref={ref} {...otherProps}>
        {children}
    </Container>
));

Box.displayName = 'Box';

const colorType = PropTypes.oneOf(Object.keys(COLOR_PALETTE));
const gridSizeType = PropTypes.oneOf(Object.keys(GRID_SIZES));
const gridSizeOrBooleanType = PropTypes.oneOfType([
    gridSizeType,
    PropTypes.bool,
]);
const flexContentAlignmentType = PropTypes.oneOf([
    'baseline',
    'center',
    'end',
    'flex-end',
    'flex-start',
    'space-around',
    'space-between',
    'space-evenly',
    'start',
    'stretch',
]);

buildPropTypes(Box, {
    alignItems: {
        type: PropTypes.oneOf([
            'flex-start',
            'center',
            'flex-end',
            'stretch',
            'baseline',
        ]),
        defaultValue: null,
    },
    backgroundColor: {
        type: colorType,
        defaultValue: null,
    },
    borderStyle: {
        type: PropTypes.oneOf(Object.keys(BORDER_STYLES)),
        defaultValue: null,
    },
    borderColor: {
        type: colorType,
        defaultValue: null,
    },
    borderRadius: {
        type: PropTypes.oneOfType([
            PropTypes.oneOf(Object.keys(BORDER_RADII)),
            PropTypes.bool,
        ]),
        defaultValue: null,
    },
    boxShadow: {
        type: PropTypes.oneOfType([
            PropTypes.oneOf(Object.keys(BOX_SHADOW_STYLES)),
            PropTypes.bool,
        ]),
        defaultValue: null,
    },
    color: {
        type: colorType,
        defaultValue: null,
    },
    columns: {
        type: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
        defaultValue: null,
    },
    display: {
        type: PropTypes.oneOf([
            'block',
            'inline',
            'inline-block',
            'grid',
            'flex',
            'none',
            'table',
            'table-row',
            'table-cell',
            'table-header-group',
            'table-footer-group',
            'table-row-group',
        ]),
        defaultValue: null,
    },
    flexDirection: {
        type: PropTypes.oneOf([
            'row',
            'column',
            'row-reverse',
            'column-reverse',
        ]),
        defaultValue: null,
    },
    fontSize: {
        type: PropTypes.oneOf(Object.keys(FONT_SIZES)),
        defaultValue: null,
    },
    fontWeight: {
        type: PropTypes.oneOf(Object.keys(FONT_WEIGHTS)),
        defaultValue: null,
    },
    gap: {
        type: gridSizeType,
        defaultValue: null,
    },
    height: {
        type: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        defaultValue: null,
    },
    isFlexible: {
        type: PropTypes.bool,
        defaultValue: false,
    },
    isOnlyForScreenReaders: {
        type: PropTypes.bool,
        defaultValue: false,
    },
    isRelative: {
        type: PropTypes.bool,
        defaultValue: false,
    },
    isScrollable: {
        type: PropTypes.bool,
        defaultValue: false,
    },
    justifyContent: {
        type: flexContentAlignmentType,
        defaultValue: null,
    },
    margin: {
        type: gridSizeOrBooleanType,
        defaultValue: null,
    },
    marginBottom: {
        type: gridSizeOrBooleanType,
        defaultValue: null,
    },
    marginLeft: {
        type: gridSizeOrBooleanType,
        defaultValue: null,
    },
    marginRight: {
        type: gridSizeOrBooleanType,
        defaultValue: null,
    },
    marginTop: {
        type: gridSizeOrBooleanType,
        defaultValue: null,
    },
    marginX: {
        type: gridSizeOrBooleanType,
        defaultValue: null,
    },
    marginY: {
        type: gridSizeOrBooleanType,
        defaultValue: null,
    },
    onClick: {
        type: PropTypes.func,
        defaultValue: null,
    },
    padding: {
        type: gridSizeOrBooleanType,
        defaultValue: null,
    },
    paddingBottom: {
        type: gridSizeOrBooleanType,
        defaultValue: null,
    },
    paddingLeft: {
        type: gridSizeOrBooleanType,
        defaultValue: null,
    },
    paddingRight: {
        type: gridSizeOrBooleanType,
        defaultValue: null,
    },
    paddingTop: {
        type: gridSizeOrBooleanType,
        defaultValue: null,
    },
    paddingX: {
        type: gridSizeOrBooleanType,
        defaultValue: null,
    },
    paddingY: {
        type: gridSizeOrBooleanType,
        defaultValue: null,
    },
    textAlign: {
        type: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
        defaultValue: null,
    },
    width: {
        type: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        defaultValue: null,
    },
});

export default Box;
