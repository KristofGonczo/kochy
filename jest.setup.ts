import "@testing-library/jest-dom";

jest.mock("next-themes", () => {
  const React = jest.requireActual<typeof import("react")>("react");
  const ThemeContext = React.createContext<{
    setTheme: (theme: string) => void;
    theme?: string;
  }>({
    setTheme: () => {},
  });

  function ThemeProvider({
    children,
    defaultTheme = "light",
  }: {
    children: React.ReactNode;
    defaultTheme?: string;
  }) {
    const [theme, setThemeState] = React.useState(() => {
      return window.localStorage.getItem("theme") ?? defaultTheme;
    });

    const setTheme = (nextTheme: string) => {
      setThemeState(nextTheme);
      window.localStorage.setItem("theme", nextTheme);
    };

    return React.createElement(
      ThemeContext.Provider,
      { value: { setTheme, theme } },
      children,
    );
  }

  function useTheme() {
    return React.useContext(ThemeContext);
  }

  return { ThemeProvider, useTheme };
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
