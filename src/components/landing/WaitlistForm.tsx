import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const WaitlistForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("waitlist")
        .insert([{ email: values.email }]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You've been added to our waitlist. Stay tuned!",
      });
      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message === "duplicate key value violates unique constraint \"waitlist_email_key\""
          ? "This email is already on the waitlist!"
          : "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="h-12 text-base bg-white/95 border-white/20 placeholder:text-gray-500"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage className="text-white" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full h-12 text-base bg-white text-emerald-800 hover:bg-white/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Join the Waitlist"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default WaitlistForm;