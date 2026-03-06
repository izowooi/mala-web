'use client';

import { useState } from 'react';
import QRDataInput from '@/components/qr-form/QRDataInput';
import QRCustomizer from '@/components/qr-customizer/QRCustomizer';
import QRPreview from '@/components/qr-preview/QRPreview';
import { QrCode } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState('');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-surface/80 backdrop-blur-md border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <QrCode className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-heading font-bold tracking-tight">QR Code <span className="text-primary">Generator Pro</span></h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 mt-4">
        <div className="grid lg:grid-cols-12 gap-10">

          {/* Left Column: Editor */}
          <div className="lg:col-span-7 space-y-8">
            <section>
              <div className="mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">Step 1</h2>
                <p className="text-foreground/70">What do you want your QR code to do?</p>
              </div>
              <QRDataInput onChange={setData} />
            </section>

            <section>
              <div className="mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">Step 2</h2>
                <p className="text-foreground/70">Make it your own.</p>
              </div>
              <QRCustomizer
                fgColor={fgColor} setFgColor={setFgColor}
                bgColor={bgColor} setBgColor={setBgColor}
              />
            </section>
          </div>

          {/* Right Column: Preview */}
          <div className="lg:col-span-5 relative">
            <QRPreview
              data={data || 'https://example.com'}
              fgColor={fgColor}
              bgColor={bgColor}
            />
          </div>

        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-8 mt-12 border-t border-border/50 text-center text-foreground/50 text-sm">
        <p>Built dynamically with Next.js & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
