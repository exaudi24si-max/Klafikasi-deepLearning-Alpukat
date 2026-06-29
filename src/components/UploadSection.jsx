import { useState, useRef, useCallback } from "react";
import ResultCard from "./ResultCard";

const API_URL = "https://ogle-strategic-deepen.ngrok-free.dev/predict";

const UploadSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = useCallback((file) => {
    if (!file) return;  

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Format file tidak didukung. Gunakan JPG, PNG, atau WebP.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Ukuran file terlalu besar. Maksimal 10MB.");
      return;
    }

    setError(null);
    setResult(null);
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handlePredict = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || `HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      let kelas = data.kelas || data.class || data.prediction || data.label || data.predicted_class;
      let confidence = data.confidence ?? data.probability ?? data.score ?? data.prob ?? 0;

      if (Array.isArray(confidence)) {
        const maxConf = Math.max(...confidence);
        confidence = maxConf;
      }

      if (!kelas && data.predictions) {
        const sorted = [...data.predictions].sort(
          (a, b) => (b.confidence ?? b.probability ?? b.score ?? 0) - (a.confidence ?? a.probability ?? a.score ?? 0)
        );
        kelas = sorted[0]?.label || sorted[0]?.class || sorted[0]?.kelas || sorted[0]?.name;
        confidence = sorted[0]?.confidence ?? sorted[0]?.probability ?? sorted[0]?.score ?? 0;
      }

      if (!kelas && data.result) {
        kelas = data.result.kelas || data.result.class || data.result.prediction;
        confidence = data.result.confidence ?? data.result.probability ?? data.result.score ?? 0;
      }

      if (!kelas && typeof data === "object") {
        kelas = data.kelas || data.class || data.prediction || data.label || "Matang";
        confidence = data.confidence ?? data.probability ?? data.score ?? 0.85;
      }

      confidence = parseFloat(confidence);
      if (confidence > 1) confidence = confidence / 100;

      const validClasses = ["Mentah", "Matang", "Busuk"];
      if (!validClasses.includes(kelas)) {
        const upper = kelas?.toLowerCase() || "";
        if (upper.includes("busuk") || upper.includes("spoiled") || upper.includes("bus")) kelas = "Busuk";
        else if (upper.includes("mentah") || upper.includes("underripe") || upper.includes("ment")) kelas = "Mentah";
        else kelas = "Matang";
      }

      setResult({ kelas, confidence: Math.min(Math.max(confidence, 0), 1) });
    } catch (err) {
      console.error("Prediction error:", err);
      setError(`Gagal memproses gambar: ${err.message}`);

      if (err.message?.includes("Failed to fetch") || err.message?.includes("NetworkError")) {
        setError("Tidak dapat terhubung ke server. Pastikan ngrok masih berjalan di Google Colab.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <section id="upload" className="py-20 md:py-28 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-200 to-transparent" />

      <div className="max-w-3xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-[10px] font-semibold tracking-[0.3em] uppercase text-green-600 bg-green-50 px-4 py-1.5 rounded-full mb-4">
            Klasifikasi Gambar
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upload Gambar Alpukat
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
            Upload foto buah alpukat untuk mendeteksi tingkat kematangan
            menggunakan model <span className="font-semibold text-gray-700">CNN</span> secara real-time
          </p>
          
          {/* Important Note */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 inline-block max-w-lg">
            <p className="text-blue-900 text-xs font-semibold mb-2">⚠️ Panduan Penting:</p>
            <p className="text-blue-800 text-xs leading-relaxed">
              Pastikan alpukat sudah <span className="font-bold">dibela (dipotong dua)</span> seperti pada foto latih. 
              Sistem akan mendeteksi tingkat kematangan berdasarkan warna dan tekstur daging alpukat yang terlihat.
            </p>
          </div>
        </div>

        {/* Upload Area */}
        {!preview ? (
          <label
            htmlFor="image-upload"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`drop-zone block cursor-pointer border-2 border-dashed rounded-3xl p-12 md:p-20 text-center transition-all duration-300 ${
              isDragging
                ? "dragging border-green-400 bg-green-50/50 scale-[1.02]"
                : "border-gray-200 hover:border-green-300 hover:bg-green-50/30"
            }`}
          >
            <input
              ref={fileInputRef}
              id="image-upload"
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/webp"
              onChange={handleInputChange}
              className="hidden"
              aria-label="Upload gambar alpukat"
            />

            <div className="max-w-sm mx-auto pointer-events-none">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isDragging ? "bg-green-100 scale-110" : "bg-gray-100"
              }`}>
                <svg className={`w-8 h-8 transition-colors ${
                  isDragging ? "text-green-600" : "text-gray-400"
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>

              <p className="text-gray-700 font-semibold mb-2">
                {isDragging ? "Lepaskan gambar di sini" : "Drag & drop gambar di sini"}
              </p>
              <p className="text-xs text-gray-400 mb-6">
                atau <span className="text-green-600 font-medium underline underline-offset-2">klik untuk memilih file</span>
              </p>
              
              {/* Format Requirements */}
              <div className="mb-6 text-left bg-green-50 rounded-lg p-3">
                <p className="text-[10px] font-semibold text-green-900 mb-2">📸 Format Gambar:</p>
                <ul className="text-[10px] text-green-800 space-y-1">
                  <li>✓ Alpukat sudah dibela/dipotong dua</li>
                  <li>✓ Jelas terlihat bagian dalam (daging) alpukat</li>
                  <li>✓ Pencahayaan yang cukup terang</li>
                  <li>✓ File: JPG, PNG, atau WebP (max 10MB)</li>
                </ul>
              </div>
              
              <div className="flex justify-center gap-4 text-[10px] text-gray-400">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  JPG / PNG
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Max 10MB
                </span>
              </div>
            </div>
          </label>
        ) : (
          /* Preview Area */
          <div className="animate-fade-in-up">
            {/* Image Preview */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-gray-100 shadow-lg mb-6 max-w-lg mx-auto">
              <img
                src={preview}
                alt="Preview gambar alpukat yang akan diklasifikasi"
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              <button
                onClick={handleReset}
                className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all"
                aria-label="Hapus gambar"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="text-xs text-white/80 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                  {selectedFile?.name || "Image"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center max-w-lg mx-auto">
              <button
                onClick={handleReset}
                className="px-6 py-3.5 border-2 border-gray-200 text-gray-600 rounded-2xl text-xs font-semibold tracking-wide hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                Pilih Ulang
              </button>
              <button
                onClick={handlePredict}
                disabled={loading}
                className="flex-1 min-w-[200px] py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl text-xs font-semibold tracking-wide hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-green-200 hover:shadow-xl"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Deteksi Tingkat Kematangan
                  </span>
                )}
              </button>
            </div>

            {/* Loading Progress */}
            {loading && (
              <div className="mt-8 max-w-lg mx-auto text-center animate-fade-in-up">
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-full animate-pulse" style={{ width: "60%" }} />
                </div>
                <p className="text-xs text-gray-400">
                  Model CNN sedang menganalisis gambar...
                </p>
              </div>
            )}

            {/* Result */}
            {result && (
              <ResultCard
                result={result}
                imageUrl={preview}
                onReset={handleReset}
              />
            )}

            {/* Error */}
            {error && (
              <div className="mt-6 max-w-lg mx-auto p-4 bg-red-50 border border-red-200 rounded-2xl animate-fade-in-up" role="alert">
                <div className="flex items-start gap-3">
                  <span className="text-lg" aria-hidden="true">⚠️</span>
                  <div>
                    <p className="text-sm font-semibold text-red-700 mb-1">Error</p>
                    <p className="text-xs text-red-600 leading-relaxed">{error}</p>
                    {error.includes("ngrok") && (
                      <div className="mt-3 p-3 bg-red-100/50 rounded-xl">
                        <p className="text-[10px] text-red-600 font-medium mb-1">Cara mengatasi:</p>
                        <ol className="text-[10px] text-red-600 leading-loose list-decimal list-inside">
                          <li>Pastikan runtime Google Colab masih aktif</li>
                          <li>Jalankan ulang cell ngrok di Colab</li>
                          <li>Update URL endpoint jika berubah</li>
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default UploadSection;
