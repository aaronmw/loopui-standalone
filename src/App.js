import GlobalStyles from 'loopui/GlobalStyles';
import Page from 'components/Page';

// Import the demos
import AnchorDemo from 'components/demos/AnchorDemo';
import BoxDemo from 'components/demos/BoxDemo';
import ButtonDemo from 'components/demos/ButtonDemo';
import ColorDemo from 'components/demos/ColorDemo';
import HeadingDemo from 'components/demos/HeadingDemo';
import IconDemo from 'components/demos/IconDemo';
import SelectDemo from 'components/demos/SelectDemo';
import TextInputDemo from 'components/demos/TextInputDemo';

/**
    - Loopui Components
        - Atoms
            - Anchor
            - Box
            - Button
            - Color
            - Icon
            - Spinner
            - Text
        - Forms & Inputs
            - CheckboxesField
            - DateField
            - ...
        - Table
        - Tabs
        - Tooltip
        - ...
    - Utilities
        - Hooks
        -
    - Guidelines & Other Resources
*/

function App() {
    return (
        <Page title="Loopui 2021">
            <GlobalStyles />
            <AnchorDemo />
            <BoxDemo />
            <ButtonDemo />
            <ColorDemo />
            <HeadingDemo />
            <IconDemo />
            <SelectDemo />
            <TextInputDemo />
        </Page>
    );
}

export default App;
