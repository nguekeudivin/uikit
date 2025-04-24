"use client";

import { users } from "@/api-call/mocks/users";
import InputSearch from "@/components/common/form/SearchField";
import { Button } from "@/components/ui/button";
import { Check, MapPin } from "lucide-react";
import { useState } from "react";

export default function ProfileFriends() {
  const [results, setResults] = useState<any[]>(users);
  const [keyword, setKeyword] = useState<string>("");

  const handleChange = (e: any) => {
    setKeyword(e.target.value);
    setResults(() =>
      users.filter(
        (item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.role.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <>
      <div className="md:flex items-center justify-between mb-4 md:mb-0">
        <h3 className="text-2xl font-semibold mb-4 md:mb-0">Followers</h3>
        <InputSearch onChange={handleChange} className="w-full md:w-auto" />
      </div>
      {results.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {results.map((item, index) => (
            <div
              key={`friend${index}`}
              className="relative shadow rounded-xl p-8 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-12 h-12 bg-cover rounded-full"
                  style={{ backgroundImage: `url(${item.avatar})` }}
                ></div>
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-muted-foreground flex gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{item.country}</span>
                  </p>
                </div>
              </div>
              <div>
                {Math.random() > 0.5 ? (
                  <div className="flex gap-2 items-center">
                    <Check className="text-sky-600 w-5 h-5" />
                    <span className="text-sky-600">Following</span>
                  </div>
                ) : (
                  <Button variant="outline"> Follow</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col h-[400px] border">
          <p className="text-xl font-semibold text-center"> Not found </p>
          <p className="text-center">
            No results found for <span className="font-bold">{keyword}</span>
          </p>
          <p className="text-center">
            Try checking for typos or using complete words.
          </p>
        </div>
      )}
    </>
  );
}
