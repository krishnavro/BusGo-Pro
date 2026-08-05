function Features() {
  return (
    <div className="max-w-6xl mx-auto py-16">

      <h2 className="text-3xl font-bold text-center mb-10">
        Why Choose BusGo?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="shadow-md p-6 rounded text-center">
          <h3 className="text-xl font-bold mb-2">
            Fast Booking
          </h3>

          <p>
            Book tickets within seconds.
          </p>
        </div>

        <div className="shadow-md p-6 rounded text-center">
          <h3 className="text-xl font-bold mb-2">
            Secure Payments
          </h3>

          <p>
            Safe and trusted transactions.
          </p>
        </div>

        <div className="shadow-md p-6 rounded text-center">
          <h3 className="text-xl font-bold mb-2">
            Live Updates
          </h3>

          <p>
            Get real-time bus information.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Features;