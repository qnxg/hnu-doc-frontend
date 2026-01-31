"use client"

import type { Document } from "@/src/models/document"
import DocumentCard from "@/src/components/common/document-card"

export default function ResultTable({
  documents,
}: Readonly<{
  documents: Document[]
}>) {
  return (
    <div className="space-y-2">
      {documents.map(document => (
        <DocumentCard
          key={document.id}
          document={document}
        />
      ))}
    </div>
  )
}
