import { format } from "date-fns";
import {
  CalendarCheck,
  CircleCheck,
  Clock,
  Flag,
  Heart,
  MapPin,
  Phone,
  Share2,
  User,
} from "lucide-react";
import { MdStar } from "react-icons/md";
import { useState } from "react";
import ImagesDiaporama from "@/components/common/ImagesDiaporama";

export default function TourContent() {
  const tour = {
    name: "Amazing Tour Package",
    description: "Explore the best destinations with our amazing tour package.",
    content: `
                <h1>Amazing Tour Package</h1>
                <p>Join us for an unforgettable adventure! This tour package includes:</p>
                <ul>
                  <li>Guided tours to iconic landmarks</li>
                  <li>Comfortable accommodations</li>
                  <li>Delicious meals and local cuisine</li>
                  <li>Transportation in air-conditioned vehicles</li>
                </ul>
                <p>Book now and create memories that last a lifetime!</p>
              `,
    images: [
      { file: undefined, src: "/assets/images/booking/booking-1.jpg" },
      { file: undefined, src: "/assets/images/booking/booking-2.jpg" },
      { file: undefined, src: "/assets/images/booking/booking-3.jpg" },
      { file: undefined, src: "/assets/images/booking/booking-4.jpg" },
      { file: undefined, src: "/assets/images/posts/travel-2.webp" },
      { file: undefined, src: "/assets/images/posts/travel-3.webp" },
      { file: undefined, src: "/assets/images/posts/travel-4.webp" },
    ],
    guides: [
      {
        name: "James Smith",
        avatar: "/assets/images/avatar/avatar-1.webp",
        phoneNumber: "+1 202-555-0143",
      },
      {
        name: "Mary Johnson",
        avatar: "/assets/images/avatar/avatar-2.webp",
        phoneNumber: "+44 20 7946 0958",
      },
    ],
    startDate: new Date(),
    postedDate: "2025-02-18T18:37:00Z",
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    publish: true,
    duration: "7 days",
    destination: "France",
    services: [
      "Audio guide",
      "Lunch",
      "Private tour",
      "Special activities",
      "Entrace Fees",
      "Gratuities",
      "Pick-up and drop off",
      "Professional guide",
      "Transport by air-conditionned",
    ],
    tags: ["Adventure", "Family", "Luxury"],
    price: 100,
    reviews: 200,
  };

  const [show, setShow] = useState<boolean>(false);
  const [initialSlide, setInitialSlide] = useState<number>(0);

  return (
    <>
      <ImagesDiaporama
        images={tour.images.map((item) => item.src)}
        show={show}
        setShow={setShow}
        initialSlide={initialSlide}
      />
      <div className="w-full flex items-center grid grid-cols-1 md:grid-cols-2 gap-2">
        <div
          onClick={() => {
            setInitialSlide(0);
            setShow(true);
          }}
          className="bg-cover h-[500px] w-full bg-center rounded-xl"
          style={{ backgroundImage: `url(${tour.images[0].src})` }}
        ></div>
        <div className="flex grid h-full grid-cols-1 md:grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((position) => (
            <div
              onClick={() => {
                setInitialSlide(position);
                setShow(true);
              }}
              key={`tourimage${position}`}
              className="bg-cover bg-center rounded-xl"
              style={{ backgroundImage: `url(${tour.images[position].src})` }}
            ></div>
          ))}
        </div>
      </div>
      <section className="max-w-3xl mx-auto">
        <header className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{tour.name}</h2>
            <div className="flex items-center gap-2">
              <button>
                <Share2 className="w-5 h-5" />
              </button>
              <button>
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              </button>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-8">
            <div className="flex items-center gap-1">
              <MdStar className="w-4 h-4 text-yellow-500" />
              <div className="flex items-center gap-1">
                <span className="font-semibold">4.5</span>
                <span className="text-muted-foreground">
                  ({tour.reviews} Reviews)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-red-500" />
              <span> {tour.destination}</span>
            </div>
            <div className="flex items-center gap-1">
              <Flag className="w-4 h-4 text-sky-500" />
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Guide by</span>
                <span className="font-semibold">
                  {tour.guides.map((guide) => guide.name).join(",")}
                </span>
              </div>
            </div>
          </div>
        </header>
        <ul className="py-8 mt-8 border-t border-b grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: CalendarCheck,
              label: "Date posted",
              value: (
                <>
                  {format(tour.startDate, "dd MMM yyyy")} -{" "}
                  {format(tour.endDate, "dd MMM yyyy")}{" "}
                </>
              ),
            },
            {
              icon: Clock,
              label: "Duration",
              value: tour.duration,
            },
            {
              icon: User,
              label: "Contact name",
              value: tour.guides.map((guide) => guide.name).join(","),
            },
            {
              icon: Phone,
              label: "Contact Phone",
              value: tour.guides.map((guide) => guide.phoneNumber).join(","),
            },
          ].map((item, index) => (
            <li key={`tourinto${index}`} className="flex gap-4 items-center">
              <div>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="pt-3">
                <p className="text-gray-600">{item.label}</p>
                <p className="font-semibold">{item.value}</p>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mt-6">Job description</h3>
        <p>{tour.description}</p>

        <div
          className="-ml-4 ProseMirror p-0 rounded-lg"
          dangerouslySetInnerHTML={{ __html: tour.content }}
        ></div>

        <div className="mt-4 border-t pt-4">
          <h3 className="font-semibold text-2xl"> Services </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {tour.services.map((item, index) => (
              <li
                key={`tourservice${index}`}
                className="items-center flex gap-2"
              >
                <CircleCheck className="text-green-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
