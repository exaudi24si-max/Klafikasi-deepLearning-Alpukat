const classInfo = {
  Mentah: {
    emoji: "🟢",
    icon: "🥑",
    color: "green",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    badge: "bg-green-100 text-green-700",
    progress: "bg-green-500",
    description:
      "Buah alpukat masih mentah. Tekstur keras, belum layak dikonsumsi. Biarkan beberapa hari hingga matang.",
  },
  Matang: {
    emoji: "🟡",
    icon: "🥑",
    color: "yellow",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    badge: "bg-yellow-100 text-yellow-700",
    progress: "bg-yellow-500",
    description:
      "Buah alpukat dalam kondisi matang sempurna. Tekstur empuk, siap dikonsumsi. Rasa terbaik!",
  },
  Busuk: {
    emoji: "🔴",
    icon: "🥑",
    color: "red",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    badge: "bg-red-100 text-red-700",
    progress: "bg-red-500",
    description:
      "Buah alpukat sudah busuk atau overripe. Tekstur terlalu lembek, tidak layak dikonsumsi.",
  },
};

const ResultCard = ({ result, imageUrl, onReset }) => {
  if (!result) return null;

  const { kelas, confidence } = result;
  const info = classInfo[kelas] || classInfo.Matang;

  const confidencePercent = (confidence * 100).toFixed(1);

  return (
    <div className="animate-scale-in w-full max-w-lg mx-auto mt-10">
      <div className={`${info.bg} ${info.border} border-2 rounded-3xl overflow-hidden shadow-lg`}>
        {/* Image Preview */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className={`inline-flex items-center gap-1.5 ${info.badge} px-3 py-1 rounded-full text-xs font-bold tracking-wide`}>
              {info.emoji} {kelas}
            </span>
          </div>
        </div>

        {/* Result Content */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-gray-400 tracking-widest uppercase font-medium mb-1">
                Hasil Klasifikasi
              </p>
              <h3 className={`text-2xl font-bold ${info.text}`}>
                {info.icon} {kelas}
              </h3>
            </div>
            <div className={`text-right ${info.text}`}>
              <p className="text-3xl font-bold">{confidencePercent}%</p>
              <p className="text-xs opacity-70">Confidence</p>
            </div>
          </div>

          {/* Confidence Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-400 mb-1.5">
              <span>Tingkat Keyakinan</span>
              <span className="font-semibold">{confidencePercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${info.progress}`}
                style={{ width: `${confidencePercent}%` }}
              />
            </div>
          </div>

          {/* Description */}
          <div className={`${info.bg} ${info.border} border rounded-2xl p-4 mb-6`}>
            <p className={`text-xs md:text-sm leading-relaxed ${info.text} opacity-80`}>
              {info.description}
            </p>
          </div>

          {/* Rekomendasi */}
          <div className="flex items-start gap-3 mb-6">
            <span className="text-lg">💡</span>
            <p className="text-xs text-gray-500 leading-relaxed">
              {kelas === "Mentah" &&
                "Simpan pada suhu ruang selama 2-5 hari hingga matang. Jangan simpan di kulkas sebelum matang."}
              {kelas === "Matang" &&
                "Segera konsumsi atau simpan di kulkas untuk memperlambat pematangan. Cocok untuk jus, guacamole, atau santapan langsung."}
              {kelas === "Busuk" &&
                "Segera buang jika sudah berbau tidak sedap atau berlendir. Jangan dikonsumsi karena dapat menyebabkan gangguan pencernaan."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onReset}
              className="flex-1 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl text-xs font-semibold tracking-wide hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              ✕ Upload Ulang
            </button>
            <button
              onClick={() => {
                const text = `🍽️ Hasil Klasifikasi Alpukat:\n\n🥑 Kelas: ${kelas}\n📊 Confidence: ${confidencePercent}%\n${info.description}`;
                if (navigator.share) {
                  navigator.share({ title: "Klasifikasi Alpukat", text });
                } else {
                  navigator.clipboard.writeText(text);
                  alert("Hasil disalin ke clipboard!");
                }
              }}
              className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-xs font-semibold tracking-wide hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md"
            >
              📋 Bagikan Hasil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
