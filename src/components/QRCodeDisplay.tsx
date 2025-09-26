import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

interface QRCodeDisplayProps {
  size: number;
  locale: string;
}

export function QRCodeDisplay({ size, locale }: QRCodeDisplayProps) {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const text = locale === 'zh' ? '扫码下载博语通应用' : 'Scan to download PollyTalkie app';
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
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-medium mb-2">{text}</p>
      <div className="p-2 bg-white rounded-lg">
        {loading && (
          <div style={{ width: size, height: size }} className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        {downloadUrl && !loading && (
          <QRCode
            value={downloadUrl}
            size={size}
            level="H"
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          />
        )}
      </div>
      {downloadUrl && (
        <>
          <p className="text-xs text-muted-foreground mt-1 max-w-[180px] break-all text-center">
            {downloadUrl}
          </p>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1"
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {locale === 'zh' ? '直接下载' : 'Direct Download'}
          </a>
        </>
      )}
    </div>
  );
}
