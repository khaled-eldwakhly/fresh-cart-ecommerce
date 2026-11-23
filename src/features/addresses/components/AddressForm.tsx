import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { addressSchema, addressSchemaType } from "../schema/address.schema";
import { addNewAddress } from "../server/addresses.actions";
import { toast } from "sonner";

export default function AddressForm({ onSuccess }: { onSuccess: () => void }) {
  const egyptGovernorates = [
    "Cairo",
    "Giza",
    "Alexandria",
    "Qalyubia",
    "Beheira",
    "Matrouh",
    "Gharbia",
    "Monufia",
    "Kafr El Sheikh",
    "Damietta",
    "Dakahlia",
    "Sharqia",
    "Ismailia",
    "Port Said",
    "Suez",
    "North Sinai",
    "South Sinai",
    "Beni Suef",
    "Fayoum",
    "Minya",
    "Assiut",
    "Sohag",
    "Qena",
    "Luxor",
    "Aswan",
    "Red Sea",
    "New Valley",
  ];
  const governorates = egyptGovernorates.map((name) => ({
    label: name,
    value: name,
  }));

  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
  });

  async function handleAddAddress(values: addressSchemaType) {
    try {
      const response = await addNewAddress(values);
      if (response.status === "success") {
        onSuccess();
        toast.success("New address added");
        form.reset({
          name: "",
          city: "",
          details: "",
          phone: "",
        });
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Faield to add address!",
      );
    }
  }
  return (
    <>
      <form
        onSubmit={form.handleSubmit(handleAddAddress)}
        className="space-y-4 p-3"
      >
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="font-semibold -mb-1" htmlFor={field.name}>
                Full Name
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="on"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="flex items-center gap-3">
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="font-semibold -mb-1"
                  htmlFor={field.name}
                >
                  Phone Number (EG)
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="on"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="font-semibold -mb-1"
                  htmlFor={field.name}
                >
                  Your City
                </FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  name={field.name}
                >
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {governorates.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Controller
          name="details"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="font-semibold -mb-1" htmlFor={field.name}>
                Address Details
              </FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="on"
                className="h-20 resize-none"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          type="submit"
          className={`w-full text-base`}
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <p className="flex items-center gap-1">
              <Spinner className="size-6" /> Adding address
            </p>
          ) : (
            "Add an new address"
          )}
        </Button>
      </form>
    </>
  );
}
