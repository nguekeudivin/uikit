import { Switch } from "@/components/ui/switch";

export default function AccountNotifications() {
  return (
    <div className="shadow rounded-2xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="text-xl font-semibold">Activity</h3>
          <p className="text-muted-foreground">
            Donec mi odio, faucibus at, scelerisque quis
          </p>
        </div>
        <ul className="bg-gray-100 rounded-xl col-span-2 p-8 space-y-6 text-gray-700">
          <li className="flex items-center justify-between">
            <label id="email-on-comment">
              Email me when someone comments onmy article
            </label>
            <Switch id="email-on-comment" checked={true} />
          </li>
          <li className="flex items-center justify-between">
            <label id="email-on-answer">
              Email me when someone answers on my form
            </label>
            <Switch id="email-on-answer" />
          </li>
          <li className="flex items-center justify-between">
            <label id="email-on-follows">Email me hen someone follows me</label>
            <Switch id="email-on-follows" />
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
        <div>
          <h3 className="text-xl font-semibold"> Application</h3>
          <p className="text-muted-foreground">News and announcements</p>
        </div>
        <ul className="bg-gray-100 rounded-xl col-span-2 p-8 space-y-6 text-gray-700">
          <li className="flex items-center justify-between">
            <label id="email-on-comment"></label>
            <Switch id="email-on-comment" checked={true} />
          </li>
          <li className="flex items-center justify-between">
            <label id="email-on-answer">Weekly product updates</label>
            <Switch id="email-on-answer" checked={true} />
          </li>
          <li className="flex items-center justify-between">
            <label id="email-on-follows">Weekly blog digest</label>
            <Switch id="email-on-follows" />
          </li>
        </ul>
      </div>
    </div>
  );
}
