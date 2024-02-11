"use client";

export default function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background text-secondary-foreground rounded-xl border p-1 px-2 shadow-sm">
        <p className="text-lg font-bold">{payload[0].payload.name ?? label}</p>
        <p className="text-sm">
          {payload[0].value} {payload[0].unit}
        </p>
        <p className="text-sm">{payload[0].payload.duration} Hours</p>
      </div>
    );
  }

  return null;
}
