const fs = require("fs");

const items = [
  // Files
  {
    type: "file",
    name: "cover-2.jpg",
    size: "45.78 Mb",
    date: "2025-02-26T12:36:00Z",
    starred: true,
    users: [
      {
        image: "/assets/images/avatar/avatar-1.webp",
      },
      {
        image: "/assets/images/avatar/avatar-2.webp",
      },
      {
        image: "/assets/images/avatar/avatar-3.webp",
      },
      {
        image: "/assets/images/avatar/avatar-4.webp",
      },
      {
        image: "/assets/images/avatar/avatar-5.webp",
      },
    ],
  },
  {
    type: "file",
    name: "design-suriname-2015.mp3",
    size: "22.89 Mb",
    date: "2025-02-25T11:36:00Z",
    starred: false,
    users: [
      {
        image: "/assets/images/avatar/avatar-1.webp",
      },
      {
        image: "/assets/images/avatar/avatar-2.webp",
      },
      {
        image: "/assets/images/avatar/avatar-3.webp",
      },
      {
        image: "/assets/images/avatar/avatar-4.webp",
      },
    ],
  },
  {
    type: "file",
    name: "expertise-2015-conakry-sao-tome-and-principe-gender.mp4",
    size: "15.26 Mb",
    date: "2025-02-24T10:36:00Z",
    starred: true,
    users: [
      {
        image: "/assets/images/avatar/avatar-1.webp",
      },
      {
        image: "/assets/images/avatar/avatar-2.webp",
      },
    ],
  },
  {
    type: "file",
    name: "money-popup-crack.pdf",
    size: "11.44 Mb",
    date: "2025-02-23T09:36:00Z",
    starred: true,
    users: [
      {
        image: "/assets/images/avatar/avatar-1.webp",
      },
    ],
  },
  {
    type: "file",
    name: "cover-4.jpg",
    size: "9.16 Mb",
    date: "2025-02-22T08:36:00Z",
    starred: false,
    users: [],
  },
  {
    type: "file",
    name: "report-2025.docx",
    size: "5.67 Mb",
    date: "2025-02-20T06:36:00Z",
    starred: true,
    users: [
      {
        image: "/assets/images/avatar/avatar-1.webp",
      },
      {
        image: "/assets/images/avatar/avatar-2.webp",
      },
    ],
  },
  {
    type: "file",
    name: "budget-2025.xlsx",
    size: "8.34 Mb",
    date: "2025-02-18T18:36:00Z",
    starred: false,
    users: [
      {
        image: "/assets/images/avatar/avatar-1.webp",
      },
    ],
  },
  {
    type: "file",
    name: "presentation-2025.pptx",
    size: "12.56 Mb",
    date: "2025-02-17T17:36:00Z",
    starred: true,
    users: [
      {
        image: "/assets/images/avatar/avatar-1.webp",
      },
      {
        image: "/assets/images/avatar/avatar-2.webp",
      },
      {
        image: "/assets/images/avatar/avatar-3.webp",
      },
    ],
  },
  {
    type: "file",
    name: "notes-2025.txt",
    size: "1.23 Mb",
    date: "2025-02-16T16:36:00Z",
    starred: false,
    users: [],
  },
  {
    type: "file",
    name: "backup-2025.zip",
    size: "50.12 Mb",
    date: "2025-02-15T15:36:00Z",
    starred: false,
    users: [
      {
        image: "/assets/images/avatar/avatar-1.webp",
      },
      {
        image: "/assets/images/avatar/avatar-2.webp",
      },
    ],
  },

  // Folders
  {
    type: "folder",
    name: "Projects",
    size: "0 Mb",
    date: "2025-02-21T07:36:00Z",
    starred: false,
    users: [],
  },
  {
    type: "folder",
    name: "Photos",
    size: "0 Mb",
    date: "2025-02-19T19:37:00Z",
    starred: false,
    users: [],
  },
  {
    type: "folder",
    name: "Documents",
    size: "0 Mb",
    date: "2025-02-14T14:36:00Z",
    starred: true,
    users: [],
  },
  {
    type: "folder",
    name: "Music",
    size: "0 Mb",
    date: "2025-02-13T13:36:00Z",
    starred: false,
    users: [],
  },
  {
    type: "folder",
    name: "Videos",
    size: "0 Mb",
    date: "2025-02-12T12:36:00Z",
    starred: false,
    users: [],
  },
  {
    type: "folder",
    name: "Downloads",
    size: "0 Mb",
    date: "2025-02-11T11:36:00Z",
    starred: false,
    users: [],
  },
  {
    type: "folder",
    name: "Work",
    size: "0 Mb",
    date: "2025-02-10T10:36:00Z",
    starred: true,
    users: [],
  },
  {
    type: "folder",
    name: "Personal",
    size: "0 Mb",
    date: "2025-02-09T09:36:00Z",
    starred: false,
    users: [],
  },
  {
    type: "folder",
    name: "Backups",
    size: "0 Mb",
    date: "2025-02-08T08:36:00Z",
    starred: false,
    users: [],
  },
  {
    type: "folder",
    name: "Archives",
    size: "0 Mb",
    date: "2025-02-07T07:36:00Z",
    starred: false,
    users: [],
  },
];

fs.writeFileSync(
  "files.json",
  JSON.stringify(
    items.map((item) => {
      return {
        ...item,
        size: Math.floor(Math.random() * 1000000),
      };
    })
  )
);
