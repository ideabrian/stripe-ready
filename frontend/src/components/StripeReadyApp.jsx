import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Globe,
  Phone,
  RotateCcw,
  MessageCircle,
  FileText,
  ShieldAlert,
  Megaphone
} from 'lucide-react';

const ProgressCheck = ({ completed }) => (
  completed ? 
    <CheckCircle2 className="text-green-500 w-6 h-6" /> : 
    <XCircle className="text-red-500 w-6 h-6" />
);

const RequirementCard = ({ title, description, completed, onToggle, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-4 border border-gray-200">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button 
            onClick={onToggle}
            className={`px-4 py-2 rounded-md transition-colors ${
              completed 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {completed ? 'Completed' : 'Mark Complete'}
          </button>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

const StripeReadyApp = () => {
  const [requirements, setRequirements] = useState({
    website: false,
    businessInfo: false,
    customerService: false,
    returns: false,
    refunds: false,
    cancellation: false,
    restrictions: false,
    promotions: false
  });

  const toggleRequirement = (key) => {
    setRequirements(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const completedCount = Object.values(requirements).filter(Boolean).length;
  const totalRequirements = Object.keys(requirements).length;
  const progress = (completedCount / totalRequirements) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Stripe Ready</h1>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Progress</h2>
              <span className="text-lg font-medium text-blue-600">
                {completedCount}/{totalRequirements} Requirements Met
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 rounded-full h-4 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {progress === 100 && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Congratulations! You've completed all Stripe requirements.</span>
          </div>
        )}

        <div className="space-y-4">
          <RequirementCard
            title="Accessible Website"
            description="Your website must be publicly accessible without a password and fully functional."
            completed={requirements.website}
            onToggle={() => toggleRequirement('website')}
            icon={Globe}
          />

          <RequirementCard
            title="Business Information"
            description="Your website must display your business name and detailed descriptions of goods/services offered."
            completed={requirements.businessInfo}
            onToggle={() => toggleRequirement('businessInfo')}
            icon={FileText}
          />

          <RequirementCard
            title="Customer Service Contact"
            description="Provide contact details (phone, email, address, or messaging service)."
            completed={requirements.customerService}
            onToggle={() => toggleRequirement('customerService')}
            icon={Phone}
          />

          <RequirementCard
            title="Return Policy"
            description="If you sell physical goods, clearly state your return policy and process."
            completed={requirements.returns}
            onToggle={() => toggleRequirement('returns')}
            icon={RotateCcw}
          />

          <RequirementCard
            title="Refund & Dispute Policy"
            description="Clearly outline your refund and dispute handling procedures."
            completed={requirements.refunds}
            onToggle={() => toggleRequirement('refunds')}
            icon={MessageCircle}
          />

          <RequirementCard
            title="Cancellation Policy"
            description="If applicable, detail your cancellation policy and process."
            completed={requirements.cancellation}
            onToggle={() => toggleRequirement('cancellation')}
            icon={XCircle}
          />

          <RequirementCard
            title="Legal/Export Restrictions"
            description="If applicable, state any legal or export restrictions."
            completed={requirements.restrictions}
            onToggle={() => toggleRequirement('restrictions')}
            icon={ShieldAlert}
          />

          <RequirementCard
            title="Promotion Terms"
            description="Include terms and conditions for any promotional offers."
            completed={requirements.promotions}
            onToggle={() => toggleRequirement('promotions')}
            icon={Megaphone}
          />
        </div>
      </div>
    </div>
  );
};

export default StripeReadyApp;