import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { useState } from "react";
import type { DayPickerProps } from "react-day-picker";

type DatePickerProps = Exclude<DayPickerProps, { mode?: undefined }> & {
  placeholder?: string;
};

const DatePicker = (props: DatePickerProps) => {
  const t = useTranslations("DatePicker");
  const formatter = useFormatter();

  const [open, setOpen] = useState(false);

  const displayDate =
    props.mode === "multiple"
      ? props.selected?.[0]
      : props.mode === "range"
        ? props.selected?.from
        : props.selected;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="secondary"
            data-empty={!props.selected}
            className="justify-between"
          >
            {displayDate ? (
              formatter.dateTime(displayDate)
            ) : (
              <span>{props.placeholder || t("pickADate")}</span>
            )}
            <CalendarIcon data-icon="inline-end" />
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar {...props} />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
