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
    <div className="flex items-center gap-4">
      <Link href={`/search?${typs.map(item => `typ=${item}`).join("&")}`}>
        <Button variant="outline" size="sm">
          <IconArrowLeft className="mr-2" />
          返回
        </Button>
      </Link>
      <div className="flex-1 flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          { `科目: ${name}` }
        </h1>
        <h1 className="text-xl font-semibold flex items-center gap-2">
          类型:
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
            <DropdownMenuContent className="w-40">
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
        </h1>
      </div>
    </div>
  )
}
