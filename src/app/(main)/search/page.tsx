"use client"

import type { SearchRequest, Subject } from "@/src/apis/search"
import type { DocumentType } from "@/src/models/document"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { search } from "@/src/apis/search"
import SearchBox from "@/src/components/search/box"
import SearchPagination from "@/src/components/search/pagination"
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
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    search(params)
      .then((response) => {
        setSubjects(response.subjects)
        setTotalPages(response.pages)
      })
      .catch(() => {
        setSubjects([])
        setTotalPages(0)
      })
      .finally(() => setLoading(false))
  }, [params])

  // 统一的搜索参数更新函数
  const updateSearchParams = (updates: Partial<SearchParams>) => {
    const newParams = { ...params, ...updates }
    setParams(newParams)

    const urlParams = new URLSearchParams()
    if (newParams.key)
      urlParams.set("key", newParams.key)
    if (newParams.typ)
      newParams.typ.forEach(type => urlParams.append("typ", type))
    if (newParams.page)
      urlParams.set("page", String(newParams.page))
    if (newParams.pape_size)
      urlParams.set("page_size", String(newParams.pape_size))

    router.push(`/search?${urlParams.toString()}`)
  }

  const handleSearch = (key: string, typs: DocumentType[]) => {
    updateSearchParams({
      key,
      typ: typs,
      page: 1,
    })
  }

  const handlePageChange = (page: number) => {
    updateSearchParams({ page })
  }

  const handleSizeChange = (size: number) => {
    updateSearchParams({
      pape_size: size,
      page: 1,
    })
  }

  return (
    <div className="w-full max-w-6xl flex flex-col gap-8">
      <SearchBox
        onSearch={handleSearch}
        defaultKey={params.key}
        defaultTyps={params.typ}
      />
      {loading
        ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              加载中...
            </div>
          )
        : (
            <>
              <SearchTable subjects={subjects} />
              <SearchPagination
                current={params.page ?? 1}
                total={totalPages}
                size={params.pape_size ?? 10}
                onPageChange={handlePageChange}
                onSizeChange={handleSizeChange}
              />
            </>
          )}
    </div>
  )
}
