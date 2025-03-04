import CustomSemiRadialBar from "@/components/common/CustomSemiRadialBar";
import FileIcon from "../../components/common/FileIcon";

const data = [
  {
    category: "Images",
    type: "image",
    files: 223,
    size: "11.18 Gb",
  },
  {
    category: "Media",
    type: "video",
    files: 223,
    size: "4.47 Gb",
  },
  {
    category: "Documents",
    files: 223,
    type: "document",
    size: "4.47 Gb",
  },
  {
    category: "Other",
    files: 223,
    type: "file",
    size: "2.24 Gb",
  },
];
export default function UsageMetrics() {
  return (
    <div className="p-8  rounded-xl shadow">
      <div className="flex items-center justify-center w-full overflow-hidden">
        <div className="-mt-[50px]">
          <CustomSemiRadialBar
            radius={60}
            width={400}
            height={200}
            coloredSize={15}
            mutedSize={10}
            color="#A855F7"
            mutedColor={"#E5E7EB"}
            coverage={50}
            centerHTML={
              <>
                <div className="font-semibold text-center text-xl">50%</div>
                <p className="text-muted-foreground text-sm">
                  Used of 22.35 Gb / 44.gb
                </p>
              </>
            }
          />
        </div>
      </div>

      <ul className="space-y-4 mt-6">
        {data.map((item, index) => (
          <li
            key={`usagemetricsdata${index}`}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div>
                <FileIcon name={item.type} />
              </div>
              <div>
                <p className="font-semibold">{item.category}</p>
                <p className="flex items-center gap-4 text-sm text-muted-foreground">
                  {item.files} files
                </p>
              </div>
            </div>
            <p className="font-semibold ">{item.size}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
