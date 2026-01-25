import CollectionTable from "@/src/components/dashboard/table"

export default function DashboardPage() {
  return (
    <div className="flex-1 w-full p-32">
      <div className="w-full text-center text-3xl">常用试卷集</div>
      <CollectionTable />
    </div>
  )
}
