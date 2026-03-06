'use client';

import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { Download } from 'lucide-react';
import { useRef } from 'react';

export default function QRPreview({
    data,
    fgColor,
    bgColor,
}: {
    data: string;
    fgColor: string;
    bgColor: string;
}) {
    const qrRef = useRef<HTMLDivElement>(null);

    const downloadPNG = () => {
        const canvas = qrRef.current?.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.download = 'qrcode.png';
            a.href = url;
            a.click();
        }
    };

    const downloadSVG = () => {
        const svg = qrRef.current?.querySelector('svg');
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.download = 'qrcode.svg';
            a.href = url;
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="bg-surface border border-border rounded-2xl shadow-sm p-6 sticky top-6">
            <h2 className="text-xl font-heading font-semibold mb-6 flex items-center justify-between">
                Live Preview
            </h2>

            <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-800 rounded-xl p-8 mb-6 border border-border/50 overflow-hidden relative min-h-[300px]">
                {data ? (
                    <div ref={qrRef} className="relative shadow-md">
                        {/* We render both so we can download either, but only visible is SVG visually, actually let's just render canvas since qrcode.react handles both well, or we can just render QRCodeCanvas */}
                        <QRCodeCanvas
                            value={data}
                            size={240}
                            bgColor={bgColor}
                            fgColor={fgColor}
                            level="H"
                            includeMargin={true}
                            className="bg-white rounded-lg p-2"
                        />
                        {/* hidden svg for download */}
                        <div className="hidden">
                            <QRCodeSVG
                                value={data}
                                size={1024}
                                bgColor={bgColor}
                                fgColor={fgColor}
                                level="H"
                                includeMargin={true}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-foreground/50">
                        <p>Enter data to generate QR Code</p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={downloadPNG}
                    disabled={!data}
                    className="flex items-center justify-center space-x-2 bg-primary hover:bg-primary-hover text-white px-4 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download className="w-4 h-4" />
                    <span>Save PNG</span>
                </button>
                <button
                    onClick={downloadSVG}
                    disabled={!data}
                    className="flex items-center justify-center space-x-2 bg-surface hover:bg-surface-hover border border-border text-foreground px-4 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download className="w-4 h-4" />
                    <span>Save SVG</span>
                </button>
            </div>
        </div>
    );
}
