const CONVERSION_MAP = ["id"]
const suffixPattern = new RegExp(`(_(${CONVERSION_MAP.join("|")}))(?=_|$)`, "g")
const underscorePattern = /_([a-z])/g

function toCamelCase(str: string): string {
  return str.replace(underscorePattern, (match, p1) => p1.toUpperCase())
}

function toUpperCase(str: string): string {
  return str.replace(suffixPattern, (match, p1, p2) => {
    return p2.toUpperCase()
  })
}

function fieldConverter<T>(data: any): T {
  if (Array.isArray(data)) {
    return data.map(item => fieldConverter(item)) as T
  }

  if (data !== null && typeof data === "object") {
    const result: any = {}

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        let newKey = toUpperCase(key)
        newKey = toCamelCase(newKey)

        // 递归处理值
        result[newKey] = fieldConverter(data[key])
      }
    }

    return result as T
  }

  return data
}

export function converter<T>(data: any): T {
  try {
    return fieldConverter<T>(data)
  }
  catch (error) {
    console.error(error)
    return data
  }
}
