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

function CollectionTableDetail({
  document,
}: Readonly<{
  document: Document
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
    <div key={document.id} className="bg-white border border-gray-200 p-3 md:p-4 shadow-sm">
      <div className="flex flex-col md:flex-row md:documents-center gap-2 md:gap-4">
        {/* 主要信息区域 */}
        <div className="flex-1 min-w-0 space-y-1">
          <h4 className="font-medium text-sm md:text-base text-gray-900 truncate">{document.name}</h4>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed break-words">{description(document)}</p>
        </div>

        {/* 右侧信息和按钮区域 */}
        <div className="flex justify-between md:justify-end documents-center gap-4 md:gap-6">
          <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-gray-500">
            <span>{`共${document.page}页`}</span>
            <span>{`${document.answer ? "" : "不"}含答案`}</span>
          </div>
          <Button
            size="xs"
            variant="outline"
            onClick={() => handleDownload(document.id)}
            className="flex-shrink-0"
          >
            <IconDownload />
          </Button>
        </div>
      </div>
    </div>
  )
}

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
                <CollectionTableDetail
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
