import PropTypes from 'prop-types';
import Box from 'loopui/Box';
import buildPropTypes from 'loopui/utils/buildPropTypes';
import { SPOT_COLORS } from './_tokens';

const Table = ({ columns, getKey, items, ...otherProps }) => (
    <table
        style={{ borderCollapse: 'collapse', width: '100%' }}
        {...otherProps}
    >
        <thead>
            <tr>
                {columns.map(column => (
                    <Box
                        as="th"
                        borderBottom
                        borderColor={SPOT_COLORS.border}
                        color="gray--500"
                        fontSize="small"
                        key={column.label || column}
                        style={{ width: `${100 / columns.length}%` }}
                    >
                        {column.label || column}
                    </Box>
                ))}
            </tr>
        </thead>
        <tbody>
            {items.map((item, index) => (
                <Box
                    as="tr"
                    backgroundColor={index % 2 === 0 ? 'teal--100' : null}
                    key={getKey(item)}
                >
                    {columns.map(column => {
                        const columnLabel = column.label || column;
                        const columnRenderer = typeof column.render;

                        return (
                            <Box
                                as="td"
                                key={column.label || column}
                                paddingX="normal"
                                paddingY="tight"
                            >
                                {columnRenderer === 'function'
                                    ? column.render(item)
                                    : columnRenderer === 'string'
                                    ? item[column.render]
                                    : item[columnLabel] || '—'}
                            </Box>
                        );
                    })}
                </Box>
            ))}
        </tbody>
    </table>
);

buildPropTypes(Table, {
    columns: { type: PropTypes.array.isRequired },
    getKey: { type: PropTypes.func, defaultValue: item => item.key },
    items: {
        type: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string.isRequired,
            })
        ),
    },
});

export default Table;
