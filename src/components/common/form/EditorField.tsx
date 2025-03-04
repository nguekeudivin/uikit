import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import CharacterCount from "@tiptap/extension-character-count";

export default function EditorField() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc list-outside pl-5",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal list-outside pl-5",
          },
        },
      }),
      Placeholder.configure({
        placeholder: "Write something amazing...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 hover:text-blue-700 underline",
        },
      }),
      CharacterCount.configure({
        limit: 1000,
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border-2 rounded-xl">
      <header className="flex flex-wrap gap-2 p-2 border-b">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold") ? "bg-gray-200 p-1 rounded" : "p-1"
          }
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic") ? "bg-gray-200 p-1 rounded" : "p-1"
          }
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={
            editor.isActive("underline") ? "bg-gray-200 p-1 rounded" : "p-1"
          }
        >
          <UnderlineIcon size={16} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "bg-gray-200 p-1 rounded"
              : "p-1"
          }
        >
          <Heading1 size={16} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-gray-200 p-1 rounded"
              : "p-1"
          }
        >
          <Heading2 size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList") ? "bg-gray-200 p-1 rounded" : "p-1"
          }
        >
          <List size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList") ? "bg-gray-200 p-1 rounded" : "p-1"
          }
        >
          <ListOrdered size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" })
              ? "bg-gray-200 p-1 rounded"
              : "p-1"
          }
        >
          <AlignLeft size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" })
              ? "bg-gray-200 p-1 rounded"
              : "p-1"
          }
        >
          <AlignCenter size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" })
              ? "bg-gray-200 p-1 rounded"
              : "p-1"
          }
        >
          <AlignRight size={16} />
        </button>
        <button
          onClick={() => {
            const url = window.prompt("Enter the URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={
            editor.isActive("link") ? "bg-gray-200 p-1 rounded" : "p-1"
          }
        >
          <LinkIcon size={16} />
        </button>
      </header>
      <section className="bg-gray-100">
        <EditorContent editor={editor} height={400} />
      </section>
    </div>
  );
}
