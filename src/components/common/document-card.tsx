import type { Document } from "@/src/models/document"
import { IconDownload } from "@tabler/icons-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { download } from "@/src/apis/download"
import DownloadModal from "@/src/components/common/download-modal"

export default function DocumentCard({
  document,
}: Readonly<{
  document: Document
}>) {
  const [isDownloading, setIsDownloading] = useState(false)

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
        case "grade":
          // 对应哪一级学生
          // 2024级高数(A1)期末
          return `${item.date.year}级${item.name}(${item.categories.join(",")})${DOCUMENT_TYPE_MAP.get(item.typ) || "未知考试"}`
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

  const handleDownload = (id: number) => {
    setIsDownloading(true)
    download(id)
      .then((response) => {
        toast.success(`开始下载: ${response}`)
      })
      .catch(() => {
        toast.error("下载失败，请稍后重试")
      })
      .finally(() => setIsDownloading(false))
  }

  return (
    <div key={document.id} className="bg-white border border-gray-200 p-3 md:p-4 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        {/* 主要信息区域 */}
        <div className="flex-1 min-w-0 space-y-1">
          <h4 className="font-medium text-sm md:text-base text-gray-900 truncate">{document.name}</h4>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed break-words">{description(document)}</p>
        </div>

        {/* 右侧信息和按钮区域 */}
        <div className="flex justify-between md:justify-end items-center gap-4 md:gap-6">
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

      <DownloadModal isOpen={isDownloading} />
    </div>
  )
}
