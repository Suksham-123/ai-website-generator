export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">AI SiteBuilder</h1>
        <nav className="space-x-4">
          <a href="#features" className="hover:text-blue-600">Features</a>
          <a href="#preview" className="hover:text-blue-600">Preview</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
        </nav>
      </div>
    </header>
  );
}
