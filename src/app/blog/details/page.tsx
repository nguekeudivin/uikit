"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Heart, Smile } from "lucide-react";
import Link from "next/link";
import {
  ChevronDown,
  CloudUpload,
  ExternalLink,
  FileText,
  Pencil,
  Image,
  Paperclip,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import UserAvatar from "@/components/common/UserAvatar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { post } from "@/api-call/mocks/posts";
import { cn, paginateList } from "@/lib/utils";
import FullPagination from "@/components/common/FullPagination";

export default function PostDetailsPage() {
  const [status, setStatus] = useState<string>("publish");

  const [showReply, setShowReply] = useState<any>({});

  return (
    <div className="mb-24 ">
      <div className="flex items-center justify-between md:px-16 mt-4">
        <Link href="/blog/list">
          <Button variant="transparent">
            <ChevronLeft /> Back
          </Button>
        </Link>
        <div className="flex items-center gap-6">
          <button className=" text-muted-foreground p-1.5 hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-full">
            <ExternalLink className="w-5 h-5" />
          </button>
          <Link href="/job/edit">
            <button className="text-muted-foreground p-1.5 hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-full">
              <Pencil className="w-5 h-5" />
            </button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-gray-900 text-white rounded-lg flex items-center px-4 py-2 gap-2">
              <span className="capitalize">{status}</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatus("publish")}>
                <CloudUpload />
                Publish
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus("draft")}>
                <FileText />
                Draft
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Hero background */}
      <div
        style={{ backgroundImage: `url(${post.cover.src})` }}
        className="bg-cover bg-center h-[200px] md:h-[500px] w-full mt-6 py-4 md:py-16"
      >
        <div className="h-full w-full bg-black/300 max-w-6xl mx-auto px-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            {post.title}
          </h2>
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-3">
        {/* content */}
        <article>
          <div
            className="mt-6 ProseMirror  p-0 rounded-lg border-dashed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </article>

        <footer className="border-t border-dashed mt-4">
          {/* Tags */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {post.tags.map((item, index) => (
              <span
                key={`tags${index}`}
                className="px-2 py-1  bg-gray-100 rounded-md"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 border-b border-dashed pb-6 mt-8">
            {/* Likes count. */}
            <div className="flex gap-2 items-center">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <span className="">{post.likes}</span>
            </div>
            {/* Users */}
            <div className="relative w-32 h-10 ml-4">
              {post.likesUsers.length != 0 && (
                <div className="flex items-center relative">
                  {post.likesUsers.length > 3 && (
                    <div className="top-0 right-[0px] text-sm font-bold z-5 absolute w-10 h-10 rounded-full bg-green-100 text-green-600 border-green-600 flex items-center justify-center">
                      +{post.likesUsers.length - 3}
                    </div>
                  )}
                  {post.likesUsers.slice(0, 3).map((user, userIndex) => (
                    <div
                      key={`likeuser${userIndex}`}
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

          {/* Comments */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold">
              Comments <sup className="text-muted-foreground text-sm">(4)</sup>{" "}
            </h3>
            <div className="mt-4">
              <Textarea
                placeholder="Write some of your comments"
                rows={4}
              ></Textarea>
            </div>

            <div className="flex py-6 justify-between">
              <div className="flex items-center gap-2 text-muted-foreground gap-4">
                <button>
                  <Image className="w-5 h-5" />
                </button>
                <button>
                  <Paperclip className="w-5 h-5" />
                </button>
                <button>
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              <div>
                <Button variant="dark">Post Comment</Button>
              </div>
            </div>

            <ul className="mt-8 space-y-4">
              {post.comments.map((comment, index) => (
                <li key={`comment${index}`} className="flex gap-4 relative">
                  <UserAvatar avatar={comment.author.avatar} />
                  <div className="w-full">
                    <div className="w-full border-b border-dashed pb-4">
                      <p className="font-semibold">{comment.author.name}</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        {format(comment.date, "dd MMM yyyy")}
                      </p>
                      <p className="text-muted-foreground mt-1">
                        {comment.content}
                      </p>
                      {showReply[index] && (
                        <div className="mt-4">
                          <Input placeholder="Write your comment" />
                        </div>
                      )}
                    </div>
                    <ul>
                      {comment.replies.map((reply, replyIndex) => (
                        <li
                          key={`commentrely${index}${replyIndex}`}
                          className="flex gap-4 mt-4"
                        >
                          <UserAvatar avatar={reply.author.avatar} />
                          <div className="w-full border-b border-dashed pb-4">
                            <p className="font-semibold">{reply.author.name}</p>
                            <p className="text-muted-foreground text-xs mt-1">
                              {format(reply.date, "dd MMM yyyy")}
                            </p>
                            <p className="text-muted-foreground mt-1">
                              {reply.content}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    onClick={() => {
                      setShowReply((prev: any) => ({
                        ...prev,
                        [index]: !showReply[index],
                      }));
                    }}
                    variant="transparent"
                    className={cn("absolute top-1 right-4", {
                      "text-green-600": showReply[index],
                    })}
                  >
                    <Pencil className="w-5 h-5" />
                    Reply
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          {/* Paginate comment */}
          <footer className="mt-12 justify-center flex">
            <FullPagination
              pagination={paginateList(post.comments, 1, 1)}
              onPrevious={() => {}}
              onNext={() => {}}
              onGoto={() => {}}
            />
          </footer>
        </footer>
      </section>
    </div>
  );
}
