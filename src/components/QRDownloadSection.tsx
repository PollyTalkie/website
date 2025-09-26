import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Download, ArrowRight } from 'lucide-react';
import QRCode from 'react-qr-code';

interface QRDownloadSectionProps {
  locale: string;
}

export function QRDownloadSection({ locale }: QRDownloadSectionProps) {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const texts = locale === 'zh' ? {
    directDownload: '直接下载',
    scanQrCode: '扫描二维码或点击下方按钮直接下载 APK 文件',
    downloadInstructions: '下载说明',
    step1: '扫描上方二维码或点击下载按钮',
    step2: '在设置中允许"未知来源"安装',
    step3: '找到下载的 APK 文件并点击安装',
    step4: '安装完成后打开应用并登录',
    downloadApk: '下载 APK 文件',
    apkFileSize: '文件大小：约 25MB'
  } : {
    directDownload: 'Direct Download',
    scanQrCode: 'Scan the QR code or click the button below to download the APK file directly',
    downloadInstructions: 'Download Instructions',
    step1: 'Scan the QR code above or click the download button',
    step2: 'Allow "Unknown sources" in your device settings',
    step3: 'Find the downloaded APK file and tap to install',
    step4: 'Open the app after installation and sign in',
    downloadApk: 'Download APK File',
    apkFileSize: 'File size: ~25MB'
  };

  const fallbackUrl = 'https://github.com/PollyTalkie/website/releases/latest';

  // Fetch the latest APK download URL from GitHub API
  useEffect(() => {
    const fetchDownloadUrl = async () => {
      try {
        setLoading(true);
        setError(false);
        
        // Fetch latest release from GitHub API
        const response = await fetch('https://api.github.com/repos/PollyTalkie/website/releases/latest');
        
        if (!response.ok) {
          throw new Error('Failed to fetch release data');
        }
        
        const releaseData = await response.json();
        
        // Look for APK asset in the release
        const apkAsset = releaseData.assets?.find((asset: any) => 
          asset.name.toLowerCase().endsWith('.apk')
        );
        
        if (apkAsset && apkAsset.browser_download_url) {
          setDownloadUrl(apkAsset.browser_download_url);
        } else {
          // No APK found, use fallback URL
          setDownloadUrl(fallbackUrl);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching download URL:', err);
        // On error, use fallback URL
        setDownloadUrl(fallbackUrl);
        setError(false); // Don't show error, just use fallback
        setLoading(false);
      }
    };

    fetchDownloadUrl();
  }, []);


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="mt-16 p-8 bg-primary/5 border-2 border-primary/20 rounded-xl max-w-3xl mx-auto text-center"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <QrCode className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">{texts.directDownload}</h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        {texts.scanQrCode}
      </p>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="p-4 bg-white rounded-lg border border-primary/20">
          {loading && (
            <div className="w-[200px] h-[200px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          {downloadUrl && !loading && (
            <QRCode
              value={downloadUrl}
              size={200}
              level="H"
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            />
          )}
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">{texts.downloadInstructions}</h3>
          <ul className="space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">1</span>
              <span className="text-muted-foreground">{texts.step1}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">2</span>
              <span className="text-muted-foreground">{texts.step2}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">3</span>
              <span className="text-muted-foreground">{texts.step3}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">4</span>
              <span className="text-muted-foreground">{texts.step4}</span>
            </li>
          </ul>
          
          <motion.a
            href={downloadUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full group inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-11 px-8 ${
              loading || !downloadUrl 
                ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
            whileHover={!loading && downloadUrl ? { scale: 1.02 } : {}}
            whileTap={!loading && downloadUrl ? { scale: 0.98 } : {}}
          >
            <Download className="mr-2 h-5 w-5" />
            {texts.downloadApk}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <p className="text-xs text-center text-muted-foreground">
            {texts.apkFileSize}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
