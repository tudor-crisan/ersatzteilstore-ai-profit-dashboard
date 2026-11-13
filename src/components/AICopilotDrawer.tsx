import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, ArrowRight, Zap, ShieldAlert, TrendingUp } from 'lucide-react';
import { AIChatMessage, ProductItem, CampaignItem } from '../types';
import { analyzeQuery } from '../services/aiAdvisor';

interface AICopilotProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  campaigns: CampaignItem[];
}

export const AICopilotDrawer: React.FC<AICopilotProps> = ({ isOpen, onClose, products, campaigns }) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      timestamp: 'Just now',
      text: `### Ersatzteilstore Profit Intelligence Engine

Continuous telemetry active across **20.4M catalog SKUs**, synchronizing **Shopify Plus, Google Ads & Merchant Center, Meta Graph API, and GA4**.

Click one of Afram's benchmark test questions below to run real-time unit economics analysis:`,
      suggestedActions: [
        'Which products are the most profitable after deducting all costs?',
        'Where are we currently losing money?',
        'Which marketing budgets should we optimize?'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: AIChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = analyzeQuery(query, products, campaigns);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 500);
  };

  if (!isOpen) return null;

  const renderFormattedInline = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[540px] md:w-[620px] bg-black border-l border-neutral-800 shadow-2xl flex flex-col font-sans animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-black">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 flex items-center justify-center font-mono font-bold text-white text-xs">
            AI
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-white text-base">Profit Copilot</h3>
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-bold uppercase">
                Active
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono">
              Direct Unit Economics Query Engine &bull; POAS Analytics
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Suggested Quick Prompts Bar */}
      <div className="p-3 bg-neutral-950 border-b border-neutral-800">
        <div className="text-[11px] text-neutral-400 font-mono font-bold mb-1.5 flex items-center gap-1 uppercase">
          <Zap className="w-3 h-3 text-red-500" />
          <span>Afram's Benchmark Questions (Click to Run):</span>
        </div>
        <div className="flex flex-col gap-1.5 font-mono">
          <button
            onClick={() => handleSend('Which products are the most profitable after deducting all costs?')}
            className="text-left text-xs px-3 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-red-600 text-neutral-200 transition-all flex items-center justify-between group"
          >
            <span>💰 "Which products are the most profitable after deducting all costs?"</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-red-500 transition-colors" />
          </button>
          <button
            onClick={() => handleSend('Where are we currently losing money?')}
            className="text-left text-xs px-3 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-red-600 text-neutral-200 transition-all flex items-center justify-between group"
          >
            <span>🚨 "Where are we currently losing money?"</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-red-500 transition-colors" />
          </button>
          <button
            onClick={() => handleSend('Which marketing budgets should we optimize?')}
            className="text-left text-xs px-3 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-red-600 text-neutral-200 transition-all flex items-center justify-between group"
          >
            <span>📈 "Which marketing budgets should we optimize?"</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-6 h-6 bg-red-600 flex items-center justify-center shrink-0 mt-0.5 text-white font-mono font-bold text-[10px]">
                ES
              </div>
            )}

            <div
              className={`max-w-[90%] p-4 ${
                msg.sender === 'user'
                  ? 'bg-neutral-900 border border-neutral-700 text-white font-mono text-xs'
                  : 'bg-neutral-950 border border-neutral-800 text-neutral-200'
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed space-y-2">
                {msg.text.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h4 key={idx} className="font-serif font-bold text-base text-white pt-1">
                        {renderFormattedInline(paragraph.replace('### ', ''))}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('#### ')) {
                    return (
                      <h5 key={idx} className="font-mono font-bold text-xs text-red-500 pt-1 uppercase">
                        {renderFormattedInline(paragraph.replace('#### ', ''))}
                      </h5>
                    );
                  }
                  return <p key={idx} className="font-sans text-xs text-neutral-300">{renderFormattedInline(paragraph)}</p>;
                })}
              </div>

              {/* Table Data if available */}
              {msg.tableData && (
                <div className="mt-3 overflow-x-auto border border-neutral-800 bg-black p-2 font-mono">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-400 font-bold uppercase">
                        {msg.tableData.headers.map((h, i) => (
                          <th key={i} className="p-1.5">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/80">
                      {msg.tableData.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-neutral-900">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-1.5 text-neutral-200 font-medium">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Highlight Alert Box if available */}
              {msg.highlightAlert && (
                <div className="mt-3 p-3 bg-black border-l-4 border-l-red-600 border border-neutral-800 text-neutral-300 font-sans">
                  <span className="font-serif font-bold block text-white text-xs">{msg.highlightAlert.title}</span>
                  <span className="text-[11px] text-neutral-400 mt-0.5 block">{msg.highlightAlert.description}</span>
                </div>
              )}

              {/* Suggested Follow-up Actions */}
              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-neutral-800">
                  <span className="text-[10px] text-neutral-500 block mb-1.5 font-mono uppercase font-bold">
                    Suggested Next Actions:
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-mono">
                    {msg.suggestedActions.map((action, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => handleSend(action)}
                        className="text-[10px] px-2 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-left transition-colors"
                      >
                        &gt; {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-[9px] mt-2 text-neutral-500 font-mono">
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-6 h-6 bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0 mt-0.5 text-white font-mono text-[10px]">
                YOU
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 items-center text-neutral-400 text-xs p-2 font-mono">
            <div className="w-6 h-6 bg-red-600 flex items-center justify-center text-white text-[10px]">
              ES
            </div>
            <div className="bg-neutral-950 border border-neutral-800 px-3 py-1.5 text-[11px] text-neutral-400">
              Querying cross-channel margin model...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-neutral-800 bg-black">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about SKU margins, ad reallocations, or DE/ES expansion..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 font-mono rounded-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-30 text-white transition-all font-mono font-bold text-xs flex items-center gap-1"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
