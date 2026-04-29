import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import ToolDataCRUD from "./tool_data_crud";

interface DataExplorerProps {
  readonly: boolean;
  portfolio: string;
  org: string;
  tool: string;
  initialRing?: string;
}

export default function DataExplorer({
  readonly,
  portfolio,
  org,
  tool,
  initialRing,
}: DataExplorerProps) {
  const normalizedInitial = useMemo(
    () => (initialRing || "").trim(),
    [initialRing],
  );
  const [ringInput, setRingInput] = useState(normalizedInitial);
  const [activeRing, setActiveRing] = useState(normalizedInitial);

  const applyRing = () => {
    const nextRing = ringInput.trim();
    setActiveRing(nextRing);
  };

  return (
    <div className="mx-4 flex flex-col gap-4 sm:mx-6">
      <div className="mx-auto flex w-full flex-col gap-2 pt-1 sm:w-1/2 sm:flex-row">
        <input
          value={ringInput}
          onChange={(e) => setRingInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") applyRing();
          }}
          placeholder="enter a Blueprint name (e.g. schd_tools)"
          className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          onClick={applyRing}
        >
          <Search className="h-3.5 w-3.5" />
          Load
        </button>
      </div>

      {activeRing ? (
        <ToolDataCRUD
          readonly={readonly}
          portfolio={portfolio}
          org={org}
          tool={tool}
          ring={activeRing}
        />
      ) : null}
    </div>
  );
}
