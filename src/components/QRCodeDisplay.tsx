import React, { useState, useEffect } from 'react';

interface QRCodeDisplayProps {
  size: number;
  locale: string;
}

export function QRCodeDisplay({ size, locale }: QRCodeDisplayProps) {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const text = locale === 'zh' ? '点击下载博语通应用' : 'Click to download PollyTalkie app';

  // Set download URL to our download page
  useEffect(() => {
    const downloadPageUrl = `/${locale}/download`;
    setDownloadUrl(downloadPageUrl);
    setLoading(false);
  }, [locale]);

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-medium mb-2">{text}</p>
      <div className="p-2 bg-white rounded-lg">
        {loading && (
          <div style={{ width: size, height: size }} className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        {error && (
          <div style={{ width: size, height: size }} className="flex items-center justify-center">
            <p className="text-destructive text-sm">Error</p>
          </div>
        )}
        {downloadUrl && !loading && !error && (
          <a 
            href={downloadUrl}
            style={{ width: size, height: size }} 
            className="flex items-center justify-center bg-white border border-primary/20 rounded hover:border-primary/40 transition-colors cursor-pointer"
          >
            <div className="text-center">
              <svg className="h-16 w-16 mx-auto mb-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-xs text-muted-foreground">Click to</p>
              <p className="text-xs text-muted-foreground">Download APK</p>
            </div>
          </a>
        )}
      </div>
      {downloadUrl && (
        <p className="text-xs text-muted-foreground mt-1 max-w-[180px] break-all text-center">
          {downloadUrl}
        </p>
      )}
    </div>
  );
}
