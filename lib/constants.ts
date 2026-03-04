export const PLAN_LIMITS = {
  free: 1,
  basic: 10,
  pro: 50,
} as const;

export interface PriceType {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  paymentLink: string;
  isPopular: boolean;
  limit: number;
  description?: string;
}

export const PLANS: PriceType[] = [
  {
    name: "Free",
    price: "$0",
    features: [
      "1 Free Summary",
      "Basic AI Analysis",
      "Standard Support"
    ],
    buttonText: "Get Started",
    paymentLink: "",
    isPopular: false,
    limit: PLAN_LIMITS.free,
  },
  {
    name: "Basic",
    price: "$9.99",
    features: [
      "10 Summaries per month",
      "Advanced AI features",
      "Priority Email Support",
      "Export capabilities",
    ],
    buttonText: "Upgrade to Basic",
    paymentLink: "https://buy.stripe.com/test_eVaeVv1q97Nf8Q8cMN",
    isPopular: true,
    limit: PLAN_LIMITS.basic,
  },
  {
    name: "Pro",
    price: "$29.99",
    features: [
      "50 Summaries per month",
      "Priority AI Processing",
      "24/7 Dedicated Support",
      "Advanced Export Options",
      "Custom Templates",
    ],
    buttonText: "Upgrade to Pro",
    paymentLink: "https://buy.stripe.com/test_8wM4gR8Ot0oRbhS3ce",
    isPopular: false,
    limit: PLAN_LIMITS.pro,
  },
];

export interface Step {
  step: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const HOW_IT_WORKS: Step[] = [
  {
    step: "01",
    title: "Upload Document",
    description: "Simply securely upload your PDF file. Our system will immediately process and analyze its contents.",
  },
  {
    step: "02",
    title: "AI Analysis",
    description: "Our advanced AI engines scan for key concepts, essential arguments, and critical data points.",
  },
  {
    step: "03",
    title: "Get Summary",
    description: "Receive a clear, structured summary within seconds. Save time and absorb complex info instantly.",
  },
];
