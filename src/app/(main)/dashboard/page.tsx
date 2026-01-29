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
      <CollectionTable collections={collections} />
    </div>
  )
}
