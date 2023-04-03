// Breakpoint
const DESKTOP_WIDTH = '1920';
const LAPTOP_WIDTH = '1280';
const TABLET_WIDTH = '1024';
const PHONE_WIDTH = '375';

const desktopBreakpoint = window.matchMedia(`(min-width:${LAPTOP_WIDTH}px)`);
const laptopBreakpoint = window.matchMedia(`(min-width:${LAPTOP_WIDTH}px)`);
const tabletBreakpoint = window.matchMedia(`(min-width: ${TABLET_WIDTH}px)`);

export {
    DESKTOP_WIDTH, LAPTOP_WIDTH, TABLET_WIDTH, PHONE_WIDTH, desktopBreakpoint,
    laptopBreakpoint, tabletBreakpoint,
};
