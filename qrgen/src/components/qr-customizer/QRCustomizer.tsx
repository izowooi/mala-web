'use client';

export default function QRCustomizer({
    fgColor,
    setFgColor,
    bgColor,
    setBgColor,
}: {
    fgColor: string;
    setFgColor: (c: string) => void;
    bgColor: string;
    setBgColor: (c: string) => void;
}) {
    return (
        <div className="bg-surface border border-border rounded-2xl shadow-sm p-6 mt-6">
            <h2 className="text-xl font-heading font-semibold mb-6">Customize Design</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Pattern Color (Foreground)</label>
                    <div className="flex space-x-3 items-center">
                        <input
                            type="color"
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                        />
                        <input
                            type="text"
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="flex-1 px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none font-mono text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Background Color</label>
                    <div className="flex space-x-3 items-center">
                        <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                        />
                        <input
                            type="text"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="flex-1 px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none font-mono text-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
