import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingCardProps {
  tier: {
    name: string;
    price: string;
    earlyPrice?: string;
    period?: string;
    description: string;
    features: string[];
    cta: string;
    href: string;
    featured?: boolean;
    freeTrial?: boolean;
  };
  index: number;
  mostPopularText: string;
  freeTrialText: string;
  earlyAdopterText: string;
}

export function PricingCard({ tier, index, mostPopularText, freeTrialText, earlyAdopterText }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col p-4 bg-card text-card-foreground rounded-lg shadow-lg border ${
        tier.featured
          ? "border-primary ring-2 ring-primary"
          : "border-border"
      }`}
    >
      <div className="absolute -top-4 left-0 right-0 flex justify-center gap-2">
        {tier.featured && (
          <span className="bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground rounded-full">
            {mostPopularText}
          </span>
        )}
        {tier.freeTrial && (
          <span className="bg-green-600 px-3 py-1 text-xs font-semibold text-white rounded-full">
            {freeTrialText}
          </span>
        )}
      </div>
      <div className="mb-2">
        <h3 className="text-xl md:text-2xl font-bold text-center">{tier.name}</h3>
        <div className="mt-4 mb-2 flex flex-col">
          <div className="flex flex-col items-center">
            {tier.earlyPrice ? (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-red-700 line-through opacity-80">
                    {tier.price}
                  </span>
                  <span className="text-4xl md:text-5xl font-extrabold text-green-600">{tier.earlyPrice}</span>
                  {tier.period && (
                    <span className="text-sm md:text-base text-muted-foreground">
                      {tier.period}
                    </span>
                  )}
                </div>
                <div className="mt-2 py-1 px-3 bg-green-100 dark:bg-green-900/30 rounded-full text-center">
                  <span className="text-sm md:text-base text-green-600 dark:text-green-400 font-medium">
                    {earlyAdopterText}
                  </span>
                </div>
              </>
            ) : (
              <>
                <span className="text-4xl md:text-5xl font-extrabold">{tier.price}</span>
                {tier.period && (
                  <span className="mt-1 text-sm md:text-base text-muted-foreground">
                    {tier.period}
                  </span>
                )}
              </>                      
            )}
          </div>
        </div>
        <p className="mt-3 text-sm md:text-base text-muted-foreground text-center">
          {tier.description}
        </p>
      </div>
      <ul className="my-6 space-y-3 flex-1 text-sm md:text-base border-t border-b py-4 border-border/30">
        {tier.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start">
            <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm md:text-base">{feature}</span>
          </li>
        ))}
      </ul>
      <motion.a
        href={tier.href}
        className={`w-full mt-4 py-6 text-base font-semibold inline-flex items-center justify-center rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 ${
          tier.featured 
            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
            : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {tier.cta}
      </motion.a>
    </motion.div>
  );
}
