import React from "react";

const services = [
  {
    id: "01",
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: "02",
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: "03",
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: "04",
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: "05",
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: "06",
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
];

function Services() {
  return (
    <section className="text-white py-20">
      <div className="container mx-auto flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-1/4 pr-8">
          <h2 className="sticky top-20 text-6xl text-purple-300 font-extrabold ">SERVICES</h2>
        </div>
        <div className="lg:w-3/4">
          {services.map((service) => (
            <div key={service.id} className="flex items-start mb-16">
              <div className="mr-6 text-5xl text-purple-300 font-bold">
                {service.id}
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-bold">{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
