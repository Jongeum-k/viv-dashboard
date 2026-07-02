import type { PipelineLog } from "../api/vivApi";

type Props = {
  logs: PipelineLog[];
};

export function StatusWindow({ logs }: Props) {
  return (
    <section className="rounded-2xl border border-gray-300 bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Logs</h2>
        <span className="text-sm text-gray-500">{logs.length} entries</span>
      </div>

      <div className="h-[420px] overflow-y-auto rounded-xl border border-gray-800 bg-gray-950 p-4 font-mono text-sm text-gray-100 shadow-inner">        {logs.length === 0 ? (
          <p className="text-gray-400">No logs yet.</p>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="border-b border-gray-800 pb-2">
                <div className="mb-1 flex justify-between gap-4">
                  <span className={getLevelClass(log.level)}>
                    [{log.level}]
                  </span>

                  <span className="shrink-0 text-gray-500">
                    {new Date(log.created_at).toLocaleTimeString()}
                  </span>
                </div>

                <p className="whitespace-pre-wrap text-gray-200">
                  {log.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function getLevelClass(level: string) {
  switch (level.toLowerCase()) {
    case "error":
      return "font-bold text-red-400";
    case "warning":
    case "warn":
      return "font-bold text-yellow-400";
    case "success":
      return "font-bold text-green-400";
    default:
      return "font-bold text-blue-400";
  }
}