import { baseApi } from '@/api/baseApi'
import { EditableSection, setInitialTemplateData } from '@/redux/features/template/templateSlice'
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
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: { data },
          } = await queryFulfilled

          const sections: EditableSection[] = data.sections.map((item) => ({
            id: item.type,
            type: item.type,
            label: item.label,
            order: item.order,
            size: 'full',
          }))

          dispatch(setInitialTemplateData({ sections }))
        } catch (error) {}
      },
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
  useGetASingleDashboardTemplateQuery,
} = templateManagementApi
export default templateManagementApi
