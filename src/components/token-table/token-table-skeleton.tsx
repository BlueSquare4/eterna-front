import { Skeleton } from "@/components/ui/skeleton"

export function TokenTableSkeleton() {
  return (
    <div className="p-4 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4">
                <Skeleton className="h-[74px] w-[74px] rounded-md" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex gap-2 pt-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}
