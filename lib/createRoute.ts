type ExtractParams<T extends string> = T extends `${string}[${infer Param}]${infer Rest}`
  ? [Param, ...ExtractParams<Rest>]
  : []

type ParamsRecord<T extends string[]> = {
  [K in T[number]]: string | number
}

type Query = Record<string, string | number | undefined>

type BuildArgs<T extends string> =
  ExtractParams<T> extends []
    ? [query?: Query]
    : [params: ParamsRecord<ExtractParams<T>>, query?: Query]

export function createRoute<T extends string>(template: T) {
  return {
    template,
    build(...args: BuildArgs<T>) {
      let path = template as string
      let params: Record<string, string | number> = {}
      let query: Query | undefined

      const first = args[0]

      if (first && typeof first === 'object') {
        // Check if it looks like a query-only call (no path params expected)
        // We separate by checking if any key matches a template param
        const templateParams = [...template.matchAll(/\[([^\]]+)\]/g)].map((m) => m[1])

        if (templateParams.length === 0) {
          query = first as Query
        } else {
          params = first as Record<string, string | number>
          query = args[1] as Query | undefined
        }
      }

      path = path.replace(/\[([^\]]+)\]/g, (_, key) => String(params[key] ?? key))

      if (!query) return path

      const search = new URLSearchParams(
        Object.entries(query)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)]),
      ).toString()

      return search ? `${path}?${search}` : path
    },
  }
}
