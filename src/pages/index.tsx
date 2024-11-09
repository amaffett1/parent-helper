import React, { useState } from 'react';
import { Volume2, VolumeX, RotateCcw, Book, BarChart2, HomeIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

type TabType = 'live' | 'learning' | 'stats';

export default function ParentHelperApp() {
  const [activeTab, setActiveTab] = useState<TabType>('live');
  const [isListening, setIsListening] = useState(false);
  const [lastDetected, setLastDetected] = useState<{
    negative: string;
    positive: string;
    category: string;
  } | null>(null);
  const [detectionCount, setDetectionCount] = useState(0);
  const [detectionHistory, setDetectionHistory] = useState<Array<{
    timestamp: Date;
    phrase: {
      negative: string;
      positive: string;
      category: string;
    };
  }>>([]);

  const phrases = [
    { negative: "non toccare", positive: "via le mani", category: "Sicurezza" },
    { negative: "non correre", positive: "cammina piano", category: "Sicurezza" },
    { negative: "non saltare", positive: "il divano è per sedersi", category: "Comportamento" },
    { negative: "non urlare", positive: "parla a voce bassa", category: "Comunicazione" }
  ];

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simula il rilevamento di frasi quando l'ascolto è attivo
      const interval = setInterval(() => {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setLastDetected(randomPhrase);
        setDetectionCount(prev => prev + 1);
        setDetectionHistory(prev => [...prev, { timestamp: new Date(), phrase: randomPhrase }]);
      }, 5000);

      return () => clearInterval(interval);
    }
  };

  const resetStats = () => {
    setDetectionCount(0);
    setLastDetected(null);
    setDetectionHistory([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg p-6 mb-6 text-white">
          <h1 className="text-2xl font-bold">ParentHelper</h1>
          <p className="opacity-90">Migliora la comunicazione con il tuo bambino</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('live')}
              className={cn(
                "flex items-center gap-2 px-6 py-3 font-medium",
                activeTab === 'live' ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
              )}
            >
              <HomeIcon className="w-4 h-4" /> Live
            </button>
            <button
              onClick={() => setActiveTab('learning')}
              className={cn(
                "flex items-center gap-2 px-6 py-3 font-medium",
                activeTab === 'learning' ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
              )}
            >
              <Book className="w-4 h-4" /> Learning
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={cn(
                "flex items-center gap-2 px-6 py-3 font-medium",
                activeTab === 'stats' ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
              )}
            >
              <BarChart2 className="w-4 h-4" /> Statistiche
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'live' && (
          <div className="space-y-4">
            {/* Control Panel */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Modalità Live</h2>
                  <p className="text-sm text-gray-500">
                    {isListening ? 'In ascolto attivo...' : 'In attesa di iniziare'}
                  </p>
                </div>
                <button
                  onClick={toggleListening}
                  className={cn(
                    "p-4 rounded-full transition-colors",
                    isListening ? "bg-red-100 hover:bg-red-200" : "bg-green-100 hover:bg-green-200"
                  )}
                >
                  {isListening ? (
                    <Volume2 className="w-8 h-8 text-red-600" />
                  ) : (
                    <VolumeX className="w-8 h-8 text-green-600" />
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Frasi Rilevate</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-2xl font-bold text-gray-900">{detectionCount}</span>
                    <button
                      onClick={resetStats}
                      className="p-2 rounded-full hover:bg-gray-200"
                    >
                      <RotateCcw className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Ultimo Rilevamento</div>
                  <div className="text-lg font-medium text-gray-900 truncate">
                    {lastDetected ? lastDetected.category : '-'}
                  </div>
                </div>
              </div>
            </div>

            {/* Alert */}
            {lastDetected && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg animate-fade-in">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-yellow-800 mb-1">
                    Frase negativa rilevata
                  </div>
                  <div className="text-red-500 font-medium">✗ "{lastDetected.negative}"</div>
                  <div className="text-green-600 mt-1">
                    ✓ Prova invece: "{lastDetected.positive}"
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Categoria: {lastDetected.category}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'learning' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Modalità Learning</h2>
            <p className="text-gray-500">
              Analizza le tue conversazioni registrate per migliorare la comunicazione.
            </p>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Statistiche</h2>
            <div className="space-y-4">
              {detectionHistory.slice(-5).map((entry, index) => (
                <div key={index} className="border-b pb-2">
                  <div className="text-sm text-gray-500">
                    {entry.timestamp.toLocaleTimeString()}
                  </div>
                  <div className="text-red-500">"{entry.phrase.negative}"</div>
                  <div className="text-green-600">→ "{entry.phrase.positive}"</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}