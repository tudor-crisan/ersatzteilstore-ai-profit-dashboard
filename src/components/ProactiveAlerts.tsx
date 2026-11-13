import React from 'react';
import { AnomalyAlert } from '../types';
import { AlertCircle, AlertTriangle, TrendingUp, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AlertsProps {
  alerts: AnomalyAlert[];
  onApplyAlert: (alertId: string) => void;
}

export const ProactiveAlerts: React.FC<AlertsProps> = ({ alerts, onApplyAlert }) => {
  const handleApply = (alert: AnomalyAlert) => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    onApplyAlert(alert.id);
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                AI Autonomous Watchdog
              </h3>
              <p className="text-xs text-slate-400">
                Continuous machine learning scans detecting profit drains & expansion opportunities
              </p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {alerts.filter(a => !a.applied).length} Active Anomalies
          </span>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => {
            const isCritical = alert.type === 'critical_leak';
            const isOpportunity = alert.type === 'scale_opportunity';

            return (
              <div
                key={alert.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  alert.applied
                    ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                    : isCritical
                    ? 'bg-rose-950/20 border-rose-800/40 hover:border-rose-700/60'
                    : isOpportunity
                    ? 'bg-emerald-950/20 border-emerald-800/40 hover:border-emerald-700/60'
                    : 'bg-amber-950/20 border-amber-800/40 hover:border-amber-700/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    {alert.applied ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : isCritical ? (
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    ) : isOpportunity ? (
                      <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-slate-100">{alert.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-slate-800 text-slate-300">
                          {alert.region}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-slate-800 text-slate-400">
                          {alert.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {alert.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        isCritical
                          ? 'text-rose-400 bg-rose-500/10'
                          : isOpportunity
                          ? 'text-emerald-400 bg-emerald-500/10'
                          : 'text-amber-400 bg-amber-500/10'
                      }`}
                    >
                      {alert.metric}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <span>💡 Action:</span>
                    <span className="text-slate-300 font-medium">{alert.actionText}</span>
                  </span>

                  {alert.applied ? (
                    <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(alert)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-sm ${
                        isOpportunity
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : isCritical
                          ? 'bg-rose-600 hover:bg-rose-500 text-white'
                          : 'bg-amber-600 hover:bg-amber-500 text-white'
                      }`}
                    >
                      <span>Execute Fix</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
