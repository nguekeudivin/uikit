import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { colors } from "@/lib/colors";

import icons from "@/lib/icons";
import {
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  Image,
  Video,
  EllipsisVertical,
  MessageCircleMore,
  Share,
  Heart,
  Smile,
} from "lucide-react";
import { format } from "date-fns";
import { ComponentType } from "react";
import UserAvatar from "@/components/common/UserAvatar";
import { posts } from "@/api-call/mocks/posts";

export default function ProfileMain() {
  const user = {
    avatar: "/assets/images/avatar/avatar-1.webp",
    followers: 1947,
    following: 2495,
    about:
      "Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..",
    liveAt: "United kingdom",
    email: "ashlynn.ohara62@gmail.com",
    job: "CT",
    company: "Gleichner, Mueller and Tromp",
    education: "Nikolaus - Leuschke",
    socialMedias: {
      facebook: "https://www.facebook.com/caitlyn.kerluke",
      instagram: "https://www.instagram.com/caitlyn.kerluke",
      linkedin: "https://www.linkedin.com/in/caitlyn.kerluke",
      twitter: "https://www.twitter.com/caitlyn.kerluke",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <aside>
        <div className="grid grid-cols-2 shadow p-8 rounded-2xl">
          <div className=" text-center flex flex-col border-r">
            <p className="text-2xl font-semibold">
              {user.followers.toLocaleString()}
            </p>
            <p className="text-muted-foreground">Followers</p>
          </div>
          <div className=" text-center flex flex-col">
            <p className="text-2xl font-semibold">
              {user.following.toLocaleString()}
            </p>
            <p className="text-muted-foreground">Followings</p>
          </div>
        </div>
        <div className="rounded-2xl shadow p-8 mt-4">
          <h3 className="text-xl font-semibold">About</h3>
          <p className="mt-4">{user.about}</p>
          <ul className="mt-4 space-y-3">
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <p>
                Live at <strong>{user.liveAt}</strong>
              </p>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <p>{user.email}</p>
            </li>
            <li className="flex items-center gap-3">
              <Briefcase className="w-5 h-5" />
              <p>
                {user.job} at <strong>{user.company}</strong>
              </p>
            </li>
            <li className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5" />
              <p>
                Studied at <strong>{user.education}</strong>
              </p>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl shadow p-8 mt-4">
          <h3 className="text-xl font-semibold">Social</h3>
          <ul className="mt-4 space-y-3">
            {Object.entries(user.socialMedias).map(([plateform, link]: any) => {
              const Icon = icons[plateform] as ComponentType as any;
              return (
                <li
                  key={`userprofilesocial${plateform}`}
                  className="flex items-center gap-3"
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: colors[plateform] }}
                  />
                  <a target="_blank">{link}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <aside className="col-span-2">
        <div className="rounded-2xl shadow p-8">
          <Textarea
            rows={6}
            className="text-lg"
            placeholder="Share what you are thinking here"
          ></Textarea>
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-4">
              <button className="mt-4 rounded-full hover:bg-gray-200 bg-gray-100 px-3 py-2 inline-flex items-center gap-2">
                <Image className="w-5 h-5 text-primary" />
                <span className="font-semibold">Image/Video</span>
              </button>
              <button className="mt-4 rounded-full hover:bg-gray-200 bg-gray-100 px-3 py-2 inline-flex items-center gap-2">
                <Video className="w-5 h-5 text-red-500 fill-red-500" />
                <span className="font-semibold">Streaming</span>
              </button>
            </div>
            <div>
              <Button variant="dark"> Post </Button>
            </div>
          </div>
        </div>

        <section>
          {posts.map((post, index) => (
            <div
              key={`post${index}`}
              className="shadow rounded-2xl mt-4 bg-white pb-8"
            >
              <header className="flex items-center justify-between px-8 pt-8">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full bg-cover"
                    style={{ backgroundImage: `url(${post.author.avatar})` }}
                  ></div>
                  <div>
                    <p className="text-lg font-semibold">{post.author.name}</p>
                    <p className="text-muted-foreground flex gap-2 text-sm">
                      {format(post.date, "dd MMM yyyy")}
                    </p>
                  </div>
                </div>
                <button>
                  <EllipsisVertical className="w-5 h-5 text-muted-foreground" />
                </button>
              </header>
              <p className="px-8 mt-4">{post.content}</p>
              {/* Image and legend */}
              <div className="px-2">
                <div
                  className="mt-4 w-full h-[400px] rounded-2xl bg-cover"
                  style={{ backgroundImage: `url(${post.image})` }}
                ></div>
                <div className="mt-4 flex items-center justify-between px-6">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2 items-center">
                      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                      <span className="">{post.likes}</span>
                    </div>
                    <div className="relative w-32 h-10">
                      {post.likesUsers.length != 0 && (
                        <div className="flex items-center relative">
                          {post.likesUsers.length > 3 && (
                            <div className="top-0 right-[0px] text-sm font-bold z-5 absolute w-10 h-10 rounded-full bg-sky-100 text-sky-600 border-sky-600 flex items-center justify-center">
                              +{post.likesUsers.length - 3}
                            </div>
                          )}
                          {post.likesUsers
                            .slice(0, 3)
                            .map((user, userIndex) => (
                              <div
                                key={`fileuser${index}${userIndex}`}
                                style={{
                                  right: `${(userIndex + 1) * 30}px`,
                                  backgroundImage: `url(${user.avatar})`,
                                }}
                                className={`z-${
                                  userIndex * 10
                                } top-0 absolute w-10 h-10 bg-cover rounded-full border border-white`}
                              ></div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <button>
                      <MessageCircleMore className="w-5 h-5" />
                    </button>
                    <button>
                      <Share className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              {/* Comment section */}
              <ul className="px-8 mt-8 space-y-4">
                {post.comments.map((comment, index) => (
                  <li key={`comment${index}`} className="flex gap-4">
                    <UserAvatar avatar={comment.author.avatar} />
                    <div className="bg-gray-100  w-full rounded-xl p-3">
                      <p className="font-semibold">{comment.author.name}</p>
                      <p className="text-muted-foreground">{comment.content}</p>
                    </div>
                  </li>
                ))}
                <li className="flex gap-4">
                  <UserAvatar avatar={user.avatar} />
                  <div className="border rounded-xl p-3 relative w-full">
                    <Textarea
                      placeholder="Write a comment"
                      className="px-3 py-2 focus:outline-none focus:border-none w-full"
                      rows={1}
                    ></Textarea>
                    <div className="flex gap-2 text-muted-foreground mt-2">
                      <button>
                        <Image className="w-5 h-5" />
                      </button>
                      <button>
                        <Smile className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </section>
      </aside>
    </div>
  );
}
