export default function Features() {
  return (
    <section id="features" className="py-16 max-w-6xl mx-auto px-4">
      <h3 className="text-2xl font-semibold mb-6 text-center">Why use AI SiteBuilder?</h3>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <h4 className="font-bold text-lg">Fast</h4>
          <p>Generate in seconds. No coding required.</p>
        </div>
        <div>
          <h4 className="font-bold text-lg">Customizable</h4>
          <p>Tailor the layout and design as needed.</p>
        </div>
        <div>
          <h4 className="font-bold text-lg">Responsive</h4>
          <p>Mobile-first designs that work everywhere.</p>
        </div>
      </div>
    </section>
  );
}
