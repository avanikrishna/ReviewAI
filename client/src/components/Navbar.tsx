function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-6 border-b border-slate-800">
      <h1 className="text-3xl font-bold">ReviewAI</h1>

      <div className="flex gap-4">
        <button className="text-slate-300 hover:text-white transition">
          Documentation
        </button>

        <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg">
          Sign In
        </button>
      </div>
    </nav>
  );
}

export default Navbar;