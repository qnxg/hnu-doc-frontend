import { IconArrowLeft } from "@tabler/icons-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { searchSubject } from "@/src/apis/search.server"
import ResultTable from "@/src/components/search/result"

export default async function SearchResultPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params

  const documents = await searchSubject({
    name: decodeURIComponent(name),
    typ: ["final", "mid", "other"],
  }).catch(() => [])

  return (
    <div className="w-full max-w-6xl flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link href="/search">
          <Button variant="outline" size="sm">
            <IconArrowLeft className="mr-2" />
            返回
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">
          { `科目: ${decodeURIComponent(name)}` }
        </h1>
      </div>

      <ResultTable documents={documents} />
    </div>
  )
}
