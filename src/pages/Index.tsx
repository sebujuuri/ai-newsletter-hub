import { Inbox, Newspaper, Headphones } from "lucide-react";
import { Helmet } from "react-helmet";
import FeatureCard from "@/components/landing/FeatureCard";
import WaitlistForm from "@/components/landing/WaitlistForm";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>AI Newsletter Hub - Smart Newsletter Management & Curation</title>
        <meta
          name="description"
          content="Transform your newsletter experience with AI-powered newsletter aggregator, curation, personalized audio briefings, and intelligent inbox management. Join the future of content consumption!"
        />
        <meta
          name="keywords"
          content="AI newsletter management, newsletter aggregator, personalized news, newsletter curation, audio briefings, inbox zero, content aggregation"
        />
        <meta property="og:title" content="AI Newsletter Hub - Smart Newsletter Management & Curation" />
        <meta
          property="og:description"
          content="Transform your newsletter experience with AI-powered newsletter aggregator, curation, personalized audio briefings, and intelligent inbox management. Join the future of content consumption!"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Newsletter Hub - Smart Newsletter Management" />
        <meta
          name="twitter:description"
          content="AI-powered newsletter aggregator, curation and audio briefings for the modern professional."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "AI Newsletter Hub",
            "description": "AI-powered newsletter aggregator, curation and management platform",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "availability": "ComingSoon"
            },
            "featureList": [
              "AI-powered content curation",
              "Newsletter aggregation",
              "Personalized audio briefings",
              "Intelligent inbox management"
            ]
          })}
        </script>
      </Helmet>

      <main className="min-h-screen flex flex-col items-center justify-start p-4 bg-gradient-to-br from-emerald-800 via-emerald-600 to-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg
            className="w-full h-full opacity-20"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <path
              className="wave fill-current text-emerald-400"
              d="M0,500 C150,400 350,300 500,500 C650,700 850,600 1000,500 V1000 H0 V500Z"
            >
              <animate
                attributeName="d"
                dur="30s"
                repeatCount="indefinite"
                values="
                  M0,500 C150,400 350,300 500,500 C650,700 850,600 1000,500 V1000 H0 V500Z;
                  M0,500 C150,600 350,700 500,500 C650,300 850,400 1000,500 V1000 H0 V500Z;
                  M0,500 C150,400 350,300 500,500 C650,700 850,600 1000,500 V1000 H0 V500Z
                "
              />
            </path>
          </svg>
        </div>

        <div className="w-full max-w-4xl mx-auto text-center space-y-8 pt-12 pb-16 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
            Your Newsletters, Intelligently Curated
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Let AI transform your newsletter experience. Get personalized summaries, audio briefings, and a clutter-free inbox.
          </p>

          <WaitlistForm />

          <div className="pt-4">
            <p className="text-sm text-white/80">
              Join hundreds of professionals streamlining their content consumption
            </p>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto px-4 pb-16 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Newspaper}
              title="AI-Powered Curation"
              description="Our AI models work 24/7 to curate and summarize content that matters to you. No more endless searching or information overload."
            />
            <FeatureCard
              icon={Headphones}
              title="Daily Audio Briefings"
              description="Get your personalized news podcast every morning. Listen to AI-narrated summaries of your most important updates while on the go."
            />
            <FeatureCard
              icon={Inbox}
              title="Inbox Zero"
              description="Redirect newsletters to our platform and keep your inbox clean. Access all your subscriptions in one beautiful, distraction-free space."
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;