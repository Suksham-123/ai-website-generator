export default function Hero() {
  return (
    <section className="text-center py-20 bg-gradient-to-r from-blue-50 to-blue-100">
      <h2 className="text-4xl font-bold mb-4">Create Websites with Just a Prompt</h2>
      <p className="text-lg mb-6">Type what you want and we’ll generate a fully functional site.</p>
      <input
        type="text"
        placeholder="Describe your website..."
        className="w-3/4 md:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none"
      />
      <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Generate
      </button>
    </section>
  );
}
