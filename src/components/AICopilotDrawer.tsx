import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, ArrowRight, Zap, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
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
      text: `👋 **Welcome to the Ersatzteilstore AI Profit Copilot!**

I am continuously monitoring real-time margins across your **20.4M SKU catalog**, syncing **Shopify, Google Ads, Meta Ads, and GA4**.

You can ask me anything about your unit economics, profit leaks, or international expansion. Click one of the test questions below to start:`,
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

    // Simulate smart AI analysis latency
    setTimeout(() => {
      const response = analyzeQuery(query, products, campaigns);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 600);
  };

  if (!isOpen) return null;

  const renderFormattedInline = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[540px] md:w-[620px] bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col backdrop-blur-xl animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-100 text-sm">Profit Intelligence Copilot</h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                Online
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Live reasoning engine over Shopify & Ad Networks
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Suggested Quick Prompts Bar */}
      <div className="p-3 bg-slate-900/40 border-b border-slate-800/80">
        <div className="text-[11px] text-slate-400 font-medium mb-1.5 flex items-center gap-1">
          <Zap className="w-3 h-3 text-cyan-400" />
          <span>Afram's Test Questions (Click to execute):</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => handleSend('Which products are the most profitable after deducting all costs?')}
            className="text-left text-xs px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-blue-600/20 border border-slate-700/60 hover:border-blue-500/40 text-slate-200 transition-all flex items-center justify-between group"
          >
            <span>💰 "Which products are the most profitable after deducting all costs?"</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
          </button>
          <button
            onClick={() => handleSend('Where are we currently losing money?')}
            className="text-left text-xs px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-600/20 border border-slate-700/60 hover:border-rose-500/40 text-slate-200 transition-all flex items-center justify-between group"
          >
            <span>🚨 "Where are we currently losing money?"</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-400 transition-colors" />
          </button>
          <button
            onClick={() => handleSend('Which marketing budgets should we optimize?')}
            className="text-left text-xs px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-amber-600/20 border border-slate-700/60 hover:border-amber-500/40 text-slate-200 transition-all flex items-center justify-between group"
          >
            <span>📈 "Which marketing budgets should we optimize?"</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors" />
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
              <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4 text-blue-400" />
              </div>
            )}

            <div
              className={`max-w-[88%] rounded-2xl p-4 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed space-y-2">
                {msg.text.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h4 key={idx} className="font-bold text-sm text-white pt-1">
                        {renderFormattedInline(paragraph.replace('### ', ''))}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('#### ')) {
                    return (
                      <h5 key={idx} className="font-semibold text-xs text-blue-300 pt-1">
                        {renderFormattedInline(paragraph.replace('#### ', ''))}
                      </h5>
                    );
                  }
                  return <p key={idx}>{renderFormattedInline(paragraph)}</p>;
                })}
              </div>

              {/* Table Data if available */}
              {msg.tableData && (
                <div className="mt-3 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/70 p-2">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                        {msg.tableData.headers.map((h, i) => (
                          <th key={i} className="p-1.5">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {msg.tableData.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-900/60">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-1.5 text-slate-300 font-medium">
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
                <div
                  className={`mt-3 p-3 rounded-xl border flex items-start gap-2.5 ${
                    msg.highlightAlert.type === 'success'
                      ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300'
                      : msg.highlightAlert.type === 'danger'
                      ? 'bg-rose-950/30 border-rose-800/50 text-rose-300'
                      : 'bg-amber-950/30 border-amber-800/50 text-amber-300'
                  }`}
                >
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-xs">{msg.highlightAlert.title}</span>
                    <span className="text-[11px] opacity-90">{msg.highlightAlert.description}</span>
                  </div>
                </div>
              )}

              {/* Suggested Follow-up Actions */}
              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-800/60">
                  <span className="text-[10px] text-slate-400 block mb-1.5 font-medium">
                    Suggested Next Moves:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestedActions.map((action, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => handleSend(action)}
                        className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-left"
                      >
                        ⚡ {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div
                className={`text-[9px] mt-2 ${
                  msg.sender === 'user' ? 'text-blue-200' : 'text-slate-500'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 items-center text-slate-400 text-xs p-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <Bot className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[11px] text-slate-400 ml-1">Analyzing cross-channel unit economics...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/60">
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
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white transition-all shadow-md shadow-blue-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
