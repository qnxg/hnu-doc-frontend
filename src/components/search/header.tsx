"use client"

import type { DocumentType } from "@/src/models/document"
import { IconArrowLeft } from "@tabler/icons-react"
import { ChevronDownIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const documentTypeLabels: Record<DocumentType, string> = {
  final: "期末",
  mid: "期中",
  other: "其他",
}

export default function ResultHeader({
  name,
  typs,
}: {
  name: string
  typs: DocumentType[]
}) {
  const router = useRouter()

  const [selectedTyps, setSelectedTyps] = useState<DocumentType[]>(typs)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    router.replace(`/search/${encodeURIComponent(name)}?${selectedTyps.map(item => `typ=${item}`).join("&")}`)
  }, [selectedTyps, name])

  const handleTypeToggle = (type: DocumentType) => {
    setSelectedTyps(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type],
    )
  }

  const getTypeLabel = () => {
    if (selectedTyps.length === 0)
      return "选择类型"
    if (selectedTyps.length === 3)
      return "全部类型"
    return selectedTyps.map(t => documentTypeLabels[t]).join("、")
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4">
        <Link href={`/search?${typs.map(item => `typ=${item}`).join("&")}`}>
          <Button variant="outline" size="sm">
            <IconArrowLeft className="mr-2" />
            返回
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">
          <span className="hidden sm:inline-block">科目: </span>
          {" "}
          {name}
        </h1>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <h1 className="text-xl font-semibold hidden md:block">类型:</h1>
        <DropdownMenu>
          { isClient
            ? (
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-40 justify-between">
                    { getTypeLabel() }
                    <ChevronDownIcon className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
              )
            : (
                <Button variant="outline" className="w-full sm:w-40 justify-between">
                  加载中...
                  <ChevronDownIcon className="ml-2" />
                </Button>
              )}
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>试卷类型</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={selectedTyps.includes("final")}
              onCheckedChange={() => handleTypeToggle("final")}
            >
              {documentTypeLabels.final}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedTyps.includes("mid")}
              onCheckedChange={() => handleTypeToggle("mid")}
            >
              {documentTypeLabels.mid}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedTyps.includes("other")}
              onCheckedChange={() => handleTypeToggle("other")}
            >
              {documentTypeLabels.other}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
