import { useState, useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";

const plans = {
  GBP: [
    { title: "Startup", subTitle: "Best for startups", priceMonth: "£7.01", priceAnnual: "£22.58", default: true, custom: false },
    { title: "Advanced", subTitle: "Best for 100+ team size", priceMonth: "£19.47", priceAnnual: "£38.16", default: false, custom: false },
    { title: "Enterprise", subTitle: "Best value for 1000+ team", priceMonth: "£77.09", priceAnnual: "£116.03", label: "Popular", default: false, custom: false },
    { title: "Custom", subTitle: "Request a custom license", custom: true },
  ],
  INR: [
    { title: "Startup", subTitle: "Best for startups", priceMonth: "₹124", priceAnnual: "₹1499", default: true, custom: false },
    { title: "Advanced", subTitle: "Best for 100+ team size", priceMonth: "₹199", priceAnnual: "₹2399", default: false, custom: false },
    { title: "Enterprise", subTitle: "Best value for 1000+ team", priceMonth: "₹299", priceAnnual: "₹3588", label: "Popular", default: false, custom: false },
    { title: "Custom", subTitle: "Request a custom license", custom: true },
  ],
  USD: [
    { title: "Startup", subTitle: "Best for startups", priceMonth: "$9.00", priceAnnual: "$27.00", default: true, custom: false },
    { title: "Advanced", subTitle: "Best for 100+ team size", priceMonth: "$25.00", priceAnnual: "$50.00", default: false, custom: false },
    { title: "Enterprise", subTitle: "Best value for 1000+ team", priceMonth: "$100.00", priceAnnual: "$150.00", label: "Popular", default: false, custom: false },
    { title: "Custom", subTitle: "Request a custom license", custom: true },
  ],
  AUD: [
    { title: "Startup", subTitle: "Best for startups", priceMonth: "A$13.59", priceAnnual: "A$43.79", default: true, custom: false },
    { title: "Advanced", subTitle: "Best for 100+ team size", priceMonth:  "A$37.75", priceAnnual: "A$73.99", default: false, custom: false },
    { title: "Enterprise", subTitle: "Best value for 1000+ team", priceMonth: "A$149.49", priceAnnual: "A$224.99", label: "Popular", default: false, custom: false },
    { title: "Custom", subTitle: "Request a custom license", custom: true },
  ],
  
  JPY: [
    { title: "Startup", subTitle: "Best for startups", priceMonth: "¥1325.81", priceAnnual: "¥4272.06", default: true, custom: false },
    { title: "Advanced", subTitle: "Best for 100+ team size", priceMonth:  "¥3682.81", priceAnnual:  "¥7218.31", default: false, custom: false },
    { title: "Enterprise", subTitle: "Best value for 1000+ team", priceMonth: "¥14583.94", priceAnnual: "¥21949.56", label: "Popular", default: false, custom: false },
    { title: "Custom", subTitle: "Request a custom license", custom: true },
  ],

SEK: [
  { title: "Startup", subTitle: "Best for startups", priceMonth: "kr94.16", priceAnnual: "kr303.40", default: true, custom: false },
  { title: "Advanced", subTitle: "Best for 100+ team size", priceMonth: "kr261.55", priceAnnual: "kr512.64", default: false, custom: false },
  { title: "Enterprise", subTitle: "Best value for 1000+ team", priceMonth:  "kr1035.74", priceAnnual: "kr1558.84", label: "Popular", default: false, custom: false },
  { title: "Custom", subTitle: "Request a custom license", custom: true },
],
};

export default function PricingPlan({ onClose,onUpgrade  }) {
  const { details, setDetails } = useContext(ProfileContext);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null); 

  const selectedPlans = plans[details.currency] || plans.GBP;

  const handleUpgrade = () => {
    if (selectedPlan) {
      const selectedPrice =
        billingCycle === "monthly" ? selectedPlan.priceMonth : selectedPlan.priceAnnual;
        console.log("Available Currencies:", Object.keys(plans));
        console.log("Selected Currency:", details.currency);
        console.log("Selected Plan Prices:", plans[details.currency]);
      onUpgrade({
        title: selectedPlan.title,
        price: selectedPrice, 
        billingCycle,
      });
  
      onClose(); 
    }
  };
  

  return (
    <div className="max-w-xl mx-auto p-6">
    <div className="flex justify-center mb-6 bg-gray-100 p-1 rounded-lg">
      <button
        className={`px-4 py-2 text-sm font-medium rounded-md ${
          billingCycle === "monthly" ? "bg-gray-900 text-white" : "text-gray-600"
        }`}
        onClick={() => setBillingCycle("monthly")}
      >
        Monthly
      </button>
      <button
        className={`px-4 py-2 text-sm font-medium rounded-md ${
          billingCycle === "annual" ? "bg-gray-900 text-white" : "text-gray-600"
        }`}
        onClick={() => setBillingCycle("annual")}
      >
        Annual
      </button>
    </div>

    <div className="space-y-4">
      {selectedPlans.map((plan) => (
        <div
          key={plan.title}
          onClick={() => {
            if (!plan.custom) {
              setSelectedPlan(plan);
            }
          }}
          className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
            selectedPlan?.title === plan.title && !plan.custom
              ? "bg-blue-500 text-white"
              : "bg-gray-100"
          }`}
        >
          <div>
            <h3 className="font-semibold">{plan.title}</h3>
            <p className="text-sm">{plan.subTitle}</p>
          </div>
          {plan.custom ? (
            <button className="bg-green-500 text-white px-4 py-2 rounded-md">
              Contact Us
            </button>
          ) : (
            <span className="text-lg font-bold">
              {billingCycle === "monthly" ? plan.priceMonth : plan.priceAnnual} / Mon
            </span>
          )}
        </div>
      ))}
    </div>

    <div className="flex justify-between mt-6">
      <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">
        Cancel
      </button>
      <button
        onClick={handleUpgrade}
        disabled={!selectedPlan}
        className={`px-4 py-2 rounded-md ${
          selectedPlan
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Upgrade Plan
      </button>
    </div>
  </div>
  );
}
