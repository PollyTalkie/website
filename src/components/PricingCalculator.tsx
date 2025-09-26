import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { URLS } from '../lib/env';

interface PricingCalculatorProps {
  locale: string;
}

export function PricingCalculator({ locale }: PricingCalculatorProps) {
  const [addOns, setAddOns] = useState(0);
  
  // Calculate additional time and cost based on add-ons
  const baseHours = 15; // hours per month
  const basePrice = 45; // USD
  const earlyAdopterBasePrice = 30; // USD (early adopter price)
  const addOnHours = 8; // hours per add-on
  const addOnPrice = 20; // USD per add-on
  
  const totalHours = baseHours + (addOns * addOnHours);
  const totalPrice = basePrice + (addOns * addOnPrice);
  const earlyAdopterTotalPrice = earlyAdopterBasePrice + (addOns * addOnPrice);
  
  const incrementAddOn = () => {
    if (addOns < 4) { // Max 4 add-ons (47 hours total)
      setAddOns(addOns + 1);
    }
  };
  
  const decrementAddOn = () => {
    if (addOns > 0) {
      setAddOns(addOns - 1);
    }
  };

  const texts = locale === 'zh' ? {
    faqQuestion: "我可以为常规版计划添加更多小时吗？",
    faqAnswer: "可以！您可以以每个¥130的价格购买额外的8小时对话时间块。",
    title: "附加小时",
    description: "需要更多对话时间？为您的常规版计划添加额外小时。",
    pricePerUnit: "8小时额外时间",
    totalTime: "总计：每月{0}小时",
    totalMonthlyPrice: "每月总价：",
    upgradeHint: "考虑升级到进阶版计划以获得更好的价值！",
    purchaseButton: "购买附加包",
    orText: "或者",
    upgradeButton: "升级到进阶版"
  } : {
    faqQuestion: "Can I add more hours to my Regular plan?",
    faqAnswer: "Yes! You can purchase additional conversation time in 8-hour blocks for just $20 each.",
    title: "Add-on Hours",
    description: "Need more conversation time? Add extra hours to your Regular plan.",
    pricePerUnit: "for 8 additional hours",
    totalTime: "Total: {0} hours per month",
    totalMonthlyPrice: "Total monthly price: ",
    upgradeHint: "Consider upgrading to Aggressive plan for better value!",
    purchaseButton: "Purchase with Add-ons",
    orText: "OR",
    upgradeButton: "Upgrade to Aggressive"
  };

  return (
    <div className="space-y-4 md:col-span-2 bg-muted/30 p-6 rounded-lg border border-border">
      <h3 className="font-semibold text-xl">{texts.faqQuestion}</h3>
      <p className="text-muted-foreground mb-4">
        {texts.faqAnswer}
      </p>
      
      <div className="bg-card p-4 rounded-md shadow-sm border border-border">
        <h4 className="font-medium text-base mb-3">{texts.title}</h4>
        <p className="text-sm text-muted-foreground mb-3">
          {texts.description}
        </p>
        
        <div className="flex items-center justify-between bg-muted/50 p-2 rounded-md mb-3">
          <span className="text-sm">${addOnPrice} {texts.pricePerUnit}</span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <button 
            onClick={decrementAddOn}
            disabled={addOns === 0}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            <Minus className="h-4 w-4" />
          </button>
          
          <div className="flex-1 mx-3">
            <div className="relative pt-1">
              <input
                type="range"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                min="0"
                max="4"
                step="1"
                value={addOns}
                onChange={(e) => setAddOns(parseInt(e.target.value))}
              />
            </div>
          </div>
          
          <button 
            onClick={incrementAddOn}
            disabled={addOns === 4}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        
        <div className="text-sm space-y-1 mt-3">
          <p>{texts.totalTime.replace('{0}', totalHours.toString())}</p>
          <div className="font-semibold">
            <span>{texts.totalMonthlyPrice}</span>
            <span className="text-red-700 line-through opacity-80 mr-2">
              ${totalPrice.toString()}
            </span>
            <span className="text-green-600">
              ${earlyAdopterTotalPrice.toString()}
            </span>
          </div>
          {addOns >= 3 && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
              {texts.upgradeHint}
            </p>
          )}
        </div>
        
        {addOns > 0 && (
          <a
            href={`${URLS.portal.signup}?plan=regular&addOns=${addOns}&totalHours=${totalHours}&totalPrice=${earlyAdopterTotalPrice}`}
            className="w-full mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
          >
            {texts.purchaseButton}
          </a>
        )}
      </div>
      
      <div className="flex justify-center mt-4">
        <span className="text-sm text-muted-foreground">— {texts.orText} —</span>
      </div>
      
      <div className="text-center mt-2">
        <a
          href={`${URLS.portal.signup}?plan=aggressive`}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
        >
          {texts.upgradeButton}
        </a>
      </div>
    </div>
  );
}
