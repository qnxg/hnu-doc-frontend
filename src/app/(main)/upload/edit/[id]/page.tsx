export default async function UploadEditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div>
      Upload Editor Page
      <br />
      <span>
        {`id: ${id}`}
      </span>
    </div>
  )
}
