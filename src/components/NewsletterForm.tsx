import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { submitForm } from "@/lib/forms";

export function NewsletterForm() {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);

  const schema = z.object({
    email: z.string().min(1, t("forms.requiredField")).email(t("forms.invalidEmail")),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setSubmitting(true);
    const result = await submitForm("newsletter", values);
    setSubmitting(false);
    if (result.ok) {
      toast.success(t("forms.toastSuccess"));
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex max-w-sm flex-col gap-3 sm:flex-row"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input type="email" placeholder={t("home.newsletterPlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submitting}>
          {t("home.newsletterCta")}
        </Button>
      </form>
    </Form>
  );
}
