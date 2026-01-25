import ResultTable from "@/src/components/search/result"

export default async function SearchResultPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  return (
    <div>
      <div>返回按钮</div>
      <span>
        {`name: ${name}`}
      </span>
      <ResultTable />
    </div>
  )
}
