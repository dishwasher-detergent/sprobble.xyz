"use client";

export default function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-card p-1 px-2 text-card-foreground shadow-sm">
        <p className="text-sm font-bold">{payload[0].payload.name ?? label}</p>
        <p>
          {payload[0].value} {payload[0].unit}
        </p>
        <p>{payload[0].payload.duration} Hours</p>
      </div>
    );
  }

  return null;
}
