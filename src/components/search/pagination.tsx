"use client"

import { Field, FieldLabel } from "@/components/ui/field"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SearchPaginationProps {
  current: number
  total: number
  size: number
  onPageChange: (page: number) => void
  onSizeChange: (size: number) => void
}

export default function SearchPagination({
  current,
  total,
  size,
  onPageChange,
  onSizeChange,
}: SearchPaginationProps) {
  // 生成页码数组
  const generatePageNumbers = () => {
    const pages: (number | "ellipsis")[] = []

    if (total <= 7) {
      // 如果总页数小于等于7页，显示所有页码
      for (let i = 1; i <= total; i++) {
        pages.push(i)
      }
    }
    else {
      // 总是显示第一页
      pages.push(1)

      if (current > 3) {
        pages.push("ellipsis")
      }

      // 显示当前页附近的页码
      const start = Math.max(2, current - 1)
      const end = Math.min(total - 1, current + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (current < total - 2) {
        pages.push("ellipsis")
      }

      // 总是显示最后一页
      if (total > 1) {
        pages.push(total)
      }
    }

    return pages
  }

  const handlePrevious = () => {
    if (current > 1) {
      onPageChange(current - 1)
    }
  }

  const handleNext = () => {
    if (current < total) {
      onPageChange(current + 1)
    }
  }

  const handleSizeChange = (value: string) => {
    onSizeChange(Number(value))
  }

  if (total <= 1) {
    return null
  }

  const pageNumbers = generatePageNumbers()

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">每页显示</FieldLabel>
        <Select value={String(size)} onValueChange={handleSizeChange}>
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePrevious()
              }}
              aria-disabled={current === 1}
              className={current === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {pageNumbers.map((page, index) => (
            <PaginationItem key={index}>
              {page === "ellipsis"
                ? (
                    <PaginationEllipsis />
                  )
                : (
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        onPageChange(page)
                      }}
                      isActive={current === page}
                    >
                      {page}
                    </PaginationLink>
                  )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handleNext()
              }}
              aria-disabled={current === total}
              className={current === total ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
