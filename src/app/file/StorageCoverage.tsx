import { EllipsisVertical } from "lucide-react";

export default function BookingMainStats() {
  const items = [
    {
      label: "Dropbox",
      total: 22.35,
      used: 2.24,
      icon: "/assets/icons/dropbox.svg",
    },
    {
      label: "Drive",
      total: 15,
      used: 10.45,
      icon: "/assets/icons/google-drive.svg",
    },
    {
      label: "Onedrive",
      total: 40,
      used: 20.24,
      icon: "/assets/icons/onedrive.svg",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <div key={`stats${index}`} className="shadow p-6 rounded-xl relative">
          <div>
            <div>
              <img src={item.icon} className="w-12 h-12" />
            </div>
            <h3 className="text-lg font-medium mt-4">{item.label}</h3>
            <div className="mt-2 bg-gray-200 h-2 w-full rounded-md">
              <div
                className="h-full rounded-md bg-gray-800"
                style={{
                  width: `${Math.ceil((item.used * 100) / item.total)}%`,
                }}
              ></div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-2">
              <span className="text-muted-foreground">{item.used} Gb</span>
              <span>/</span>
              <span className="font-semibold">{item.total} Gb</span>
            </div>
          </div>
          <button className="absolute top-6 right-6">
            <EllipsisVertical className="text-muted-foreground" />
          </button>
        </div>
      ))}
    </div>
  );
}
