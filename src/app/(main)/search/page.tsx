"use client"

import type { SearchRequest, Subject } from "@/src/apis/search"
import type { DocumentType } from "@/src/models/document"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { search } from "@/src/apis/search"
import SearchBox from "@/src/components/search/box"
import SearchTable from "@/src/components/search/table"

interface SearchParams extends SearchRequest {}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [params, setParams] = useState<SearchParams>({
    key: searchParams.get("key") || "",
    typ: (searchParams.getAll("typ") as DocumentType[]).length > 0
      ? searchParams.getAll("typ") as DocumentType[]
      : ["final", "mid", "other"],
    pape_size: searchParams.get("page_size") ? (Number(searchParams.get("page_size")) ?? 10) : 10,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  })

  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    search(params)
      .then(response => setSubjects(response.subjects))
      .catch(() => setSubjects([]))
      .finally(() => setLoading(false))
  }, [params])

  const handleSearch = (keyword: string, types: DocumentType[]) => {
    const newParams = {
      ...params,
      key: keyword,
      typ: types,
      page: 1, // Reset to first page on new search
    }
    setParams(newParams)

    // Update URL search params
    const urlParams = new URLSearchParams()
    if (keyword)
      urlParams.set("key", keyword)
    types.forEach(type => urlParams.append("typ", type))
    router.push(`/search?${urlParams.toString()}`)
  }

  return (
    <div className="w-full max-w-6xl flex flex-col gap-8">
      <SearchBox
        onSearch={handleSearch}
        defaultKeyword={params.key}
        defaultTypes={params.typ}
      />
      {loading
        ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              加载中...
            </div>
          )
        : (
            <SearchTable subjects={subjects} />
          )}
    </div>
  )
}
