import PageContent from "@/components/common/PageContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./profile.css";
import { Heart, IdCard, Images, Users } from "lucide-react";
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
          <div
            className="h-64 w-full bg-cover"
            style={{ backgroundImage: `url(${user.cover})` }}
          >
            <div className="bg-gray-900/70 w-full h-full flex items-center justify-center">
              <div className="md:absolute md:left-8 md:bottom-8 flex flex-col md:flex-row items-center gap-4">
                <div
                  className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-cover"
                  style={{ backgroundImage: `url(${user.avatar})` }}
                ></div>
                <div className="text-center md:text-start">
                  <p className="text-white text-2xl">{user.name}</p>
                  <p className="text-white/50 text-lg">{user.role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center md:justify-end bg-white w-full relative">
            <div className="px-8  h-20 overflow-hidden hover:overflow-x-auto scrollbar-thin scrollbar-thumb-gray-primary scrollbar-track-gray-200">
              <TabsList className="bg-white grid p-0 m-0 grid-cols-4 gap-4 min-w-[400px] ">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={`tab${tab.name}`}
                    value={tab.name}
                    className="rounded-none shrink-0 py-3 data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
                  >
                    <div className=" flex items-center gap-2">
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
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
