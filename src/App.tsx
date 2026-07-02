import { stats, workers, pipeline } from "./data/mockDashboard";
import { StatCard } from "./components/StatCard";
import { WorkerCard } from "./components/WorkerCard";
import { PipelineStage } from "./components/PipelineStage";
import { ActionButton } from "./components/ActionButton";

export default function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-950">
          VIV Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Celery worker control and vocabulary enrichment monitoring.
        </p>
      </header>

      <section className="mb-8 grid gap-4 md:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </section>

      <section className="mb-8 rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Controls</h2>

        <div className="flex flex-wrap gap-3">
          <ActionButton label="Run Frequency" />
          <ActionButton label="Run Definitions" />
          <ActionButton label="Run Brave Search" />
          <ActionButton label="Run Topics" />
          <ActionButton label="Run Summaries" />
          <ActionButton label="Retry Failed" />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Workers</h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {workers.map((worker) => (
            <WorkerCard key={worker.name} {...worker} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Pipeline Progress</h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pipeline.map((stage) => (
            <PipelineStage key={stage.name} {...stage} />
          ))}
        </div>
      </section>
    </main>
  );
}