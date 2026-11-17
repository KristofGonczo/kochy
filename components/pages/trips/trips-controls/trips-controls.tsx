import NewTripDialog from "@/components/pages/trips/new-trip-dialog/new-trip-dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { getTranslations } from "next-intl/server";

const TripsControls = async () => {
  const t = await getTranslations("Trips");

  return (
    <div className="w-full flex flex-row gap-1">
      <InputGroup>
        <InputGroupInput
          aria-label={t("searchPlaceholder")}
          placeholder={t("searchPlaceholder")}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <NewTripDialog />
    </div>
  );
};

export default TripsControls;
