import PageContent from "@/components/common/PageContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./profile.css";
import { Heart, IdCard, Images, User, Users } from "lucide-react";
import InputSearch from "@/components/common/form/InputSearch";
import ProfileFriends from "./ProfileFriends";
import ProfileGallery from "./ProfileGallery";
import ProfileFollowers from "./ProfileFollowers";
import ProfileMain from "./ProfileMain";

export default function UserProfilePage() {
  const tabs = [
    {
      name: "profile",
      label: "Profile",
      icon: IdCard,
    },
    {
      name: "followers",
      label: "Followers",
      icon: Heart, // You can add an appropriate icon here if needed
    },
    {
      name: "friends",
      label: "Friends",
      icon: Users, // You can add an appropriate icon here if needed
    },
    {
      name: "gallery",
      label: "Gallery",
      icon: Images, // You can add an appropriate icon here if needed
    },
  ];

  const user = {
    avatar: "/assets/images/avatar/avatar-1.webp",
    cover: "/assets/images/cover/cover-1.webp",
    name: "Afrika Kemi",
    role: "Developer frontend",
  };

  return (
    <PageContent
      title="Profile"
      links={{ User: "/", "Afrika Kemi": "#" }}
      className="max-w-6xl"
    >
      <Tabs defaultValue="profile">
        <header className="rounded-xl overflow-hidden mt-8 shadow relative">
          <div className="absolute left-8 bottom-8 flex items-center gap-4">
            <div
              className="w-32 h-32 rounded-full bg-cover"
              style={{ backgroundImage: `url(${user.avatar})` }}
            ></div>
            <div>
              <p className="text-white text-2xl">{user.name}</p>
              <p className="text-white/50 text-lg">{user.role}</p>
            </div>
          </div>
          <div
            className="h-64 w-full bg-cover"
            style={{ backgroundImage: `url(${user.cover})` }}
          >
            <div className="bg-gray-900/70 w-full h-full"></div>
          </div>
          <div className="flex items-center justify-end bg-white">
            <TabsList className="bg-white grid p-0 m-0  grid-cols-4 gap-4">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={`tab${tab.name}`}
                  value={tab.name}
                  className="rounded-none py-3 data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
                >
                  <div className=" flex items-center gap-2">
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </header>

        <div className="mt-12 mb-24">
          <TabsContent value="profile">
            <ProfileMain />
          </TabsContent>
          <TabsContent value="followers">
            <ProfileFollowers />
          </TabsContent>
          <TabsContent value="friends">
            <ProfileFriends />
          </TabsContent>
          <TabsContent value="gallery">
            <ProfileGallery />
          </TabsContent>
        </div>
      </Tabs>
    </PageContent>
  );
}
