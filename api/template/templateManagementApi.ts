import { baseApi } from '@/api/baseApi'
import type { WithApiStatus } from '@/types'
import {
  ITemplateActiveStatus,
  IDashboardTemplate,
  IDashboardTemplateListItem,
} from '@/types/template'

const templateManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewTemplate: builder.mutation<
      WithApiStatus<IDashboardTemplateListItem>,
      { name: string }
    >({
      query: (data) => ({
        url: `/dashboard-templates`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Templates'],
    }),
    getDashboardTemplateList: builder.query<
      WithApiStatus<IDashboardTemplateListItem[]>,
      { status: ITemplateActiveStatus } | void
    >({
      query: (args) => ({
        url: `/dashboard-templates`,
        params: args ?? undefined,
      }),
      providesTags: ['Templates'],
    }),
    getASingleDashboardTemplate: builder.query<WithApiStatus<IDashboardTemplate>, { id: string }>({
      query: ({ id }) => ({
        url: `/dashboard-templates/${id}`,
      }),
      providesTags: ['Templates'],
    }),
    hardDeleteSingleDashboardTemplate: builder.mutation<WithApiStatus<void>, { id: string }>({
      query: ({ id }) => ({
        url: `/dashboard-templates/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Templates'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateNewTemplateMutation,
  useGetDashboardTemplateListQuery,
  useHardDeleteSingleDashboardTemplateMutation,
} =
  templateManagementApi
export default templateManagementApi
