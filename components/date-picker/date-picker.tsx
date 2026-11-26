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

  const displayDateLabel = () => {
    if (props.mode === "multiple") {
      return props.selected?.[0] ? formatter.dateTime(props.selected?.[0]) : "";
    }
    if (props.mode === "range") {
      if (!props.selected?.from || !props.selected?.to) return "";

      return `${formatter.dateTime(props.selected?.from)} - ${formatter.dateTime(props.selected?.to)}`;
    }
    return props.selected ? formatter.dateTime(props.selected) : "";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="secondary"
            data-empty={!props.selected}
            className="justify-between"
          >
            {displayDateLabel() || props.placeholder || t("pickADate")}
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
