type Props = {
  label: string;
};

export function ActionButton({ label }: Props) {
  return (
    <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
      {label}
    </button>
  );
}