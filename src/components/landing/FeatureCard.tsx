import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-lg p-8 border border-white/20 hover:bg-white/95 transition-colors">
      <div className="h-12 w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-6">
        <Icon className="h-6 w-6 text-emerald-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default FeatureCard;