type NumberFieldProps = {
  label: string;
  value: number;
  min: number;
  max?: number;
  onChange: (value: number) => void;
};

export default function NumberField({ label, value, min, max, onChange }: NumberFieldProps) {
  const handleChange = (raw: string) => {
    const parsed = Number.parseInt(raw, 10);
    let next = Number.isNaN(parsed) ? min : parsed;
    if (next < min) {
      next = min;
    }
    if (max !== undefined && next > max) {
      next = max;
    }
    onChange(next);
  };

  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.35em] text-text/60">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        min={min}
        max={max}
        onChange={(event) => handleChange(event.target.value)}
        className="mt-2 block w-28 min-h-11 rounded-2xl border border-primary/30 bg-white px-4 py-2 font-semibold text-text outline-hidden transition focus:border-primary"
      />
    </label>
  );
}
