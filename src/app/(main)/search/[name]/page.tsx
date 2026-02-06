import type { DocumentType } from "@/src/models/document"
import React from "react"

import { searchSubject } from "@/src/apis/search.server"
import ResultHeader from "@/src/components/search/header"
import ResultTable from "@/src/components/search/result"

export default async function SearchResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>
  searchParams: Promise<{ typ: DocumentType[] }>
}) {
  const { name } = await params
  const { typ } = await searchParams

  const documents = await searchSubject({
    name: decodeURIComponent(name),
    typ: Array.isArray(typ) ? typ : ["final", "mid", "other"],
  }).catch(() => [])

  return (
    <div className="w-full max-w-6xl flex flex-col gap-8">
      <ResultHeader
        name={decodeURIComponent(name)}
        typs={Array.isArray(typ) ? typ : ["final", "mid", "other"]}
      />

      <ResultTable documents={documents} />
    </div>
  )
}
