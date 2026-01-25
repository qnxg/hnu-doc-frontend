import { Button } from "@/components/ui/button"
import UploadTable from "@/src/components/upload/table"

export default function UploadPage() {
  return (
    <div>
      <UploadTable />
      <UploadTable />
      <Button>上传按钮</Button>
    </div>
  )
}
