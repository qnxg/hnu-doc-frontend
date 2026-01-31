"use client"

import type { Collection } from "@/src/models/collection"
import { IconArrowRight } from "@tabler/icons-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DocumentCard from "@/src/components/common/document-card"

function CollectionTableRow({
  collection,
  showDetail,
  handleShowDetail,
}: Readonly<{
  collection: Collection
  showDetail: boolean
  handleShowDetail: () => void
}>) {
  return (
    <>
      <TableRow key={collection.id}>
        <TableCell className="w-4 text-center font-medium">{collection.name}</TableCell>
        <TableCell className="whitespace-normal break-words">{collection.description}</TableCell>
        <TableCell className="text-center">
          <Button
            size="xs"
            variant={showDetail ? "outline" : "default"}
            onClick={handleShowDetail}
          >
            <IconArrowRight
              className={`transition-transform duration-200 ${showDetail ? "rotate-90" : ""}`}
            />
            {showDetail ? "折叠" : "展开"}
          </Button>
        </TableCell>
      </TableRow>
      {showDetail && (
        <TableRow>
          <TableCell colSpan={3} className="p-0">
            <div className="border-l-4 border-primary ml-2 pl-2">
              {collection.items.map(item => (
                <DocumentCard
                  key={item.id}
                  document={item}
                />
              ))}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

export default function CollectionTable({
  collections,
}: Readonly<{
  collections: Collection[]
}>) {
  const [showDetails, setShowDetails] = useState<Record<number, boolean>>({})

  const handleShowDetails = (id: number) => {
    setShowDetails(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-4 text-center">名称</TableHead>
            <TableHead>描述</TableHead>
            <TableHead className="w-4 text-center">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { collections.map(collection => (
            <CollectionTableRow
              key={collection.id}
              collection={collection}
              showDetail={showDetails[collection.id]}
              handleShowDetail={() => handleShowDetails(collection.id)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
