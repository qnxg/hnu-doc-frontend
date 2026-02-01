import type { Subject } from "@/src/apis/search"
import type { DocumentType } from "@/src/models/document"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function SearchTable({
  typs,
  subjects,
}: {
  typs: DocumentType[]
  subjects: Subject[]
}) {
  const getLink = (name: string) => {
    const urlParams = new URLSearchParams()
    typs.forEach(item => urlParams.append("typ", item))
    return `/search/${encodeURIComponent(name)}?${urlParams.toString()}`
  }

  if (subjects.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        暂无搜索结果
      </div>
    )
  }

  return (
    <>
      {/* 宽屏幕表格布局 */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-full">科目名称</TableHead>
              <TableHead className="w-4 text-center">最新年份</TableHead>
              <TableHead className="w-4 text-center">试卷数量</TableHead>
              <TableHead className="w-4 text-center">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject, index) => (
              <TableRow key={index} className="group">
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell className="text-center">{subject.year ?? "未知"}</TableCell>
                <TableCell className="text-center">{subject.count}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <Link href={getLink(subject.name)}>
                      详情
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 窄屏幕卡片布局 */}
      <div className="md:hidden flex flex-col gap-3">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex gap-4 items-center"
          >
            <div className="flex-1 flex flex-col gap-1 min-w-0">
              <h3 className="font-medium text-base truncate">{subject.name}</h3>
              <p className="text-sm text-muted-foreground">
                最新年份:
                {" "}
                {subject.year ?? "未知"}
                {" "}
                · 试卷数量:
                {" "}
                {subject.count}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0"
              asChild
            >
              <Link href={getLink(subject.name)}>
                详情
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}
