export default async function UploadReviewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div>
      Upload Review Page
      <br />
      <span>
        {`id: ${id}`}
      </span>
    </div>
  )
}
