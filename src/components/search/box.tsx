"use client"

import type { DocumentType } from "@/src/models/document"
import { ChevronDownIcon, SearchIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export interface SearchBoxProps {
  onSearch?: (key: string, typs: DocumentType[]) => void
  defaultKey?: string
  defaultTyps?: DocumentType[]
}

const documentTypeLabels: Record<DocumentType, string> = {
  final: "期末",
  mid: "期中",
  other: "其他",
}

export default function SearchBox() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [key, setKey] = useState(searchParams.get("key") || "")
  const [selectedTyps, setSelectedTyps] = useState<DocumentType[]>(
    searchParams.getAll("typ").length > 0
      ? (searchParams.getAll("typ") as DocumentType[])
      : ["final", "mid", "other"],
  )

  const handleTypeToggle = (type: DocumentType) => {
    setSelectedTyps(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type],
    )
  }

  const handleSearch = () => {
    const urlParams = new URLSearchParams()
    if (key)
      urlParams.set("key", key)
    if (selectedTyps.length > 0) {
      selectedTyps.forEach(type => urlParams.append("typ", type))
    }
    router.push(`/search?${urlParams.toString()}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const getTypeLabel = () => {
    if (selectedTyps.length === 0)
      return "选择类型"
    if (selectedTyps.length === 3)
      return "全部类型"
    return selectedTyps.map(t => documentTypeLabels[t]).join("、")
  }

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-40 justify-between">
            {getTypeLabel()}
            <ChevronDownIcon className="ml-2" />
          </Button>
        </DropdownMenuTrigger>
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

      <Input
        type="text"
        placeholder="搜索科目名称..."
        value={key}
        onChange={e => setKey(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1"
      />

      <Button onClick={handleSearch} className="w-full sm:w-auto">
        <SearchIcon className="mr-2" />
        搜索
      </Button>
    </div>
  )
}
