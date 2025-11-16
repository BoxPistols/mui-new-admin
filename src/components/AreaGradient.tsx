/**
 * AreaGradient component for charts
 * Creates a linear gradient for area charts
 */

interface AreaGradientProps {
  color: string
  id: string
  stopOpacity?: number
}

export default function AreaGradient({ color, id, stopOpacity = 0.5 }: AreaGradientProps) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={stopOpacity} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  )
}
