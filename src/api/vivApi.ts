const API_BASE_URL = "http://localhost:8000";

export type PipelineRun = {
  id: number;
  job_name: string;
  status: string;
  total_records: number;
  processed_records: number;
  inserted_records: number;
  updated_records: number;
  failed_records: number;
  error_message: string | null;
  started_at: string | null;
  finished_at: string | null;
};

export type PipelineLog = {
  id: number;
  level: string;
  message: string;
  context: unknown;
  created_at: string;
};

export async function startBasicEnrichment() {
  const res = await fetch(`${API_BASE_URL}/admin/jobs/basic-enrichment`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("Failed to start basic enrichment");

  return res.json() as Promise<{
    message: string;
    pipeline_run_id: number;
    task_id: string;
  }>;
}

export async function getPipelineRun(runId: number) {
  const res = await fetch(`${API_BASE_URL}/admin/pipeline/runs/${runId}`);

  if (!res.ok) throw new Error("Failed to fetch pipeline run");

  return res.json() as Promise<PipelineRun>;
}

export async function getPipelineLogs(runId: number) {
  const res = await fetch(`${API_BASE_URL}/admin/pipeline/runs/${runId}/logs`);

  if (!res.ok) throw new Error("Failed to fetch pipeline logs");

  return res.json() as Promise<PipelineLog[]>;
}

export async function startFullResearchPipeline(batchSize = 100) {
  const res = await fetch(
    `${API_BASE_URL}/admin/research/pipeline/run-all?batch_size=${batchSize}`,
    {
      method: "POST",
    }
  );

  if (!res.ok) throw new Error("Failed to start full research pipeline");

  return res.json() as Promise<{
    status: string;
    pipeline_run_id: number;
    task_id: string;
    batch_size: number;
  }>;
}