import { cn } from '@/lib/utils'

function Table({ className, children, ...props }: { className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto">
      <table className={cn('w-full text-sm', className)} {...props}>
        {children}
      </table>
    </div>
  )
}

function TableHeader({ className, children, ...props }: { className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn('border-b border-border', className)} {...props}>
      {children}
    </thead>
  )
}

function TableBody({ className, children, ...props }: { className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} {...props}>{children}</tbody>
}

function TableRow({ className, children, ...props }: { className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn('border-b border-border transition-colors hover:bg-muted/50', className)} {...props}>
      {children}
    </tr>
  )
}

function TableHead({ className, children, ...props }: { className?: string; children: React.ReactNode } & React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={cn('px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider', className)} {...props}>
      {children}
    </th>
  )
}

function TableCell({ className, children, ...props }: { className?: string; children: React.ReactNode } & React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn('px-4 py-3 text-foreground', className)} {...props}>
      {children}
    </td>
  )
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
