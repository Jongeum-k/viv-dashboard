import type { PipelineRun } from "../api/vivApi";

type Props = {
  run: PipelineRun | null;
};

export function PipelineRunCard({ run }: Props) {
  if (!run) {
    return (
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Pipeline Run</h2>
        <p className="mt-4 text-gray-500">No active run yet.</p>
      </section>
    );
  }

  const progress =
    run.total_records > 0
      ? Math.round((run.processed_records / run.total_records) * 100)
      : 0;

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Pipeline Run</h2>
          <p className="text-sm text-gray-500">
            #{run.id} · {run.job_name}
          </p>
        </div>

        <span className="rounded-full bg-gray-900 px-3 py-1 text-sm font-medium text-white">
          {run.status}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Total" value={run.total_records} />
        <Stat label="Processed" value={run.processed_records} />
        <Stat label="Updated" value={run.updated_records} />
        <Stat label="Failed" value={run.failed_records} />
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="h-3 rounded-full bg-gray-200">
          <div
            className="h-3 rounded-full bg-gray-900"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {run.error_message && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {run.error_message}
        </p>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}