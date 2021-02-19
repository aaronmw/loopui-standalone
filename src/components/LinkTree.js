import { useState } from 'react';
import Anchor from 'loopui/Anchor';
import Box from 'loopui/Box';
import Icon from 'loopui/Icon';

const Accordion = ({ tab, tabContents, defaultState = false }) => {
    const [isOpen, setIsOpen] = useState(defaultState);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Box isRelative>
                {tabContents && (
                    <Box
                        paddingX="normal"
                        paddingY="tight"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            transform: 'translateY(-50%)',
                        }}
                        onClick={handleClick}
                    >
                        <Icon
                            name="chevron-down"
                            style={{
                                transition: 'transform 0.5s',
                                transform: `rotate(${isOpen ? 180 : 0}deg)`,
                            }}
                        />
                    </Box>
                )}
                {tab}
            </Box>
            <Box display={isOpen ? 'block' : 'none'}>{tabContents}</Box>
        </>
    );
};

const LinkTree = ({ links, ...otherProps }) => {
    return (
        <Box as="ul" {...otherProps}>
            {links.map(link => {
                const tab = (
                    <Anchor
                        display="block"
                        href={link.href}
                        paddingX="normal"
                        paddingY="tight"
                    >
                        {link.title}
                    </Anchor>
                );

                const tabContents = link.children.length ? (
                    <Box as="ul">
                        {link.children.map(childLink => (
                            <Box as="li" borderTop key={childLink.title}>
                                <Anchor
                                    display="block"
                                    href={childLink.href}
                                    paddingX="normal"
                                    paddingY="tight"
                                    paddingLeft="xloose"
                                >
                                    {childLink.title}
                                </Anchor>
                            </Box>
                        ))}
                    </Box>
                ) : null;

                return (
                    <Box as="li" borderBottom key={link.title}>
                        <Accordion tab={tab} tabContents={tabContents} />
                    </Box>
                );
            })}
        </Box>
    );
};

export default LinkTree;
