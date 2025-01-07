import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Inbox, Newspaper, Headphones } from "lucide-react";
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
        <title>AI Newsletter Hub - Join the Waitlist</title>
        <meta
          name="description"
          content="Transform your newsletter experience with AI-powered curation and personalization. Join the waitlist for early access!"
        />
        <meta
          name="keywords"
          content="AI newsletter, newsletter management, personalized news, AI curation"
        />
        <meta property="og:title" content="AI Newsletter Hub - Join the Waitlist" />
        <meta
          property="og:description"
          content="Transform your newsletter experience with AI-powered curation and personalization. Join the waitlist for early access!"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-emerald-800 via-emerald-600 to-white animate-gradient-flow relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg
            className="w-full h-full opacity-30"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <path
              className="wave animate-wave fill-current text-emerald-400"
              d="M0,500 C150,400 350,300 500,500 C650,700 850,600 1000,500 V1000 H0 V500Z"
            >
              <animate
                attributeName="d"
                dur="20s"
                repeatCount="indefinite"
                values="
                  M0,500 C150,400 350,300 500,500 C650,700 850,600 1000,500 V1000 H0 V500Z;
                  M0,500 C150,600 350,700 500,500 C650,300 850,400 1000,500 V1000 H0 V500Z;
                  M0,500 C150,400 350,300 500,500 C650,700 850,600 1000,500 V1000 H0 V500Z
                "
              />
            </path>
            <path
              className="wave animate-wave fill-current text-cyan-400"
              d="M0,600 C150,500 350,400 500,600 C650,800 850,700 1000,600 V1000 H0 V600Z"
              opacity="0.3"
            >
              <animate
                attributeName="d"
                dur="15s"
                repeatCount="indefinite"
                values="
                  M0,600 C150,500 350,400 500,600 C650,800 850,700 1000,600 V1000 H0 V600Z;
                  M0,600 C150,700 350,800 500,600 C650,400 850,500 1000,600 V1000 H0 V600Z;
                  M0,600 C150,500 350,400 500,600 C650,800 850,700 1000,600 V1000 H0 V600Z
                "
              />
            </path>
          </svg>
        </div>

        <div className="w-full max-w-4xl mx-auto text-center space-y-8 animate-fade-in relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
            Your Newsletters, Intelligently Curated
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Let AI transform your newsletter experience. Get personalized summaries, audio briefings, and a clutter-free inbox.
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
              Join hundreds of professionals streamlining their content consumption
            </p>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto mt-32 px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/20 hover:bg-white/20 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-6">
                <Newspaper className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Curation</h3>
              <p className="text-white/80">
                Our AI models work 24/7 to curate and summarize content that matters to you. No more endless searching or information overload.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/20 hover:bg-white/20 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-6">
                <Headphones className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Daily Audio Briefings</h3>
              <p className="text-white/80">
                Get your personalized news podcast every morning. Listen to AI-narrated summaries of your most important updates while on the go.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/20 hover:bg-white/20 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-6">
                <Inbox className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Inbox Zero</h3>
              <p className="text-white/80">
                Redirect newsletters to our platform and keep your inbox clean. Access all your subscriptions in one beautiful, distraction-free space.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;