import { ResponsiveContainer } from 'recharts'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { FadeIn } from '@/components/shared/motion'

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <FadeIn>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <div className="px-6 pb-4">
          <ResponsiveContainer width="100%" height={300}>
            {children as React.ReactElement}
          </ResponsiveContainer>
        </div>
      </Card>
    </FadeIn>
  )
}

export { ChartCard }
