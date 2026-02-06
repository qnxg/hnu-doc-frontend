import { Suspense } from "react"
import { getCollections } from "@/src/apis/collection.server"
import CollectionTable from "@/src/components/dashboard/table"

export default async function DashboardPage() {
  const collections = await getCollections()
    .then(response => response)
    .catch(() => [])

  return (
    <div className="w-full max-w-6xl flex flex-col gap-8">
      <div className="w-full text-center text-3xl">
        常用试卷集
      </div>
      <Suspense fallback={(
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <h1 className="text-xl font-semibold">加载中...</h1>
        </div>
      )}
      >
        <CollectionTable collections={collections} />
      </Suspense>
    </div>
  )
}
