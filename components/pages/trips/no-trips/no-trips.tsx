import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Plane } from "lucide-react";
import { getTranslations } from "next-intl/server";
import NewTripDialog from "../new-trip-dialog/new-trip-dialog";

const NoTrips = async () => {
  const t = await getTranslations("NoTrips");

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Plane />
        </EmptyMedia>
        <EmptyTitle>{t("noTripsYet")}</EmptyTitle>
        <EmptyDescription>{t("noTripsDescription")}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <NewTripDialog triggerLabel={t("createTrip")} />
      </EmptyContent>
    </Empty>
  );
};

export default NoTrips;
