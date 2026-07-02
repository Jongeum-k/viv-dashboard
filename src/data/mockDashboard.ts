export const stats = [
  { label: "Total Words", value: "12,430" },
  { label: "Frequency Done", value: "9,820" },
  { label: "Definitions Done", value: "7,411" },
  { label: "Failed Jobs", value: "23" },
];

export const workers = [
  { name: "Frequency Worker", status: "active", queue: 120 },
  { name: "Definition Worker", status: "active", queue: 88 },
  { name: "Brave Search Worker", status: "paused", queue: 34 },
  { name: "Topic Worker", status: "active", queue: 61 },
  { name: "Summary Worker", status: "idle", queue: 0 },
];

export const pipeline = [
  { name: "Frequency", completed: 9820, total: 12430 },
  { name: "Definition", completed: 7411, total: 12430 },
  { name: "Search", completed: 2102, total: 3900 },
  { name: "Topics", completed: 1640, total: 3900 },
  { name: "Summary", completed: 1298, total: 3900 },
];