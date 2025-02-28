"use client";

import { friends } from "@/api-call/endpoints/users";
import InputSearch from "@/components/common/form/InputSearch";
import colors from "@/lib/colors";
import icons from "@/lib/icons";
import { format } from "date-fns";
import { EllipsisVertical } from "lucide-react";
import { ComponentType, useState } from "react";

const galleries = [
  {
    title:
      "Exploring the Impact of Artificial Intelligence on Modern Healthcare",
    date: "2025-02-27T10:25:03.413000Z",
    category: "Gallery",
    image: "/assets/images/booking/booking-1.jpg",
  },
  {
    title: "Climate Change and Its Effects on Global Food Security",
    date: "2025-02-26T10:25:03.413000Z",
    category: "Gallery",
    image: "/assets/images/booking/booking-2.jpg",
  },
  {
    title: "The Rise of Remote Work: Benefits, Challenges, and Future Trends",
    date: "2025-02-25T10:25:03.413000Z",
    category: "Gallery",
    image: "/assets/images/booking/booking-3.jpg",
  },
  {
    title: "Understanding Blockchain Technology: Beyond Cryptocurrency",
    date: "2025-02-24T10:25:03.413000Z",
    category: "Gallery",
    image: "/assets/images/booking/booking-4.jpg",
  },
  {
    title:
      "Mental Health in the Digital Age: Navigating Social Media and Well-being",
    date: "2025-02-23T10:25:03.413000Z",
    category: "Gallery",
    image: "/assets/images/booking/booking-5.jpg",
  },
  {
    title: "Sustainable Fashion: How the Industry is Going Green",
    date: "2025-02-22T10:25:03.413000Z",
    category: "Gallery",
    image: "/assets/images/booking/booking-1.jpg",
  },
  {
    title:
      "Space Exploration: New Frontiers and the Quest for Extraterrestrial Life",
    date: "2025-02-21T10:25:03.413000Z",
    category: "Gallery",
    image: "/assets/images/booking/booking-2.jpg",
  },
  {
    title:
      "The Evolution of E-Commerce: Trends Shaping the Online Retail Landscape",
    date: "2025-02-20T10:25:03.413000Z",
    category: "Gallery",
    image: "/assets/images/booking/booking-3.jpg",
  },
  {
    title:
      "Cybersecurity in the 21st Century: Protecting Data in a Digital World",
    date: "2025-02-19T10:25:03.413000Z",
    category: "Gallery",
    image: "/assets/images/booking/booking-4.jpg",
  },
  {
    title: "The Role of Big Data in Transforming Business Strategies",
    date: "2025-02-18T10:25:03.413000Z",
    category: "Gallery",
    image: "/assets/images/booking/booking-5.jpg",
  },
  {
    title: "Genetic Engineering: Ethical Considerations and Future Prospects",
    date: "2025-02-17T10:25:03.413000Z",
    category: "Gallery",
    image: "/assets/images/booking/booking-1.jpg",
  },
  {
    title: "Genetic Engineering: Ethical Considerations and Future Prospects",
    date: "2025-02-17T10:25:03.413000Z",
    category: "Gallery",
    image: "/assets/images/booking/booking-2.jpg",
  },
];

export default function ProfileFriends() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Gallery</h3>
      </div>
      <div className="grid grid-cols-4 gap-8 mt-8">
        {galleries.map((item, index) => (
          <div
            key={`gallery${index}`}
            style={{
              backgroundImage: `url(${item.image})`,
            }}
            className=" bg-cover h-72 shadow rounded-xl overflow-hidden"
          >
            <div className="relative flex flex-col justify-end bg-gray-900/80 text-white p-4 w-full h-full ">
              <p className="font-bold">{item.title}</p>
              <p className="text-white/50">
                {format(item.date, "dd MMM yyyy")}
              </p>

              <button className="absolute top-8 right-8">
                <EllipsisVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
