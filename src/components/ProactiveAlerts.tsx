import React from 'react';
import { AnomalyAlert } from '../types';
import { AlertCircle, AlertTriangle, TrendingUp, CheckCircle, ArrowRight, Zap, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AlertsProps {
  alerts: AnomalyAlert[];
  onApplyAlert: (alertId: string) => void;
}

export const ProactiveAlerts: React.FC<AlertsProps> = ({ alerts, onApplyAlert }) => {
  const handleApply = (alert: AnomalyAlert) => {
    confetti({
      particleCount: 50,
      spread: 45,
      colors: ['#dc2626', '#ffffff', '#000000'],
      origin: { y: 0.7 }
    });
    onApplyAlert(alert.id);
  };

  return (
    <div className="p-6 bg-black border border-neutral-800 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white font-mono text-xs font-bold px-2 py-0.5 uppercase">
              WATCHDOG
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight">
                Autonomous Anomaly Alerts
              </h3>
              <p className="text-xs text-neutral-400 font-sans">
                Continuous scans detecting margin drains across 20M catalog items
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 bg-neutral-900 border border-neutral-700 text-white">
            {alerts.filter(a => !a.applied).length} Active Alerts
          </span>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => {
            const isCritical = alert.type === 'critical_leak';
            const isOpportunity = alert.type === 'scale_opportunity';

            return (
              <div
                key={alert.id}
                className={`p-4 border transition-all ${
                  alert.applied
                    ? 'bg-neutral-950 border-neutral-800 opacity-50'
                    : isCritical
                    ? 'bg-neutral-950 border-red-600 border-l-4'
                    : isOpportunity
                    ? 'bg-neutral-950 border-neutral-700 border-l-4 border-l-white'
                    : 'bg-neutral-950 border-neutral-800 border-l-4 border-l-red-500'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    {alert.applied ? (
                      <CheckCircle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                    ) : isCritical ? (
                      <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    ) : isOpportunity ? (
                      <TrendingUp className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap font-mono">
                        <span className="font-serif font-bold text-sm text-white">{alert.title}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-neutral-900 border border-neutral-700 text-neutral-300 uppercase">
                          {alert.region}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-neutral-900 border border-neutral-700 text-neutral-400 uppercase">
                          {alert.category}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-300 mt-1 leading-relaxed font-sans">
                        {alert.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right font-mono">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 ${
                        isCritical
                          ? 'text-white bg-red-600'
                          : isOpportunity
                          ? 'text-black bg-white font-bold'
                          : 'text-neutral-200 bg-neutral-800'
                      }`}
                    >
                      {alert.metric}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-neutral-400 font-sans flex items-center gap-1">
                    <span className="font-mono text-neutral-300 font-bold">Action:</span>
                    <span className="text-neutral-200">{alert.actionText}</span>
                  </span>

                  {alert.applied ? (
                    <span className="text-xs font-mono text-neutral-400 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-red-500" /> APPLIED
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(alert)}
                      className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white transition-all shrink-0 flex items-center gap-1"
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
