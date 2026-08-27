"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock3, GraduationCap, ArrowRight, Star } from "lucide-react";

const servicePackages = {
  Nails: [
    { label: "4 Weeks", price: 60000 },
    { label: "8 Weeks", price: 110000 },
    { label: "12 Weeks", price: 160000 },
  ],

  Pedicure: [
    { label: "2 Weeks", price: 40000 },
    { label: "1 Month", price: 60000 },
  ],

  Makeup: [
    { label: "1 Month", price: 100000 },
    { label: "4 Months", price: 150000 },
  ],

  "Lash Extension": [
    { label: "2 Weeks", price: 85000 },
    { label: "1 Month", price: 120000 },
    { label: "2 Months", price: 200000 },
  ],

  Tattoo: [
    { label: "2 Weeks", price: 100000 },
    { label: "1 Month", price: 150000 },
    { label: "2 Months", price: 250000 },
  ],
};

const trainings = [
  {
    slug: "nail-tech",
    title: "Nail Tech. Training",
    image: "/images/nailTrain.jpg",
    description:
      "Learn acrylics, gel polish, BIAB, builder gel, polygel, nail art, shaping, structure building and professional salon techniques.",
    packages: servicePackages.Nails,
  },

  {
    slug: "pedicure-training",
    title: "Pedicure Training",
    image: "/images/ped.jpg",
    description:
      "Master dry and wet pedicure, spa pedicure, foot care, callus treatment, massage and salon hygiene.",
    packages: servicePackages.Pedicure,
  },

  {
    slug: "makeup-artistry",
    title: "Makeup Training",
    image: "/images/mak.jpg",
    description:
      "Become a certified makeup artist with bridal, editorial, everyday glam and professional product knowledge.",
    packages: servicePackages.Makeup,
  },

  {
    slug: "lash-extension",
    title: "Lash Extension Training",
    image: "/images/megavol.jpg",
    description:
      "Learn classic, hybrid, volume and wispy lash extensions including retention and mapping techniques.",
    packages: servicePackages["Lash Extension"],
  },

  {
    slug: "microblading-tattoo",
    title: "Tattoo & Microblading Training",
    image: "/images/mic.jpg",
    description:
      "Master brow tattoo, microblading, ombre brows, machine techniques and client safety procedures.",
    packages: servicePackages.Tattoo,
  },
];

export default function TrainingPage() {
  return (
    <div className="bg-pink-50 min-h-screen pt-10">

      {/* HERO */}
      <section className="relative h-[500px] w-full">

        <Image
          src="/images/asset14.png"
          alt="Paradise Academy"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/65 flex items-center justify-center">

          <div className="text-center text-white px-6 max-w-4xl">

            <p className="uppercase tracking-[5px] text-red-500 mb-4">
              Paradise WBL Academy
            </p>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Turn Your Passion for Beauty Into a Career.
            </h1>

         <p className="text-center text-gray-100 mt-4 max-w-3xl mx-auto">
  At Paradise WBL, we believe beauty is a profession. Take the next step toward becoming a{" "}
  <i className="text-red-500">certified beauty professional</i> through{" "}
  <i className="text-red-500">practical, hands-on training</i>. Gain real salon experience,
  business knowledge and professional certification to confidently start or grow your beauty career.
</p>

            {/* <div className="mt-8 flex flex-wrap justify-center gap-4">

              <Link href="/training/training">
                <button className="bg-pink-600 hover:bg-pink-700 px-8 py-4 rounded-full font-semibold flex items-center gap-2">
                  Register Now
                  <ArrowRight size={18}/>
                </button>
              </Link>

              <button className="border border-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition">
                View Courses
              </button>

            </div> */}

          </div>

        </div>

      </section>   
   
<section className="py-10 bg-white">

<div className="max-w-7xl mx-auto px-6">

<div className="text-center">

<h2 className="text-4xl font-bold text-blue-950">
Choose Your Training Program
</h2>

<p className="text-gray-500 mt-3">
Select a professional training program and choose the duration that suits your learning goals and budget.
</p>

</div>

<div className="grid lg:grid-cols-2 gap-10 mt-14">

{trainings.map((course) => (
  <div
    key={course.slug}
    className="rounded-3xl overflow-hidden shadow-lg border border-blue-950 bg-white"
  >

<div className="relative h-64">

<Image
src={course.image}
alt={course.title}
fill
className="object-cover"
/>

<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>

<h3 className="absolute bottom-5 left-5 text-white text-2xl font-bold">
{course.title}
</h3>

</div>

<div className="p-6">

<p className="text-gray-800 leading-7">
{course.description}
</p>

<div className="mt-4 space-y-2">

{course.packages.map((item) => (
  <div
    key={`${course.slug}-${item.label}`}
    className="flex justify-between items-center bg-red-50 rounded-md py-2 px-4"
  >

<div className="flex items-center gap-3">
<Clock3 className="text-red-600" size={20}/>
<span className="text-sm font-medium text-black">{item.label}</span>
</div>

<p className="text-sm font-semibold text-blue-900">
₦{item.price.toLocaleString()}
</p>

</div>
))}

</div>

<Link
  href={`/training/register?course=${course.slug}`}
  className="block"
>
  <button
    type="button"
    className="w-full mt-5 bg-blue-900 hover:bg-blue-950 text-white py-3 rounded-full text-md font-semibold flex justify-center items-center gap-2"
  >
    <GraduationCap size={20} />
    Start Your Application
  </button>
</Link>

</div>

</div>
))}

</div>

</div>

</section>
<section className="py-20 bg-pink-50">

<div className="max-w-6xl mx-auto px-6">

<h2 className="text-4xl font-bold text-center text-blue-950">
Every Student Receives
</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

{[
{
title:"Practical Classes",
text:"Learn with real clients and live demonstrations."
},
{
title:"Professional Training Manual",
text:"Step-by-step course guide throughout your training."
},
{
title:"Certificate",
text:"Receive a certificate after successful completion."
},
{
title:"Business Mentorship",
text:"Learn pricing, branding, customer service and salon management."
}
].map((item, index) => (
  <div
    key={index}
    className="bg-white rounded-2xl p-6 shadow text-center"
  >
<h3 className="font-bold text-lg text-pink-700">
{item.title}
</h3>
<p className="text-gray-600 mt-3 text-sm leading-6">
{item.text}
</p>
</div>
))}

</div>

</div>

</section>

    </div>
  );
}