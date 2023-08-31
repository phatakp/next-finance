import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../shadcn/ui/button";
import { Calendar } from "../shadcn/ui/calendar";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../shadcn/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/ui/popover";

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  desc?: string;
}

const DateInput: FC<DateInputProps> = ({ name, label, desc }) => {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const error = !!errors[name!]?.message;
  return (
    <FormField
      control={control}
      name={name!}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <Popover>
            <PopoverTrigger asChild className="relative">
              <Button
                variant="ghost"
                className={cn(
                  "block text-left rounded-none h-auto hover:bg-background font-medium rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm  bg-background border-0 border-b-2 border-input appearance-none focus:outline-none focus:ring-0 focus:border-primary peer disabled:cursor-not-allowed disabled:opacity-50",
                  error && "border-destructive text-destructive",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? format(field.value, "PPP") : <span>&nbsp;</span>}
                <CalendarIcon className="h-4 w-4 opacity-50 absolute right-1 top-1/2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() ||
                  date < new Date("1900-01-01") ||
                  isSubmitting
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormLabel>{label}</FormLabel>
          <FormDescription>{desc}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateInput;
