import React, { useState, useMemo } from 'react';
import { Search, BookOpen, AlertCircle, Sparkles, Filter, Leaf, ChevronDown, ChevronUp } from 'lucide-react';
import { TOMATO_DISEASES } from '../data/encyclopediaData';
import { EncyclopediaDisease, PathogenCategory } from '../types/disease';

interface DiseaseEncyclopediaProps {
  onSelectSampleForTest?: (imageUrl: string) => void;
}

export const DiseaseEncyclopedia: React.FC<DiseaseEncyclopediaProps> = ({
  onSelectSampleForTest,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedDiseaseId, setExpandedDiseaseId] = useState<string | null>('early-blight');

  const categories = ['All', 'Fungal', 'Bacterial', 'Viral', 'Physiological/Abiotic', 'Pest'];

  const filteredDiseases = useMemo(() => {
    return TOMATO_DISEASES.filter((d) => {
      const matchesCategory =
        selectedCategory === 'All' || d.category === selectedCategory;
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.causes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.commonSymptoms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleExpand = (id: string) => {
    setExpandedDiseaseId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold mb-1">
            <BookOpen className="w-4 h-4" />
            <span>AGRONOMIC FIELD GUIDE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Tomato Disease & Pathogen Encyclopedia
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            Botanical field reference covering common fungal blights, bacterial infections, viral mosaics,
            and nutritional deficiencies affecting Solanum lycopersicum crops.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by symptom, pathogen (e.g. concentric rings, Phytophthora, whiteflies)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Disease Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredDiseases.map((disease) => {
          const isExpanded = expandedDiseaseId === disease.id;
          return (
            <div
              key={disease.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Visual Banner if Image available */}
                {disease.sampleImageUrl && (
                  <div className="relative aspect-16/9 bg-slate-900 overflow-hidden border-b border-slate-100">
                    <img
                      src={disease.sampleImageUrl}
                      alt={disease.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded">
                      {disease.category}
                    </div>
                    {onSelectSampleForTest && (
                      <button
                        onClick={() => onSelectSampleForTest(disease.sampleImageUrl!)}
                        className="absolute bottom-3 right-3 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Run AI Scan on this Leaf</span>
                      </button>
                    )}
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {disease.name}
                      </h3>
                      <span className="text-xs italic font-serif text-slate-500">
                        {disease.scientificName}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold ${
                        disease.severityGrade === 'Healthy'
                          ? 'bg-emerald-100 text-emerald-800'
                          : disease.severityGrade === 'Critical' || disease.severityGrade === 'Severe'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {disease.severityGrade}
                    </span>
                  </div>

                  {/* Typical Onset */}
                  <div className="text-[11px] text-slate-500 mt-1 mb-3">
                    <span className="font-semibold text-slate-700">Typical Onset: </span>
                    {disease.typicalOnset}
                  </div>

                  {/* Common Symptoms */}
                  <div>
                    <h4 className="text-[11px] uppercase font-mono font-semibold text-slate-600 mb-1.5">
                      Diagnostic Symptoms:
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {disease.commonSymptoms.slice(0, isExpanded ? undefined : 2).map((sym, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-700 font-bold">›</span>
                          <span>{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block mb-0.5">Underlying Causes & Vector:</span>
                        <p className="text-slate-600 leading-relaxed">{disease.causes}</p>
                      </div>

                      <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-100">
                        <span className="font-bold text-emerald-900 block mb-0.5">Organic IPM Protocol:</span>
                        <p className="text-emerald-800 leading-relaxed">{disease.organicRemedy}</p>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="font-bold text-slate-900 block mb-0.5">Chemical Intervention:</span>
                        <p className="text-slate-700 leading-relaxed">{disease.chemicalOption}</p>
                      </div>

                      <div>
                        <span className="font-bold text-slate-900 block mb-0.5">Preventative Agronomy:</span>
                        <p className="text-slate-600 leading-relaxed">{disease.prevention}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Expand Toggle Footer */}
              <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => toggleExpand(disease.id)}
                  className="font-medium text-emerald-800 hover:text-emerald-900 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{isExpanded ? 'Hide Details' : 'View Complete Protocol'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDiseases.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
          <AlertCircle className="w-8 h-8 mx-auto text-slate-400 mb-2" />
          <p className="text-sm font-semibold text-slate-700">No diseases match your search criteria</p>
          <p className="text-xs text-slate-500 mt-1">Try adjusting the filter category or search keywords</p>
        </div>
      )}
    </div>
  );
};
