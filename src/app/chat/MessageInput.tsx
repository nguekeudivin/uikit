import { MdImage, MdSend } from "react-icons/md";
import { useChat } from "./ChatContext";

export default function MessageInput() {
  const { form, sendMessage } = useChat();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        form.setValue("image", file);
        sendMessage({ image: reader.result });
      };
    }
  };

  return (
    <div className="flex items-center p-4">
      <textarea
        onChange={form.handleChange}
        name="message"
        value={form.values.message}
        className=" border border-gray-300 px-2 py-2.5 rounded-md block focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm w-full"
        rows={1}
        placeholder="Ecrire un message"
      />
      <label
        htmlFor="addImage"
        className="raw-icon-btn ml-2 p-3 bg-gray-100 text-primary border rounded-full"
      >
        <MdImage className="w-4 h-4" />
      </label>
      <input
        type="file"
        id="addImage"
        className="hidden"
        onInput={handleInputChange}
      />
      <button
        onClick={sendMessage}
        className="rounded-full ml-2 p-3 bg-primary text-white"
      >
        <MdSend className="w-4 h-4" />
      </button>
    </div>
  );
}
