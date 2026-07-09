import { useEffect, useState } from "react";
import {
  getPipelineLogs,
  getPipelineRun,
  startBasicEnrichment,
  startFullResearchPipeline
} from "./api/vivApi";

import { PipelineRunCard } from "./components/PipelineRunCard";
import { StatusWindow } from "./components/StatusWindow";

import type {
  PipelineLog,
  PipelineRun,
} from "./api/vivApi";

export default function App() {
  const [runId, setRunId] = useState<number | null>(null);
  const [run, setRun] = useState<PipelineRun | null>(null);
  const [logs, setLogs] = useState<PipelineLog[]>([]);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleStartBasicEnrichment() {
    try {
      setIsStarting(true);
      setError(null);

      const result = await startBasicEnrichment();

      setRunId(result.pipeline_run_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsStarting(false);
    }
  }

  async function handleStartFullResearchPipeline() {
    try {
      setIsStarting(true);
      setError(null);

      const result = await startFullResearchPipeline(100);

      setRunId(result.pipeline_run_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsStarting(false);
    }
  }

  useEffect(() => {
    if (!runId) return;

    const intervalId = window.setInterval(async () => {
      try {
        const [runData, logData] = await Promise.all([
          getPipelineRun(runId),
          getPipelineLogs(runId),
        ]);

        setRun(runData);
        setLogs(logData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Polling failed");
      }
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [runId]);



  return (
    <main className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">VIV Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Basic enrichment control and monitoring.
        </p>
      </header>

      <section className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Controls</h2>

        <button
          onClick={handleStartBasicEnrichment}
          disabled={isStarting}
          className="rounded-lg bg-gray-900 px-5 py-2 text-white hover:bg-gray-700 disabled:opacity-50"
        >
          {isStarting ? "Starting..." : "Start Basic Enrichment"}
        </button>

        <button
        onClick={handleStartFullResearchPipeline}
        disabled={isStarting}
        className="rounded-lg bg-indigo-700 px-5 py-2 text-white hover:bg-indigo-600 disabled:opacity-50"
        >
          Start Full Research
        </button>

        {runId && (
          <p className="mt-3 text-sm text-gray-600">
            Current pipeline run ID: <strong>{runId}</strong>
          </p>
        )}

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <PipelineRunCard run={run} />
        <StatusWindow logs={logs} />
      </div>
    </main>
  );
}

