import Box from 'loopui/Box';
import Badge from 'loopui/Badge';
import { COLOR_NAMES, COLOR_PALETTE } from 'loopui/_tokens';
import getReadableTextColor from 'loopui/utils/getReadableTextColor';
import PageSection from 'components/PageSection';

const Swatch = ({ label, ...otherProps }) => {
    const swatchColorCode = COLOR_PALETTE[label];
    const { contrastScore } = getReadableTextColor(swatchColorCode);

    return (
        <Box
            backgroundColor={label}
            justifyContent="space-between"
            padding="normal"
            {...otherProps}
        >
            {label}
            <Badge>{contrastScore}</Badge>
        </Box>
    );
};

const ColorDemo = () => {
    const swatchGroups = COLOR_NAMES.map((colorName) => {
        const swatches = [100, 200, 300, 400, 500, 600, 700].map(
            (swatchName) => {
                const fullColorName = `${colorName}--${swatchName}`;
                return <Swatch key={swatchName} label={fullColorName} />;
            }
        );

        return <Box key={colorName}>{swatches}</Box>;
    });

    return (
        <PageSection heading="Colors" headingSize="large">
            <Box columns={4} gap="normal">
                {swatchGroups}
            </Box>
        </PageSection>
    );
};

export default ColorDemo;
