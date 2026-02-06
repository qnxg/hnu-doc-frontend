import type { SearchRequest } from "@/src/apis/search"
import { Suspense } from "react"
import SearchBox from "@/src/components/search/box"
import SearchTable from "@/src/components/search/table"

export interface SearchParams extends SearchRequest {}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  return (
    <div className="w-full max-w-6xl flex flex-col gap-8">
      <SearchBox />
      <Suspense fallback={(
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <h1 className="text-xl font-semibold">加载中...</h1>
        </div>
      )}
      >
        <SearchTable
          params={params}
        />
      </Suspense>
    </div>
  )
}
