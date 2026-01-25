import process from "node:process"

export default {
  BACKEND_BASEURL: process.env.BACKEND_BASEURL || "",
  API_SUFFIX: process.env.API_SUFFIX || "",
}
