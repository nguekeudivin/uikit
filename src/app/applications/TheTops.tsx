import { Download, Heart, Trophy } from "lucide-react";
import UserAvatar from "../../components/custom/UserAvatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { hexToRGBA, kformat } from "@/lib/utils";
import icons from "@/lib/icons";
import Image from "next/image";
import colors from "@/lib/colors";

const topInstalledCountries = [
  {
    code: "de",
    name: "Germany",
    installations: {
      android: 9910,
      windows: 1950,
      apple: 9120,
    },
    flag: "https://flagcdn.com/w80/de.png",
  },
  {
    code: "gb",
    name: "England",
    installations: {
      android: 1950,
      windows: 9120,
      apple: 6980,
    },
    flag: "https://flagcdn.com/w80/gb.png",
  },
  {
    code: "fr",
    name: "France",
    installations: {
      android: 9120,
      windows: 6980,
      apple: 8490,
    },
    flag: "https://flagcdn.com/w80/fr.png",
  },
  {
    code: "kr",
    name: "Korea",
    installations: {
      android: 6980,
      windows: 8490,
      apple: 2030,
    },
    flag: "https://flagcdn.com/w80/kr.png",
  },
  {
    code: "us",
    name: "USA",
    installations: {
      android: 8490,
      windows: 2030,
      apple: 3360,
    },
    flag: "https://flagcdn.com/w80/us.png",
  },
];

const topAuthors = [
  {
    name: "Jayvion Simon",
    likes: 9910,
    image: "https://avatars.githubusercontent.com/u/853123",
  },
  {
    name: "Deja Brady",
    likes: 9120,
    image: "https://avatars.githubusercontent.com/u/853133",
  },
  {
    name: "Lucian Obrien",
    likes: 1950,
    image: "https://avatars.githubusercontent.com/u/853193",
  },
];

const progress = [
  {
    value: 38566,
    label: "Conversions",
    progress: 48,
    bg: "#065F46",
    color: "#2DD4BF",
  },
  {
    value: 55566,
    label: "Applications",
    progress: 75,
    bg: "#155E75",
    color: "#38BDF8",
  },
];

export default function TheTops() {
  return (
    <section className="grid grid-cols-3 gap-6">
      <aside>
        <div>
          <Card>
            <CardHeader>
              <CardTitle label="Top Installed countris" />
            </CardHeader>
            <CardContent className="p-6 pt-0 w-full">
              <table className="w-full">
                <tbody>
                  {topInstalledCountries.map((item, index) => (
                    <tr key={`topInstalled${index}`}>
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <div>
                            <img
                              src={item.flag}
                              width={20}
                              height={30}
                              alt={item.name}
                            />
                          </div>
                          <div className="font-semibold">{item.name}</div>
                        </div>
                      </td>
                      {Object.entries(item.installations)
                        .map(([name, downloads]) => {
                          return {
                            icon: icons[name],
                            downloads,
                          };
                        })
                        .map((item, index) => (
                          <td
                            key={`topinstalleddownload${index}`}
                            className="text-gray-700"
                          >
                            <div className="flex items-center gap-2">
                              <item.icon />
                              <span>{kformat(item.downloads)}</span>
                            </div>
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </aside>
      <aside>
        <div>
          <Card>
            <CardHeader>
              <CardTitle label="Top authors" />
            </CardHeader>
            <CardContent className="p-6 py-0">
              {topAuthors.map((item, index) => (
                <div
                  key={`relatatedapp${index}`}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <UserAvatar name={item.name} avatar={item.image} />
                    </div>
                    <div>
                      <h3 className="flex items-center gap-2 font-semibold">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1 text-sm">
                          <Heart className="w-4 h-4" />
                          <span>{kformat(item.likes)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-full flex items-center justify-center w-12 h-12 text-green-600 bg-green-100"
                    style={{
                      backgroundColor: hexToRGBA(colors[index], 0.1),
                      color: colors[index],
                    }}
                  >
                    <Trophy />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </aside>
      <aside>
        <ul className="space-y-4">
          {progress.map((item: any, index: number) => (
            <div
              key={`task${index}`}
              style={{ backgroundColor: item.bg, color: item.color }}
              className="rounded-xl p-6  flex items-center gap-6"
            >
              <div className="relative">
                <svg width="100" height="100" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke={hexToRGBA(item.bg, 0.1)}
                    strokeWidth="20"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="20"
                    radius={5}
                    strokeDasharray={`${
                      90 * 2 * Math.PI * item.progress * 0.01
                    } ${90 * 2 * Math.PI * (100 - item.progress) * 0.01}`}
                    strokeDashoffset="0"
                    transform="rotate(-90 100 100)"
                    strokeLinecap="round"
                  />
                </svg>
                <div
                  className="absolute text-gray-200 top-[40px] left-[40px]"
                  style={{ fontSize: 16 }}
                >
                  {item.progress}%
                </div>
              </div>
              <div>
                <p className="font-medium text-4xl text-white">
                  {item.value.toLocaleString()}
                </p>
                <p className="text-xl text-gray-200">{item.label}</p>
              </div>
            </div>
          ))}
        </ul>
      </aside>
    </section>
  );
}
