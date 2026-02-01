import type { SearchRequest, Subject } from "@/src/apis/search"
import { search } from "@/src/apis/search"
import SearchBox from "@/src/components/search/box"
import SearchPagination from "@/src/components/search/pagination"
import SearchTable from "@/src/components/search/table"

interface SearchParams extends SearchRequest {}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  const { subjects, pages }: {
    subjects: Subject[]
    pages: number
  } = await search(params)

  return (
    <div className="w-full max-w-6xl flex flex-col gap-8">
      <SearchBox />
      <SearchTable
        subjects={subjects}
        typs={params.typ}
      />
      <SearchPagination
        current={Number(params.page) || 1}
        total={pages}
        size={Number(params.page_size) || 10}
      />
    </div>
  )
}
