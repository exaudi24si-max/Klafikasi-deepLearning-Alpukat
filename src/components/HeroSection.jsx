const HeroSection = () => {
  const scrollToUpload = () => {
    const el = document.getElementById("upload");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-200/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-green-200/30 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-green-200/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-green-200/10 rounded-full" />
      </div>

      {/* Floating Avocados */}
      <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float" style={{ animationDelay: "0s" }}>
        🥑
      </div>
      <div className="absolute bottom-20 right-10 text-6xl opacity-10 animate-float" style={{ animationDelay: "1.5s" }}>
        🥑
      </div>
      <div className="absolute top-1/3 right-20 text-4xl opacity-5 animate-float" style={{ animationDelay: "0.8s" }}>
        🥑
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-green-100 px-4 py-2 rounded-full mb-8 opacity-0 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-[10px] font-semibold text-green-700 tracking-widest uppercase">
            Deep Learning • CNN • Klasifikasi
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 opacity-0 animate-fade-in-up stagger-1">
          Klasifikasi Tingkat
          <br />
          <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 bg-clip-text text-transparent">
            Kematangan Alpukat
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-4 opacity-0 animate-fade-in-up stagger-2 leading-relaxed">
          Sistem identifikasi kematangan dan pembusukan buah alpukat berbasis
          <span className="font-semibold text-gray-700"> Deep Learning </span>
          dengan metode
          <span className="font-semibold text-gray-700"> Convolutional Neural Network (CNN)</span>
        </p>

        {/* Class Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 opacity-0 animate-fade-in-up stagger-3">
          <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Mentah
          </span>
          <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            Matang
          </span>
          <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Busuk
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={scrollToUpload}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl text-sm font-semibold tracking-wide shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 hover:-translate-y-0.5 transition-all duration-300 opacity-0 animate-fade-in-up stagger-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Coba Klasifikasi Sekarang
        </button>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto opacity-0 animate-fade-in-up stagger-4">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">3</p>
            <p className="text-xs text-gray-400 tracking-wider mt-1">Kelas Output</p>
          </div>
          <div className="border-x border-gray-200">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">CNN</p>
            <p className="text-xs text-gray-400 tracking-wider mt-1">Metode</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">Real-time</p>
            <p className="text-xs text-gray-400 tracking-wider mt-1">Deteksi</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
