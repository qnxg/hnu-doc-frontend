"use client"

import type { Collection } from "@/src/models/collection"
import type { Document } from "@/src/models/document"
import { IconArrowRight, IconDownload } from "@tabler/icons-react"
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

function CollectionTableRow({
  collection,
  showDetail,
  handleShowDetail,
}: Readonly<{
  collection: Collection
  showDetail: boolean
  handleShowDetail: () => void
}>) {
  const description = (item: Document): string => {
    const DOCUMENT_TYPE_MAP = new Map([
      ["final", "期末"],
      ["mid", "期中/机考"],
      ["other", "(其他考试)"],
    ])

    if (item.date) {
      // 日期信息已知
      switch (item.date.typ) {
        case "year":
          // 在某一年考试
          // 高数(A1)2025年期末
          return `${item.name}(${item.categories.join(",")})${item.date.year}年${DOCUMENT_TYPE_MAP.get(item.typ) || "未知考试"}`
        case "semester":
          // 对应课程属于哪一年
          // 2025 - 2026学年高数(A1)期末
          return `${item.date.year} - ${item.date.year + 1}学年${item.name}(${item.categories.join(",")})${DOCUMENT_TYPE_MAP.get(item.typ) || "未知考试"}`
        default:
          // 未知日期信息
          // 高数(A1)期末
          return `${item.name}(${item.categories.join(",")})${DOCUMENT_TYPE_MAP.get(item.typ) || "未知考试"}`
      }
    }
    else {
      // 日期信息未知
      // 高数(A1)期末
      return `${item.name}(${item.categories.join(",")})${DOCUMENT_TYPE_MAP.get(item.typ) || "未知考试"}`
    }
  }

  const handleDownload = (_id: number) => {
    // TODO: 试卷下载 API
  }

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
        <TableRow className="bg-gray-50">
          <TableCell colSpan={3} className="p-0">
            <div className="bg-gray-50 border-l-4 border-primary ml-2 my-1 rounded-r">
              <Table className="bg-white rounded shadow-sm">
                <TableBody>
                  {collection.items.map(item => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell className="w-4 text-center font-medium pl-6">{item.name}</TableCell>
                      <TableCell className="w-full whitespace-normal break-words">{description(item)}</TableCell>
                      <TableCell className="w-4 text-center">{`共${item.page}页`}</TableCell>
                      <TableCell className="w-4 text-center">{`${item.answer ? "" : "不"}含答案`}</TableCell>
                      <TableCell>
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => handleDownload(item.id)}
                        >
                          <IconDownload />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
