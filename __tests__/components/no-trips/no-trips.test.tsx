import NoTrips from "@/components/no-trips/no-trips";
import { renderWithProviders } from "@/jest.setup";
import messages from "@/messages/en.json";
import { screen } from "@testing-library/react";
import { getTranslations } from "next-intl/server";

const getTranslationsMock = jest.mocked(getTranslations);
const translations = messages.NoTrips;

describe("NoTrips", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the empty state with translated content and a plane icon", async () => {
    const component = await NoTrips();

    renderWithProviders(component);

    expect(getTranslationsMock).toHaveBeenCalledWith("NoTrips");
    expect(screen.getByText(translations.noTripsYet)).toHaveAttribute(
      "data-slot",
      "empty-title",
    );
    expect(screen.getByText(translations.noTripsDescription)).toHaveAttribute(
      "data-slot",
      "empty-description",
    );
    expect(
      screen.getByRole("button", { name: translations.createTrip }),
    ).toBeInTheDocument();

    const media = document.querySelector('[data-slot="empty-icon"]');
    expect(media).toHaveAttribute("data-variant", "icon");
    expect(media?.querySelector(".lucide-plane")).toBeInTheDocument();
  });
});
