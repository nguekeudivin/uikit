import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRecord } from "@/hooks/use-record";
import { colors } from "@/lib/colors";
import icons from "@/lib/icons";
import { ComponentType } from "react";

export default function AccountSocialLinks() {
  const { values, setValue } = useRecord<any>({
    facebook: "https://www.facebook.com/caitlyn.kerluke",
    instagram: "https://www.instagram.com/caitlyn.kerluke",
    linkedin: "https://www.linkedin.com/in/caitlyn.kerluke",
    twitter: "https://www.twitter.com/caitlyn.kerluke",
  });

  return (
    <div className="shadow rounded-2xl p-6">
      <ul className="space-y-6">
        {Object.entries(values).map(([social, link], index) => {
          const Icon = icons[social] as ComponentType as any;
          return (
            <li
              key={`sociallink-${link}`}
              className="flex items-center gap-4 md:gap-8 border-2 px-3 rounded-xl"
            >
              <Icon
                key={`social${social}${index}`}
                className="w-4 h-4"
                style={{ color: colors[social] }}
              />
              <Input
                value={values[social]}
                onChange={({ target }: any) => {
                  setValue(social, target.value);
                }}
                className="border-none focus:ring-transparent"
              />
            </li>
          );
        })}
      </ul>
      <div className="mt-8 flex justify-end">
        <Button variant="dark"> Save changes</Button>
      </div>
    </div>
  );
}
