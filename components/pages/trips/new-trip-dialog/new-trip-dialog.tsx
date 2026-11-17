"use client";

import DatePicker from "@/components/date-picker/date-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

type NewTripFormValues = {
  name: string;
  from: Date;
  to: Date;
};

const NewTripDialog = () => {
  const t = useTranslations("NewTrip");
  const trpc = useTRPC();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState<NewTripFormValues>({
    name: "",
    from: new Date(),
    to: new Date(),
  });

  const createTrip = useMutation(
    trpc.trips.create.mutationOptions({
      onSuccess: () => {
        setOpen(false);
        router.refresh();
      },
    }),
  );

  const handleSubmit = (formData: FormData) => {
    createTrip.mutate({
      name: formValues.name,
      from: formValues.from.toISOString(),
      to: formValues.to.toISOString(),
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        createTrip.reset();
        setFormValues({
          name: "",
          from: new Date(),
          to: new Date(),
        });
      }}
    >
      <DialogTrigger
        render={
          <Button type="button" size="icon" aria-label={t("open")}>
            <Plus />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <Form action={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">{t("name")}</FieldLabel>
              <Input
                required
                name="name"
                value={formValues.name}
                onChange={(event) =>
                  setFormValues((values) => ({
                    ...values,
                    name: event.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <FieldLabel>{t("from")}</FieldLabel>
              <DatePicker
                mode="single"
                selected={formValues.from}
                onSelect={(date) =>
                  setFormValues((values) => ({
                    ...values,
                    from: date ?? new Date(),
                  }))
                }
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="to">{t("to")}</FieldLabel>
              <DatePicker
                mode="single"
                selected={formValues.to}
                onSelect={(date) =>
                  setFormValues((values) => ({
                    ...values,
                    to: date ?? new Date(),
                  }))
                }
              />
            </Field>
            {createTrip.isError && (
              <p className="text-sm text-destructive" role="alert">
                {t(createTrip.error.message as Parameters<typeof t>[0])}
              </p>
            )}
            <DialogFooter>
              <Button type="submit" disabled={createTrip.isPending}>
                {createTrip.isPending ? t("creating") : t("create")}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTripDialog;
