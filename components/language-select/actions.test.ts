import { persistLocaleCookie } from "./actions";

describe("persistLocaleCookie", () => {
  it("deletes the locale cookie when automatic locale selection is used", () => {
    const cookieStore = {
      delete: jest.fn(),
      set: jest.fn(),
    };

    persistLocaleCookie(cookieStore, "auto");

    expect(cookieStore.delete).toHaveBeenCalledWith("locale");
    expect(cookieStore.set).not.toHaveBeenCalled();
  });

  it("sets the locale cookie for a supported locale", () => {
    const cookieStore = {
      delete: jest.fn(),
      set: jest.fn(),
    };

    persistLocaleCookie(cookieStore, "en");

    expect(cookieStore.set).toHaveBeenCalledWith("locale", "en");
    expect(cookieStore.delete).not.toHaveBeenCalled();
  });
});
