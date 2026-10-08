import React, { useRef, useState } from 'react';
import { UploadCloud, Camera, Sparkles, Image as ImageIcon, X } from 'lucide-react';
import { SAMPLE_LEAVES, SampleLeaf } from '../data/sampleLeaves';

interface ImageUploaderProps {
  onAnalyze: (payload: {
    imageBase64: string;
    notes?: string;
    growthEnvironment?: string;
    sampleId?: string;
  }) => void;
  isLoading: boolean;
  onOpenLiveCamera: () => void;
  selectedImage: string | null;
  setSelectedImage: (img: string | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onAnalyze,
  isLoading,
  onOpenLiveCamera,
  selectedImage,
  setSelectedImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [growthStage, setGrowthStage] = useState('Flowering & Fruiting');
  const [environment, setEnvironment] = useState('Outdoor Garden Bed');
  const [growerNotes, setGrowerNotes] = useState('');
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setSelectedImage(result);
      setActiveSampleId(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleSelectSample = async (sample: SampleLeaf) => {
    try {
      setActiveSampleId(sample.id);
      // Fetch image from local path and convert to base64 for seamless sending
      const res = await fetch(sample.imageUrl);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error('Error loading sample image:', err);
      setSelectedImage(sample.imageUrl);
    }
  };

  const handleStartAnalysis = () => {
    if (!selectedImage) return;
    onAnalyze({
      imageBase64: selectedImage,
      notes: growerNotes,
      growthEnvironment: `${environment} (${growthStage})`,
      sampleId: activeSampleId || undefined,
    });
  };

  return (
    <div className="w-full">
      {/* Hero Intro */}
      <div className="mb-6 text-center max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
          Tomato Foliage Disease & Pathogen Diagnostic
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Upload a high-resolution photo of your tomato leaf, stem, or fruit. The diagnostic vision
          model evaluates lesion morphology, pathogen signs, and provides verified organic and chemical treatment protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Upload Box */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {!selectedImage ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isDragOver
                  ? 'border-emerald-600 bg-emerald-50/50 scale-[0.99]'
                  : 'border-slate-200 hover:border-emerald-600/60 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <UploadCloud className="w-7 h-7" />
              </div>
              <p className="text-sm font-semibold text-slate-900 mb-1">
                Drop your tomato leaf photo here, or browse
              </p>
              <p className="text-xs text-slate-500 mb-5">
                Supports JPG, PNG, WEBP (macro leaf underside or upper surface recommended)
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5 inline mr-1.5 text-slate-500" />
                  Select File
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenLiveCamera();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5 inline mr-1.5" />
                  Take Photo Live
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-4/3 sm:aspect-16/10 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                <img
                  src={selectedImage}
                  alt="Tomato leaf inspection specimen"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage(null);
                    setActiveSampleId(null);
                  }}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white transition-colors cursor-pointer"
                  title="Clear image"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded font-mono">
                  Specimen Ready for Analysis
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Choose Different Photo
                </button>
                <button
                  type="button"
                  onClick={onOpenLiveCamera}
                  className="px-3.5 py-2 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                >
                  Retake with Camera
                </button>
              </div>
            </div>
          )}

          {/* Quick Context Settings */}
          <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Growth Stage
              </label>
              <select
                value={growthStage}
                onChange={(e) => setGrowthStage(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:border-emerald-600"
              >
                <option value="Seedling / Young Transplant">Seedling / Young Transplant</option>
                <option value="Vegetative Expansion">Vegetative Expansion</option>
                <option value="Flowering & Fruiting">Flowering & Early Fruiting</option>
                <option value="Ripening / Mature Crop">Ripening / Harvest Stage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Growing Environment
              </label>
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:border-emerald-600"
              >
                <option value="Outdoor Garden Bed">Outdoor Garden Bed / In-Ground</option>
                <option value="Greenhouse / Polytunnel">Greenhouse / High Tunnel</option>
                <option value="Container / Patio Pots">Container / Fabric Pot</option>
                <option value="Hydroponic / Indoor Grow">Hydroponic / Indoor LEDs</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Grower Field Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Yellowing started on lowest branches after 3 days of rain; variety is Cherokee Purple"
                value={growerNotes}
                onChange={(e) => setGrowerNotes(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-5">
            <button
              onClick={handleStartAnalysis}
              disabled={!selectedImage || isLoading}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                !selectedImage || isLoading
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Analyzing Specimen Morphology...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Run Tomato Pathology Diagnosis</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Reference Sample Leaf Benchmarks */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-900">
              Benchmark Sample Specimens
            </h2>
            <span className="text-[11px] text-slate-500">Click to test instant diagnosis</span>
          </div>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Don't have a leaf image right now? Select one of our diagnostic test specimens below to explore the AI disease detection and treatment engine.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {SAMPLE_LEAVES.map((sample) => {
              const isSelected = activeSampleId === sample.id;
              return (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`text-left rounded-lg border p-2.5 transition-all cursor-pointer group flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-700 bg-emerald-50/40 ring-1 ring-emerald-700'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-full aspect-4/3 rounded-md overflow-hidden bg-slate-100 mb-2 border border-slate-100">
                    <img
                      src={sample.imageUrl}
                      alt={sample.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
                      <span>{sample.title}</span>
                    </div>
                    <span className="text-[10px] italic text-slate-500 font-serif block truncate">
                      {sample.subtitle}
                    </span>
                    <span className="text-[10px] text-slate-600 line-clamp-2 mt-1 leading-snug">
                      {sample.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
            <span className="font-semibold text-slate-800">Diagnostic Tip: </span>
            For best accuracy with real field plants, photograph single leaflets against neutral soil or paper background under daylight without intense shadows.
          </div>
        </div>
      </div>
    </div>
  );
};
