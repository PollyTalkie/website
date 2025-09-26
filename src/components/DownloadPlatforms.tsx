import React from 'react';
import { motion } from 'framer-motion';
import { Apple, ArrowRight, Skull } from 'lucide-react';

interface DownloadPlatformsProps {
  locale: string;
}

export function DownloadPlatforms({ locale }: DownloadPlatformsProps) {
  // Use the exact translations from the portal
  const t = (key: string) => {
    const translations = locale === 'zh' ? {
      'download.ios.name': 'iOS应用',
      'download.ios.description': '为iPhone和iPad下载博语通（PollyTalkie）',
      'download.ios.step1': '在您的iOS设备上打开App Store',
      'download.ios.step2': '搜索\'博语通（PollyTalkie）\'',
      'download.ios.step3': '点击\'获取\'安装应用',
      'download.ios.step4': '打开应用并开始学习',
      'download.ios.buttonText': '在App Store上下载',
      'download.ios.requirements': '需要iOS 14.0或更高版本',
      'download.android.name': 'Android应用',
      'download.android.evilGoogleTitle': '谷歌正在作恶',
      'download.android.evilGoogleDescription': '谷歌滥用权力，无理终止了我们的开发者账户，导致我们无法在Google Play商店上发布PollyTalkie。我们坚信透明和用户的选择权，因此我们现在提供直接下载。',
      'download.android.evilGoogleStep1': '由于谷歌不公正的政策，我们的应用已无法在Google Play商店上架。',
      'download.android.evilGoogleStep2': '请使用下方的直接APK下载部分来安装应用。',
      'download.android.requirements': '需要Android 8.0或更高版本',
      'download.installationSteps': '安装步骤'
    } : {
      'download.ios.name': 'iOS App',
      'download.ios.description': 'Download PollyTalkie for iPhone and iPad',
      'download.ios.step1': 'Open the App Store on your iOS device',
      'download.ios.step2': 'Search for \'PollyTalkie Language Learning\'',
      'download.ios.step3': 'Tap \'Get\' to install the app',
      'download.ios.step4': 'Open the app and start learning',
      'download.ios.buttonText': 'Download on App Store',
      'download.ios.requirements': 'Requires iOS 14.0 or later',
      'download.android.name': 'Android App',
      'download.android.evilGoogleTitle': 'Google Is Doing Evil',
      'download.android.evilGoogleDescription': 'Google has abused its power and terminated our developer account without any valid reason, which prevents us from distributing PollyTalkie on the Google Play Store. We believe in transparency and the user\'s right to choose, so we are now providing a direct download.',
      'download.android.evilGoogleStep1': 'Our app is no longer available on the Google Play Store due to Google\'s unfair policies.',
      'download.android.evilGoogleStep2': 'Please use the direct APK download section below to install the app.',
      'download.android.requirements': 'Requires Android 8.0 or later',
      'download.installationSteps': 'Installation Steps'
    };
    return translations[key as keyof typeof translations] || key;
  };

  const platforms = [
    {
      name: t('download.ios.name'),
      icon: Apple,
      description: t('download.ios.description'),
      steps: [
        t('download.ios.step1'),
        t('download.ios.step2'),
        t('download.ios.step3'),
        t('download.ios.step4')
      ],
      buttonText: t('download.ios.buttonText'),
      href: "https://apps.apple.com/us/app/pollytalkie/id6746112550",
      systemRequirements: t('download.ios.requirements')
    },
    {
      name: t('download.android.name'),
      icon: Skull,
      evilTitle: t('download.android.evilGoogleTitle'),
      description: t('download.android.evilGoogleDescription'),
      steps: [
        t('download.android.evilGoogleStep1'),
        t('download.android.evilGoogleStep2'),
      ],
      systemRequirements: t('download.android.requirements')
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
      {platforms.map((platform, index) => {
        const Icon = platform.icon;
        return (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative flex flex-col p-6 bg-card text-card-foreground rounded-lg border border-border"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 rounded-full bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">{platform.name}</h2>
            </div>
            
            {platform.evilTitle && (
              <h3 className="text-lg font-bold text-destructive mb-2">{platform.evilTitle}</h3>
            )}
            <p className="text-muted-foreground mb-6">
              {platform.description}
            </p>

            <div className="space-y-6 flex-1">
              <div className="space-y-4">
                <h3 className="font-semibold">{t('download.installationSteps')}</h3>
                <ul className="space-y-2">
                  {platform.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                        {stepIndex + 1}
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {platform.href && platform.buttonText && (
                <div className="space-y-2">
                  <motion.a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full group inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {platform.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                  <p className="text-xs text-center text-muted-foreground">
                    {platform.systemRequirements}
                  </p>
                </div>
              )}
              
              {!platform.href && (
                <p className="text-xs text-center text-muted-foreground">
                  {platform.systemRequirements}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
