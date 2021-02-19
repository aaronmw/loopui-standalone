import { useEffect, useRef, useState } from 'react';
import Box from 'loopui/Box';
import GlobalStyles from 'loopui/GlobalStyles';
import LinkTree from 'components/LinkTree';
import {
    COLOR_PALETTE,
    GRID_SIZES,
    HEADING_SIZE_TO_TAG_MAP,
} from 'loopui/_tokens';
import { HEADING_SIZE, SUBHEADING_SIZE } from 'config';
import Heading from 'loopui/Heading';

// [
//     {
//         href: '#anchor',
//         title: 'Anchor',
//         children: [],
//     },
//     {
//         href: '#box',
//         title: 'Box',
//         children: [
//             { href: '#padding', title: padding'},
//             { href: '#margin', title: margin'},
//         ],
//     },
// ];

const headingElement = HEADING_SIZE_TO_TAG_MAP[HEADING_SIZE];
const subheadingElement = HEADING_SIZE_TO_TAG_MAP[SUBHEADING_SIZE];

const Page = ({ children, title }) => {
    const [headingHierarchy, setHeadingHierarchy] = useState([]);
    const pageElementRef = useRef(null);

    useEffect(() => {
        const pageElement = pageElementRef.current;

        if (pageElement) {
            const sectionHeadings = pageElement.querySelectorAll(
                `${headingElement}[data-is-page-heading]`
            );
            const newHierarchy = Array.from(sectionHeadings).map(
                sectionHeading => {
                    const sectionId = sectionHeading.parentNode.id;
                    const headingText = sectionHeading.innerText;

                    const subsectionHeadings = Array.from(
                        sectionHeading.parentNode.querySelectorAll(
                            `${subheadingElement}[data-is-page-heading]`
                        )
                    ).map(subsectionHeading => {
                        const subsectionId = subsectionHeading.parentNode.id;
                        const subheadingText = subsectionHeading.innerText;
                        return {
                            href: `#${subsectionId}`,
                            title: subheadingText,
                        };
                    });

                    const headingObject = {
                        href: `#${sectionId}`,
                        title: headingText,
                        children: subsectionHeadings,
                    };

                    return headingObject;
                }
            );

            setHeadingHierarchy(newHierarchy);
        }
    }, [children, pageElementRef]);

    return (
        <>
            <GlobalStyles />
            <Box
                alignItems="flex-end"
                padding="loose"
                style={{
                    backgroundImage: `
                        linear-gradient(
                            45deg,
                            ${COLOR_PALETTE['teal--400']} 0%,
                            ${COLOR_PALETTE['teal--200']} 100%
                        )
                    `,
                    height: '20vh',
                }}
            >
                <Heading color="white" size="xlarge">
                    {title}
                </Heading>
            </Box>
            <Box
                columns={['200px', '1fr']}
                gap="xloose"
                padding="loose"
                ref={pageElementRef}
            >
                <Box as="nav">
                    <LinkTree
                        links={headingHierarchy}
                        isScrollable
                        style={{
                            position: 'sticky',
                            bottom: 0,
                            top: 0,
                            left: 0,
                            height: '100vh',
                        }}
                    />
                </Box>

                <div>{children}</div>
            </Box>
        </>
    );
};

export default Page;
