function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="mt-1 text-3xl font-bold text-indigo-600 font-heading">{value}</p>
    </div>
  )
}

export { MiniStat }
