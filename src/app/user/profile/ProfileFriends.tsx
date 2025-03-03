"use client";

import { users } from "@/api-call/mocks/users";
import InputSearch from "@/components/common/form/SearchField";
import icons from "@/lib/icons";
import { ComponentType, useState } from "react";
import { colors } from "@/lib/colors";

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
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Friends</h3>
        <InputSearch onChange={handleChange} />
      </div>
      {results.length ? (
        <div className="grid grid-cols-4 gap-8">
          {results.map((item, index) => (
            <div
              key={`friend${index}`}
              className="relative shadow rounded-xl p-8 flex items-center flex-col gap-2"
            >
              <div
                className="w-20 h-20 bg-cover rounded-full"
                style={{ backgroundImage: `url(${item.avatar})` }}
              ></div>
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-muted-foreground">{item.role}</p>
              <div className="flex items-center space-x-2">
                {["facebook", "instagram", "linkedin", "twitter"].map(
                  (social) => {
                    const Icon = icons[social] as ComponentType as any;
                    return (
                      <Icon
                        key={`social${social}${index}`}
                        className="w-4 h-4"
                        style={{ color: colors[social] }}
                      />
                    );
                  }
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
