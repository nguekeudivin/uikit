import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDollars } from "@/lib/utils";

export function InviteFriend() {
  return (
    <div className="bg-gradient-to-br from-[#4FA66F] to-[#377D68] p-8 rounded-xl text-white">
      <div className="justify-between flex items-center">
        <div>
          <h3 className="text-2xl font-semibold">
            Invite friend <br /> and earn
          </h3>
          <p className="text-5xl font-bold mt-2">{formatDollars(50)}</p>
        </div>
        <div>
          <img
            src={"assets/illustrations/illustration-receipt.webp"}
            className="w-24 h-24"
          />
        </div>
      </div>
      <p className="mt-4">
        Praesent egestas tristique nibh. Duis lobortis massa imperdiet quam.
      </p>
      <div className="relative mt-4">
        <Input
          className="h-12 bg-teal-900/50 border-teal-900/50 text-white placeholder:text-white"
          placeholder="Email"
        />
        <Button
          variant="secondary"
          size="sm"
          className="absolute right-2 bottom-1.5"
        >
          Invite
        </Button>
      </div>
    </div>
  );
}
