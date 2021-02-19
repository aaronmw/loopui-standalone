import getRelativeSwatch from 'loopui/utils/getRelativeSwatch';

const testSpecs = {
    'Returns highest possible swatch': {
        given: {
            swatchName: 'teal--400',
            relativeValue: 800, // too high!
        },
        expect: 'teal--700',
    },
};

Object.keys(testSpecs).forEach(testName => {
    const testSpec = testSpecs[testName];

    it(testName, () => {
        const newSwatch = getRelativeSwatch(
            testSpec.given.swatchName,
            testSpec.given.relativeValue
        );
        expect(newSwatch).toEqual(testSpec.expect);
    });
});
