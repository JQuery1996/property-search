import { Grid, Breakpoint } from "antd";

const { useBreakpoint } = Grid;

interface MediaQuery {
  lessThan: (breakpoint: Breakpoint) => boolean;
  greaterThan: (breakpoint: Breakpoint) => boolean;
  is: (breakpoint: Breakpoint) => boolean;
  not: (breakpoint: Breakpoint) => boolean;
}

export const useMediaQuery = (): MediaQuery => {
  const screens: Partial<Record<Breakpoint, boolean>> = useBreakpoint();

  const lessThan = (breakpoint: Breakpoint): boolean => {
    const breakpoints: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "xxl"];
    const index = breakpoints.indexOf(breakpoint);
    return (
      breakpoints.slice(0, index + 1).some((key) => screens[key]) &&
      !screens[breakpoints[index + 1]]
    );
  };

  const greaterThan = (breakpoint: Breakpoint): boolean => {
    const breakpoints: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "xxl"];
    const index = breakpoints.indexOf(breakpoint);
    return breakpoints.slice(index + 1).some((key) => screens[key]);
  };

  const is = (breakpoint: Breakpoint): boolean => !!screens[breakpoint];

  const not = (breakpoint: Breakpoint): boolean => !screens[breakpoint];

  return {
    lessThan,
    greaterThan,
    is,
    not,
  };
};
