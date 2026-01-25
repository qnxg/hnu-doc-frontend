import SearchBox from "@/src/components/search/box"
import SearchTable from "@/src/components/search/table"

interface SearchParams {
  key?: string
  typ: string
  pape_size?: number
  page?: number
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const q = (await searchParams)

  return (
    <div>
      <span>
        {`key: ${q.key}, typ: ${q.typ}, page_size: ${q.pape_size}, page: ${q.page}`}
      </span>
      <SearchBox />
      <SearchTable />
    </div>
  )
}
