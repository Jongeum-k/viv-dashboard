type Props = {
  name: string;
  completed: number;
  total: number;
};

export function PipelineStage({ name, completed, total }: Props) {
  const percent = Math.round((completed / total) * 100);

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-2 flex justify-between">
        <span className="font-medium text-gray-900">{name}</span>
        <span className="text-sm text-gray-500">{percent}%</span>
      </div>

      <div className="h-3 rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-gray-900"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-gray-500">
        {completed} / {total}
      </p>
    </div>
  );
}