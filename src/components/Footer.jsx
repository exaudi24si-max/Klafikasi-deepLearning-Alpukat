const Footer = () => {
  return (
    <footer
      id="about"
      className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-16 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-green-500/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-green-500/10 rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-3xl">🥑</span>
            <span className="text-xl font-bold">
              Avocado<span className="text-green-400">Vision</span>
            </span>
          </div>

          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Sistem klasifikasi tingkat kematangan dan identifikasi pembusukan
            pada buah alpukat berbasis{" "}
            <span className="text-white font-medium">Deep Learning</span> dengan
            metode <span className="text-white font-medium">CNN</span>
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-500/10 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold mb-2">Penambangan Data</h3>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Mata kuliah yang mempelajari ekstraksi informasi berharga dari dataset menggunakan teknik machine learning
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-500/10 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold mb-2">CNN</h3>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Convolutional Neural Network — arsitektur deep learning untuk memproses data visual/gambar
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-500/10 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold mb-2">3 Kelas Output</h3>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Mentah 🟢 — Matang 🟡 — Busuk 🔴 dengan confidence score real-time
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-24 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

        {/* Bottom */}
        <div className="text-center space-y-2">
          <p className="text-gray-500 text-xs">
            Dibangun dengan ❤️ EXAUDI & HASBI
          </p>
          <p className="text-gray-600 text-[10px] tracking-wider font-medium">
            Penambangan Data • Deep Learning CNN • Klasifikasi Alpukat
          </p>
          <p className="text-gray-700 text-[9px] tracking-widest uppercase mt-4">
            © 2025 Sistem Klasifikasi Kematangan Alpukat
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
