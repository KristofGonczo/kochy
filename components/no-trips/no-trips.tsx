import { Button } from "@/components/ui/button";
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
        <Button>{t("createTrip")}</Button>
      </EmptyContent>
    </Empty>
  );
};

export default NoTrips;
