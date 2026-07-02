type Props = {
  name: string;
  status: string;
  queue: number;
};

export function WorkerCard({ name, status, queue }: Props) {
  const statusColor =
    status === "active"
      ? "text-green-600"
      : status === "paused"
      ? "text-yellow-600"
      : "text-gray-500";

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <span className={`text-sm font-medium ${statusColor}`}>
          {status}
        </span>
      </div>

      <p className="mt-3 text-sm text-gray-500">Queue: {queue}</p>
    </div>
  );
}