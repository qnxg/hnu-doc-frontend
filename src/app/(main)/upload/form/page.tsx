import FileUploader from "@/src/components/upload/file-uploader"
import UploadFormList from "@/src/components/upload/form-list"

export default function UploadFormPage() {
  return (
    <div>
      <UploadFormList />
      <FileUploader />
    </div>
  )
}
