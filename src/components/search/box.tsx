"use client"

import type { DocumentType } from "@/src/models/document"
import { ChevronDownIcon, SearchIcon } from "lucide-react"
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

interface SearchBoxProps {
  onSearch?: (keyword: string, types: DocumentType[]) => void
  defaultKeyword?: string
  defaultTypes?: DocumentType[]
}

const documentTypeLabels: Record<DocumentType, string> = {
  final: "期末",
  mid: "期中",
  other: "其他",
}

export default function SearchBox({
  onSearch,
  defaultKeyword = "",
  defaultTypes = ["final", "mid", "other"],
}: SearchBoxProps) {
  const [keyword, setKeyword] = useState(defaultKeyword)
  const [selectedTypes, setSelectedTypes] = useState<DocumentType[]>(defaultTypes)

  const handleTypeToggle = (type: DocumentType) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type],
    )
  }

  const handleSearch = () => {
    onSearch?.(keyword, selectedTypes)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const getTypeLabel = () => {
    if (selectedTypes.length === 0)
      return "选择类型"
    if (selectedTypes.length === 3)
      return "全部类型"
    return selectedTypes.map(t => documentTypeLabels[t]).join("、")
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
            checked={selectedTypes.includes("final")}
            onCheckedChange={() => handleTypeToggle("final")}
          >
            {documentTypeLabels.final}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedTypes.includes("mid")}
            onCheckedChange={() => handleTypeToggle("mid")}
          >
            {documentTypeLabels.mid}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedTypes.includes("other")}
            onCheckedChange={() => handleTypeToggle("other")}
          >
            {documentTypeLabels.other}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Input
        type="text"
        placeholder="搜索科目名称..."
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
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
