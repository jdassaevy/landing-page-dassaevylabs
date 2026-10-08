import { Skeleton } from "@/components/skeleton";
export default function Loading() { return <main className="case-page shell" aria-busy="true"><Skeleton className="h-4 w-36" /><Skeleton className="h-16 w-2/3" /><Skeleton className="h-6 w-1/2" /><Skeleton className="case-skeleton" /></main>; }
