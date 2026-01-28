function LoginForm() {
  return (
    <div className="w-96 h-144 rounded-lg shadow-md flex items-center justify-center">
      登录表单
    </div>
  )
}

export default function IndexPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-6xl flex items-center justify-between">
        <div className="flex-1 flex flex-col gap-8">
          <span className="text-5xl">湖南大学试卷库</span>
          <span className="text-3xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto consequatur cupiditate dolorem doloribus ducimus eligendi esse exercitationem explicabo ipsam libero maxime nisi nostrum, nulla odit quas quia ratione rem!</span>
        </div>
        <div className="flex-1 flex items-center justify-end">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
