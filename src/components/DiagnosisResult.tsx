import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Leaf,
  FlaskConical,
  Sprout,
  AlertOctagon,
  Printer,
  BookmarkPlus,
  Calculator,
  ChevronRight,
  ExternalLink,
  Info,
  CheckCircle2,
  Calendar,
  Share2,
} from 'lucide-react';
import { TomatoDiagnosis, SeverityLevel } from '../types/disease';
import { PathologistChat } from './PathologistChat';

interface DiagnosisResultProps {
  diagnosis: TomatoDiagnosis;
  specimenImage: string;
  onNavigateToCalculator: (treatment: { name: string; dosageText?: string; frequency?: string }) => void;
  onSaveToHistory: () => void;
  isSaved?: boolean;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  diagnosis,
  specimenImage,
  onNavigateToCalculator,
  onSaveToHistory,
  isSaved = false,
}) => {
  const [activeTreatmentTab, setActiveTreatmentTab] = useState<'organic' | 'chemical'>('organic');
  const [checkedTreatments, setCheckedTreatments] = useState<Record<string, boolean>>({});

  const toggleTreatmentCheck = (name: string) => {
    setCheckedTreatments((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const getSeverityStyle = (severity: SeverityLevel) => {
    switch (severity) {
      case 'Healthy':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          text: 'text-emerald-800',
          badge: 'bg-emerald-100 text-emerald-800',
          icon: ShieldCheck,
        };
      case 'Low':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          badge: 'bg-blue-100 text-blue-800',
          icon: Info,
        };
      case 'Moderate':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          badge: 'bg-amber-100 text-amber-800',
          icon: ShieldAlert,
        };
      case 'Severe':
      case 'Critical':
      default:
        return {
          bg: 'bg-rose-50',
          border: 'border-rose-200',
          text: 'text-rose-800',
          badge: 'bg-rose-100 text-rose-800',
          icon: AlertOctagon,
        };
    }
  };

  const severityStyle = getSeverityStyle(diagnosis.severity);
  const SeverityIcon = severityStyle.icon;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Verdict Card */}
      <div className={`rounded-xl border ${severityStyle.border} ${severityStyle.bg} p-6 shadow-xs`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-slate-500">
              <span>{diagnosis.plantPart || 'Foliar'} Pathology Assessment</span>
              <span aria-hidden="true">·</span>
              <span>{diagnosis.pathogenType} Category</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {diagnosis.condition}
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase font-mono tracking-wide ${severityStyle.badge}`}>
                {diagnosis.severity} Severity
              </span>
            </div>

            <p className="text-xs sm:text-sm italic font-serif text-slate-600">
              Pathogen: {diagnosis.scientificName || 'Solanum lycopersicum'}
            </p>

            <p className="text-sm text-slate-700 max-w-3xl leading-relaxed pt-1">
              {diagnosis.summary}
            </p>
          </div>

          {/* Quick Metrics HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3 shrink-0">
            <div className="bg-white/80 rounded-lg p-3 border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">
                Model Confidence
              </span>
              <span className="text-xl font-mono font-bold text-slate-900 tabular-nums">
                {diagnosis.confidence}%
              </span>
            </div>

            <div className="bg-white/80 rounded-lg p-3 border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">
                Action Urgency
              </span>
              <span className="text-xs font-semibold text-slate-900 block mt-1">
                {diagnosis.urgency}
              </span>
            </div>

            <div className="bg-white/80 rounded-lg p-3 border border-slate-200/80 shadow-2xs col-span-2 sm:col-span-1 lg:col-span-1">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">
                Contagion Risk
              </span>
              <span className="text-xs font-semibold text-slate-900 block mt-1">
                {diagnosis.spreadRisk} Spread Risk
              </span>
            </div>
          </div>
        </div>

        {/* Warning if non-tomato was detected */}
        {!diagnosis.isTomatoPlant && (
          <div className="mt-4 p-3 bg-amber-100/80 border border-amber-300 rounded-lg text-xs text-amber-900 flex items-start gap-2">
            <AlertOctagon className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Specimen Note: </span>
              The model suspects this image might not be a standard tomato plant (Solanum lycopersicum). Results are provided based on closest morphological match.
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Specimen Inspection & Visual Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Specimen Visual & Diagnostic Checklist */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-700" />
            Diagnostic Specimen Visuals
          </h3>

          <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
            <img
              src={specimenImage}
              alt="Evaluated leaf specimen"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Observed Morphological Symptoms */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wide font-mono">
              Key Pathology Hallmarks Detected:
            </h4>
            <ul className="space-y-2">
              {diagnosis.visualSymptomsObserved.map((symptom, idx) => (
                <li
                  key={idx}
                  className="text-xs text-slate-700 bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Environmental Conditions */}
          {diagnosis.favorableConditions && (
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-1">
                Disease Promoting Climate:
              </span>
              <p className="text-slate-600 leading-relaxed">
                {diagnosis.favorableConditions}
              </p>
            </div>
          )}

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 no-print">
            <button
              onClick={onSaveToHistory}
              disabled={isSaved}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <BookmarkPlus className="w-3.5 h-3.5" />
              <span>{isSaved ? 'Saved to Records' : 'Save to Garden Records'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-lg text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Pathology Report</span>
            </button>
          </div>
        </div>

        {/* Treatment & Action Plan Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Treatment Tabs Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Recommended Treatment & Eradication Plan
                </h3>
                <p className="text-xs text-slate-500">
                  Follow step-by-step protocols calibrated for tomatoes
                </p>
              </div>

              {/* Segmented Control */}
              <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setActiveTreatmentTab('organic')}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTreatmentTab === 'organic'
                      ? 'bg-white text-emerald-800 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sprout className="w-3.5 h-3.5" />
                  <span>Organic & Bio ({diagnosis.organicTreatments?.length || 0})</span>
                </button>
                <button
                  onClick={() => setActiveTreatmentTab('chemical')}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTreatmentTab === 'chemical'
                      ? 'bg-white text-amber-800 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Chemical / Conventional ({diagnosis.chemicalTreatments?.length || 0})</span>
                </button>
              </div>
            </div>

            {/* Organic Tab Content */}
            {activeTreatmentTab === 'organic' && (
              <div className="space-y-4">
                {diagnosis.organicTreatments && diagnosis.organicTreatments.length > 0 ? (
                  diagnosis.organicTreatments.map((treatment, idx) => {
                    const isChecked = !!checkedTreatments[treatment.name];
                    return (
                      <div
                        key={idx}
                        className={`rounded-xl border p-4 transition-all ${
                          isChecked
                            ? 'border-emerald-300 bg-emerald-50/40'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-start gap-2.5">
                            <input
                              type="checkbox"
                              id={`org-${idx}`}
                              checked={isChecked}
                              onChange={() => toggleTreatmentCheck(treatment.name)}
                              className="w-4 h-4 mt-0.5 accent-emerald-700 rounded cursor-pointer"
                            />
                            <div>
                              <label
                                htmlFor={`org-${idx}`}
                                className={`text-sm font-bold text-slate-900 cursor-pointer block ${
                                  isChecked ? 'line-through text-slate-500' : ''
                                }`}
                              >
                                {treatment.name}
                              </label>
                              <span className="text-xs font-semibold text-emerald-800">
                                Dosage: {treatment.recipeOrDosage} · Frequency: {treatment.applicationFrequency}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              onNavigateToCalculator({
                                name: treatment.name,
                                dosageText: treatment.recipeOrDosage,
                                frequency: treatment.applicationFrequency,
                              })
                            }
                            className="px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                            title="Calculate water & concentrate amount"
                          >
                            <Calculator className="w-3 h-3" />
                            <span>Calibrate Dosage</span>
                          </button>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed mt-2 pl-6">
                          {treatment.instructions}
                        </p>

                        <div className="mt-2.5 pl-6 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                          <span className="font-semibold text-slate-700">How it works: </span>
                          {treatment.mechanism}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-500 p-4 text-center">
                    No specific organic treatments required for this specimen.
                  </p>
                )}
              </div>
            )}

            {/* Chemical Tab Content */}
            {activeTreatmentTab === 'chemical' && (
              <div className="space-y-4">
                {diagnosis.chemicalTreatments && diagnosis.chemicalTreatments.length > 0 ? (
                  diagnosis.chemicalTreatments.map((treatment, idx) => {
                    const isChecked = !!checkedTreatments[treatment.activeIngredient];
                    return (
                      <div
                        key={idx}
                        className={`rounded-xl border p-4 transition-all ${
                          isChecked
                            ? 'border-amber-300 bg-amber-50/40'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-start gap-2.5">
                            <input
                              type="checkbox"
                              id={`chem-${idx}`}
                              checked={isChecked}
                              onChange={() => toggleTreatmentCheck(treatment.activeIngredient)}
                              className="w-4 h-4 mt-0.5 accent-amber-700 rounded cursor-pointer"
                            />
                            <div>
                              <label
                                htmlFor={`chem-${idx}`}
                                className={`text-sm font-bold text-slate-900 cursor-pointer block ${
                                  isChecked ? 'line-through text-slate-500' : ''
                                }`}
                              >
                                {treatment.activeIngredient}
                              </label>
                              <span className="text-xs text-slate-500 block">
                                Commercial Brands: {treatment.productExamples}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              onNavigateToCalculator({
                                name: treatment.activeIngredient,
                                dosageText: treatment.dosage,
                                frequency: treatment.applicationFrequency,
                              })
                            }
                            className="px-2.5 py-1 text-[11px] font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-md transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            <Calculator className="w-3 h-3" />
                            <span>Calibrate Dosage</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 pl-6 my-2">
                          <div className="bg-slate-50 p-2 rounded border border-slate-100">
                            <span className="font-semibold text-slate-900 block text-[11px]">Dosage Rate:</span>
                            {treatment.dosage} (Every {treatment.applicationFrequency})
                          </div>
                          <div className="bg-slate-50 p-2 rounded border border-slate-100">
                            <span className="font-semibold text-slate-900 block text-[11px]">Pre-Harvest Interval (PHI):</span>
                            <span className="text-amber-800 font-bold">{treatment.preHarvestIntervalDays}</span> before fruit harvest
                          </div>
                        </div>

                        <div className="pl-6 pt-1 text-[11px] text-rose-700 font-medium">
                          <span className="font-bold">PPE & Safety Warning: </span>
                          {treatment.safetyPrecautions}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-500 p-4 text-center">
                    Chemical interventions are not recommended for this condition.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Cultural IPM & Physical Pruning Practices */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Agronomic Cultural Practices & Canopy Hygiene
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {diagnosis.culturalPractices.map((practice, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 border border-slate-200/70 rounded-lg text-xs text-slate-700 flex items-start gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-700 shrink-0 mt-1.5" />
                  <span>{practice}</span>
                </div>
              ))}
            </div>

            {/* Long term preventative strategies */}
            {diagnosis.preventiveMeasures && diagnosis.preventiveMeasures.length > 0 && (
              <div className="pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-900 block mb-2 uppercase tracking-wide font-mono">
                  Long-Term Season Prevention & Resistance:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {diagnosis.preventiveMeasures.map((pm, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold">›</span>
                      <span>{pm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Interactive AI Pathologist Chat */}
          <PathologistChat
            diagnosis={diagnosis}
            specimenImage={specimenImage}
          />
        </div>
      </div>
    </div>
  );
};
