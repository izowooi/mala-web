'use client';

import { useState } from 'react';
import { Link, Type, Wifi, Mail } from 'lucide-react';

type InputType = 'url' | 'text' | 'wifi' | 'email';

export default function QRDataInput({ onChange }: { onChange: (data: string) => void }) {
    const [activeTab, setActiveTab] = useState<InputType>('url');

    // State for different inputs
    const [url, setUrl] = useState('https://example.com');
    const [text, setText] = useState('');

    const [wifiSsid, setWifiSsid] = useState('');
    const [wifiPassword, setWifiPassword] = useState('');
    const [wifiEncryption, setWifiEncryption] = useState('WPA');
    const [wifiHidden, setWifiHidden] = useState(false);

    const [emailTo, setEmailTo] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');

    const handleUpdate = () => {
        let finalStr = '';
        if (activeTab === 'url') {
            finalStr = url;
        } else if (activeTab === 'text') {
            finalStr = text;
        } else if (activeTab === 'wifi') {
            // WIFI:T:WPA;S:mynetwork;P:mypassword;H:true;;
            finalStr = `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};H:${wifiHidden};;`;
        } else if (activeTab === 'email') {
            finalStr = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        }
        onChange(finalStr);
    };

    const tabs = [
        { id: 'url', label: 'URL', icon: Link },
        { id: 'text', label: 'Text', icon: Type },
        { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
        { id: 'email', label: 'Email', icon: Mail },
    ] as const;

    return (
        <div className="bg-surface border border-border rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-heading font-semibold mb-6">Enter Your Content</h2>

            {/* Tabs */}
            <div className="flex space-x-2 p-1 bg-surface-hover rounded-lg mb-6 max-w-full overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => {
                            setActiveTab(tab.id);
                            // In a real app we might trigger handleUpdate here, but we'll leave it simple
                        }}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors text-sm font-medium whitespace-nowrap
              ${activeTab === tab.id
                                ? 'bg-surface shadow text-primary'
                                : 'text-foreground/70 hover:text-foreground'}`}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Inputs */}
            <div className="space-y-4" onBlur={handleUpdate}>
                {activeTab === 'url' && (
                    <div>
                        <label className="block text-sm font-medium mb-1">Website URL</label>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow"
                        />
                    </div>
                )}

                {activeTab === 'text' && (
                    <div>
                        <label className="block text-sm font-medium mb-1">Plain Text</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter your text here..."
                            rows={4}
                            className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow resize-none"
                        />
                    </div>
                )}

                {activeTab === 'wifi' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Network Name (SSID)</label>
                            <input
                                type="text"
                                value={wifiSsid}
                                onChange={(e) => setWifiSsid(e.target.value)}
                                placeholder="My WiFi Network"
                                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                value={wifiPassword}
                                onChange={(e) => setWifiPassword(e.target.value)}
                                placeholder="Secret Password"
                                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">Encryption</label>
                                <select
                                    value={wifiEncryption}
                                    onChange={(e) => setWifiEncryption(e.target.value)}
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow"
                                >
                                    <option value="WPA">WPA/WPA2/WPA3</option>
                                    <option value="WEP">WEP</option>
                                    <option value="nopass">None</option>
                                </select>
                            </div>
                            <div className="flex items-center pt-6">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={wifiHidden}
                                        onChange={(e) => setWifiHidden(e.target.checked)}
                                        className="w-4 h-4 rounded text-primary focus:ring-primary border-border"
                                    />
                                    <span className="text-sm font-medium">Hidden Network</span>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'email' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email To</label>
                            <input
                                type="email"
                                value={emailTo}
                                onChange={(e) => setEmailTo(e.target.value)}
                                placeholder="example@example.com"
                                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Subject</label>
                            <input
                                type="text"
                                value={emailSubject}
                                onChange={(e) => setEmailSubject(e.target.value)}
                                placeholder="Hello"
                                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Message</label>
                            <textarea
                                value={emailBody}
                                onChange={(e) => setEmailBody(e.target.value)}
                                placeholder="Your message here..."
                                rows={3}
                                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow resize-none"
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-4 flex justify-end">
                <button onClick={handleUpdate} className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Generate QR
                </button>
            </div>
        </div>
    );
}
