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
import { Helmet } from "react-helmet";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const Index = () => {
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
    <>
      <Helmet>
        <title>AI Newsletter Aggregator - Join the Waitlist</title>
        <meta
          name="description"
          content="Stay ahead of AI trends with our curated newsletter aggregator. Join the waitlist for early access!"
        />
        <meta
          name="keywords"
          content="AI newsletter, artificial intelligence news, tech newsletter, AI updates"
        />
        <meta property="og:title" content="AI Newsletter Aggregator - Join the Waitlist" />
        <meta
          property="og:description"
          content="Stay ahead of AI trends with our curated newsletter aggregator. Join the waitlist for early access!"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-emerald-800 via-emerald-600 to-white animate-gradient-flow">
        <div className="w-full max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
            Your AI News, Curated Daily
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Stay ahead of the curve with our AI newsletter aggregator. 
            Get the most important AI updates delivered to your inbox.
          </p>

          <div className="max-w-md mx-auto w-full space-y-4 animate-fade-in animation-delay-200">
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

          <div className="pt-8 animate-fade-in animation-delay-300">
            <p className="text-sm text-white/80">
              Join hundreds of AI enthusiasts getting smarter every day
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;