import React, { useState } from 'react';
import { Calculator, AlertTriangle, Clock, Droplets, ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface PreselectedTreatment {
  name: string;
  dosageText?: string;
  frequency?: string;
}

interface DosageCalculatorProps {
  initialTreatment?: PreselectedTreatment | null;
}

interface RecipePreset {
  id: string;
  name: string;
  type: 'organic' | 'chemical';
  ratePerLiter: number; // in ml or grams
  unit: 'ml' | 'g';
  needsEmulsifier: boolean;
  emulsifierRatePerLiter?: number;
  intervalDays: number;
  bestTime: string;
  safetyNotes: string;
  reentryIntervalHours: number;
}

const PRESET_RECIPES: RecipePreset[] = [
  {
    id: 'neem-oil',
    name: 'Pure Cold-Pressed Neem Oil Emulsion',
    type: 'organic',
    ratePerLiter: 5,
    unit: 'ml',
    needsEmulsifier: true,
    emulsifierRatePerLiter: 2,
    intervalDays: 7,
    bestTime: 'Dusk (late evening) when temperatures drop below 28°C (82°F) and pollinators are inactive',
    safetyNotes: 'Always mix soap thoroughly with warm water before adding neem oil to ensure complete emulsification. Test on 1 leaf 24h prior.',
    reentryIntervalHours: 4,
  },
  {
    id: 'copper-octanoate',
    name: 'Liquid Copper Soap (Copper Octanoate)',
    type: 'organic',
    ratePerLiter: 10,
    unit: 'ml',
    needsEmulsifier: false,
    intervalDays: 7,
    bestTime: 'Early morning on dry leaves before rain events',
    safetyNotes: 'Wear gloves. Do not apply in full sun or when temperatures exceed 30°C to avoid copper phytotoxicity. Max 6 applications per season.',
    reentryIntervalHours: 4,
  },
  {
    id: 'potassium-bicarbonate',
    name: 'Potassium Bicarbonate Folio-Spray',
    type: 'organic',
    ratePerLiter: 4,
    unit: 'g',
    needsEmulsifier: true,
    emulsifierRatePerLiter: 1.5,
    intervalDays: 7,
    bestTime: 'Early morning or overcast day',
    safetyNotes: 'Food-grade potassium bicarbonate alters leaf surface pH to suppress spore germination without harming beneficial insects.',
    reentryIntervalHours: 0,
  },
  {
    id: 'bacillus-subtilis',
    name: 'Bacillus subtilis Biofungicide (Serenade)',
    type: 'organic',
    ratePerLiter: 10,
    unit: 'ml',
    needsEmulsifier: false,
    intervalDays: 5,
    bestTime: 'Late afternoon or morning',
    safetyNotes: 'Biological antagonist that colonizes leaf tissue. Safe up to day of harvest (0-day Pre-Harvest Interval).',
    reentryIntervalHours: 4,
  },
  {
    id: 'chlorothalonil',
    name: 'Chlorothalonil Fungicide (e.g. Daconil)',
    type: 'chemical',
    ratePerLiter: 2.5,
    unit: 'ml',
    needsEmulsifier: false,
    intervalDays: 10,
    bestTime: 'Calm morning with zero wind drift',
    safetyNotes: 'Protective broad-spectrum barrier. Wear chemical-resistant gloves, safety goggles, and N95/half-mask respirator. 1-day PHI.',
    reentryIntervalHours: 12,
  },
  {
    id: 'mancozeb',
    name: 'Mancozeb Protectant Fungicide',
    type: 'chemical',
    ratePerLiter: 2.5,
    unit: 'g',
    needsEmulsifier: false,
    intervalDays: 7,
    bestTime: 'Prior to forecasted rainfall',
    safetyNotes: 'Contact fungicide. Observe strict 5-day Pre-Harvest Interval (PHI) on tomato fruit. Highly toxic to aquatic organisms.',
    reentryIntervalHours: 24,
  },
];

export const DosageCalculator: React.FC<DosageCalculatorProps> = ({ initialTreatment }) => {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(() => {
    if (initialTreatment?.name?.toLowerCase().includes('copper')) return 'copper-octanoate';
    if (initialTreatment?.name?.toLowerCase().includes('chlorothalonil')) return 'chlorothalonil';
    if (initialTreatment?.name?.toLowerCase().includes('bicarbonate')) return 'potassium-bicarbonate';
    if (initialTreatment?.name?.toLowerCase().includes('bacillus')) return 'bacillus-subtilis';
    return 'neem-oil';
  });

  const [calcMode, setCalcMode] = useState<'sprayer' | 'plants'>('sprayer');
  const [tankSizeLiters, setTankSizeLiters] = useState<number>(2); // 2L default
  const [numberOfPlants, setNumberOfPlants] = useState<number>(6);
  const [isMatureVines, setIsMatureVines] = useState<boolean>(true);

  const activeRecipe = PRESET_RECIPES.find((r) => r.id === selectedRecipeId) || PRESET_RECIPES[0];

  // If calculating by plant count: mature vines need ~250-350ml runoff, young vines ~120ml
  const effectiveWaterLiters =
    calcMode === 'sprayer'
      ? tankSizeLiters
      : Math.round(((numberOfPlants * (isMatureVines ? 0.3 : 0.15)) + 0.1) * 10) / 10;

  const totalProductAmount = Math.round(effectiveWaterLiters * activeRecipe.ratePerLiter * 10) / 10;
  const totalEmulsifierAmount = activeRecipe.needsEmulsifier && activeRecipe.emulsifierRatePerLiter
    ? Math.round(effectiveWaterLiters * activeRecipe.emulsifierRatePerLiter * 10) / 10
    : 0;

  // Conversions for easy kitchen/garden tools
  const productTeaspoons = Math.round((totalProductAmount / 5) * 10) / 10;
  const productTablespoons = Math.round((totalProductAmount / 15) * 10) / 10;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold mb-1">
              <Calculator className="w-4 h-4" />
              <span>GARDEN APPLICATION UTILITY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tomato Spray Batch & Dosage Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Accurately calibrate organic and chemical spray mixtures to avoid foliage phytotoxicity,
              protect beneficial pollinators, and ensure maximum disease eradication.
            </p>
          </div>

          {initialTreatment && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900 shrink-0">
              <span className="font-semibold block mb-0.5">Diagnosed Leaf Remedy:</span>
              <span>{initialTreatment.name}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
          {/* Step 1: Treatment Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-2">
              1. Select Treatment / Fungicide Formula
            </label>
            <div className="space-y-2">
              {PRESET_RECIPES.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => setSelectedRecipeId(recipe.id)}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer flex items-center justify-between ${
                    selectedRecipeId === recipe.id
                      ? 'border-emerald-700 bg-emerald-50/60 ring-1 ring-emerald-700 font-medium'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="font-semibold text-slate-900 block">{recipe.name}</span>
                    <span className="text-[11px] text-slate-500">
                      Standard Rate: {recipe.ratePerLiter} {recipe.unit}/Liter · Repeat every {recipe.intervalDays} days
                    </span>
                  </div>
                  <span
                    className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-semibold ${
                      recipe.type === 'organic'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {recipe.type}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Calculation Mode */}
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-2">
              2. Calibration Method
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg text-xs font-medium">
              <button
                onClick={() => setCalcMode('sprayer')}
                className={`py-2 rounded-md transition-all cursor-pointer ${
                  calcMode === 'sprayer'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                By Sprayer Tank Size
              </button>
              <button
                onClick={() => setCalcMode('plants')}
                className={`py-2 rounded-md transition-all cursor-pointer ${
                  calcMode === 'plants'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                By Number of Plants
              </button>
            </div>
          </div>

          {/* Mode Specific Inputs */}
          {calcMode === 'sprayer' ? (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Target Tank Sprayer Capacity: <span className="font-mono text-emerald-800 font-bold">{tankSizeLiters} Liters</span>
                </label>
                <span className="text-[11px] text-slate-500 font-mono">
                  ~{(tankSizeLiters * 0.264).toFixed(1)} US Gallons
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="16"
                step="0.5"
                value={tankSizeLiters}
                onChange={(e) => setTankSizeLiters(parseFloat(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>0.5L (Hand Trigger)</span>
                <span>2L (Pressure)</span>
                <span>4L (1 Gal Pump)</span>
                <span>16L (Backpack)</span>
              </div>

              {/* Quick Size Presets */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[1, 2, 3.8, 8, 15].map((size) => (
                  <button
                    key={size}
                    onClick={() => setTankSizeLiters(size)}
                    className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                      tankSizeLiters === size
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-900 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {size === 3.8 ? '1 Gal (3.8L)' : `${size}L`}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Number of Tomato Plants: <span className="font-mono text-emerald-800 font-bold">{numberOfPlants} plants</span>
                  </label>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={numberOfPlants}
                  onChange={(e) => setNumberOfPlants(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>1 Plant</span>
                  <span>10 Vines</span>
                  <span>25 Bed</span>
                  <span>50 Garden Rows</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="matureCanopy"
                  checked={isMatureVines}
                  onChange={(e) => setIsMatureVines(e.target.checked)}
                  className="w-4 h-4 accent-emerald-700 rounded cursor-pointer"
                />
                <label htmlFor="matureCanopy" className="text-xs text-slate-700 cursor-pointer">
                  Full indeterminate mature canopy (flowering/fruiting ~300ml coverage per vine)
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Recipe Output Card */}
        <div className="lg:col-span-6 bg-slate-900 text-white rounded-xl p-6 shadow-md space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[11px] font-mono text-emerald-400 tracking-wider uppercase block">
              CALIBRATED SPRAY RECIPE
            </span>
            <h3 className="text-lg font-bold mt-1 text-white">
              {activeRecipe.name}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Batch calibrated for <span className="text-emerald-300 font-semibold font-mono">{effectiveWaterLiters} L</span> water volume
            </p>
          </div>

          {/* Big Number Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
              <span className="text-[11px] uppercase font-mono text-slate-400 block mb-1">
                Fungicide Concentrate
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-mono font-bold text-emerald-400 tabular-nums">
                  {totalProductAmount}
                </span>
                <span className="text-sm font-mono text-slate-300 uppercase">
                  {activeRecipe.unit}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                ≈ {productTablespoons >= 1 ? `${productTablespoons} tbsp` : `${productTeaspoons} tsp`}
              </span>
            </div>

            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
              <span className="text-[11px] uppercase font-mono text-slate-400 block mb-1">
                Clean Water Volume
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-mono font-bold text-white tabular-nums">
                  {effectiveWaterLiters}
                </span>
                <span className="text-sm font-mono text-slate-300 uppercase">
                  Liters
                </span>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                ≈ {(effectiveWaterLiters * 0.264).toFixed(1)} US Gallons
              </span>
            </div>
          </div>

          {/* Emulsifier if needed */}
          {activeRecipe.needsEmulsifier && (
            <div className="bg-emerald-950/60 border border-emerald-800/70 rounded-lg p-3 text-xs text-emerald-200 flex items-start gap-2.5">
              <Droplets className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-emerald-300">
                  Required Emulsifier: {totalEmulsifierAmount} ml (≈ {Math.round((totalEmulsifierAmount / 5) * 10) / 10} tsp) Mild Soap
                </span>
                <span className="text-[11px] text-emerald-200/80 block mt-0.5">
                  Dissolve unscented pure castile soap in 200ml warm water first before adding oil to prevent separation and leaf oil scorch.
                </span>
              </div>
            </div>
          )}

          {/* Application Protocols */}
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5 text-slate-300">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Ideal Spray Timing: </span>
                <span>{activeRecipe.bestTime}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Application Cycle: </span>
                <span>Re-treat every {activeRecipe.intervalDays} days until no new lesion expansion is visible. Reapply after heavy rain.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-slate-300">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Safety & Pre-Harvest Rules: </span>
                <span>{activeRecipe.safetyNotes}</span>
              </div>
            </div>
          </div>

          {/* Mixing instructions list */}
          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
            <span className="font-semibold text-slate-300 block mb-1">
              Field Mixing Instructions:
            </span>
            <ol className="list-decimal list-inside space-y-1 text-[11px]">
              <li>Fill sprayer tank with 50% of the calculated clean room-temperature water.</li>
              <li>Add the measured concentrate ({totalProductAmount} {activeRecipe.unit}) {activeRecipe.needsEmulsifier ? 'along with soap emulsifier' : ''}.</li>
              <li>Add remaining water to reach exactly {effectiveWaterLiters} L and agitate vigorously.</li>
              <li>Spray underside and tops of leaves until runoff. Shake sprayer periodically during use.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
