import { baseApi } from '@/api/baseApi'
import type { WithApiStatus } from '@/types'
import { ITemplateActiveStatus, ITemplateListItem } from '@/types/template'

const templateManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardTemplateList: builder.query<
      WithApiStatus<ITemplateListItem[]>,
      { status: ITemplateActiveStatus } | void
    >({
      query: (args) => ({
        url: `/dashboard-templates`,
        params: args ?? undefined,
      }),
      providesTags: ['Templates'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetDashboardTemplateListQuery } = templateManagementApi
export default templateManagementApi
