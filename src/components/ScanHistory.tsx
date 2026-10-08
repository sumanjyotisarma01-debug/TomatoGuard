import React from 'react';
import { History, Trash2, Calendar, CheckCircle2, Clock, AlertTriangle, ExternalLink, ArrowRight } from 'lucide-react';
import { DiagnosisRecord } from '../types/disease';

interface ScanHistoryProps {
  records: DiagnosisRecord[];
  onSelectRecord: (record: DiagnosisRecord) => void;
  onDeleteRecord: (id: string) => void;
  onUpdateStatus: (id: string, status: 'monitoring' | 'in_progress' | 'resolved') => void;
  onClearAll: () => void;
}

export const ScanHistory: React.FC<ScanHistoryProps> = ({
  records,
  onSelectRecord,
  onDeleteRecord,
  onUpdateStatus,
  onClearAll,
}) => {
  if (records.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <History className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">No Saved Plant Records Yet</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          When you analyze a tomato specimen, click &ldquo;Save to Garden Records&rdquo; to track disease progression,
          treatment milestones, and spray history over the season.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold mb-1">
            <History className="w-4 h-4" />
            <span>SEASON LOGBOOK</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Diagnosed Plant Records ({records.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track treatment regimens and health recovery for your tomato garden beds.
          </p>
        </div>

        <button
          onClick={onClearAll}
          className="text-xs font-semibold text-rose-700 hover:text-rose-800 hover:bg-rose-50 px-3 py-2 rounded-lg border border-rose-200 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      {/* Record Cards */}
      <div className="space-y-4">
        {records.map((rec) => {
          const dateStr = new Date(rec.timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div
              key={rec.id}
              className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={rec.imageDataUrl}
                    alt={rec.diagnosis.condition}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">
                      {rec.diagnosis.condition}
                    </h3>
                    <span
                      className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold ${
                        rec.diagnosis.severity === 'Healthy'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rec.diagnosis.severity === 'Critical' || rec.diagnosis.severity === 'Severe'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {rec.diagnosis.severity}
                    </span>
                  </div>

                  <p className="text-xs italic font-serif text-slate-500">
                    {rec.diagnosis.scientificName}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {dateStr}
                    </span>
                    <span>·</span>
                    <span>Confidence: {rec.diagnosis.confidence}%</span>
                  </div>

                  {rec.notes && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-1.5 rounded text-[11px] mt-1 border border-slate-100">
                      Note: {rec.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex flex-wrap sm:flex-col items-end gap-2.5 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="flex items-center gap-1.5">
                  <label className="text-[11px] font-semibold text-slate-500">Status:</label>
                  <select
                    value={rec.treatmentStatus}
                    onChange={(e) =>
                      onUpdateStatus(
                        rec.id,
                        e.target.value as 'monitoring' | 'in_progress' | 'resolved'
                      )
                    }
                    className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer font-medium"
                  >
                    <option value="monitoring">Monitoring</option>
                    <option value="in_progress">In Treatment</option>
                    <option value="resolved">Resolved / Recovered</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectRecord(rec)}
                    className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Diagnosis</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => onDeleteRecord(rec.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
