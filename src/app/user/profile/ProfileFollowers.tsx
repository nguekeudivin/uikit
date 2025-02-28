"use client";

import { friends } from "@/api-call/endpoints/users";
import InputSearch from "@/components/common/form/InputSearch";
import { Button } from "@/components/ui/button";
import { Check, MapPin } from "lucide-react";
import { useState } from "react";

export default function ProfileFriends() {
  const [results, setResults] = useState<any[]>(friends);
  const [keyword, setKeyword] = useState<string>("");

  const handleChange = (e: any) => {
    setKeyword(e.target.value);
    setResults(() =>
      friends.filter(
        (item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.role.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Followers</h3>
        <InputSearch onChange={handleChange} />
      </div>
      {results.length ? (
        <div className="grid grid-cols-4 gap-8">
          {results.map((item, index) => (
            <div
              key={`friend${index}`}
              className="relative shadow rounded-xl p-8 flex items-center justify-between gap-2"
            >
              <div>
                <div
                  className="w-12 h-12 bg-cover rounded-full"
                  style={{ backgroundImage: `url(${item.avatar})` }}
                ></div>
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-muted-foreground flex gap-2">
                    <MapPin />
                    <span>{item.country}</span>
                  </p>
                </div>
              </div>
              <div>
                {item.following ? (
                  <div className="flex gap-2">
                    <Check className="text-green-400 w-4 h-4" />
                    <span>Following</span>
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
