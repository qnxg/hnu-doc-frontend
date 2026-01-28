import process from "node:process"

export default {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:4523/m1/6049750-5739759-default",
}
