const Navbar = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🥑</span>
          <span className="font-bold text-gray-800 text-sm tracking-tight">
            Avocado<span className="text-green-600">Vision</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xs tracking-widest uppercase text-gray-500 hover:text-green-600 transition-colors font-medium"
          >
            Beranda
          </button>
          <button
            onClick={() => scrollToSection("upload")}
            className="text-xs tracking-widest uppercase text-gray-500 hover:text-green-600 transition-colors font-medium"
          >
            Klasifikasi
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-xs tracking-widest uppercase text-gray-500 hover:text-green-600 transition-colors font-medium"
          >
            Tentang
          </button>
        </div>

        {/* Badge */}
        <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-semibold text-green-700 tracking-wider uppercase">
            CNN Model
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
