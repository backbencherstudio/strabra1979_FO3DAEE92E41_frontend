import { baseApi } from '@/api/baseApi'
import { getErrorMessage } from '@/lib/farmatters'
import { EditableSection, setInitialTemplateData } from '@/redux/features/template/templateSlice'
import type { EditBoxSize, ITemplateSection, WithApiStatus } from '@/types'
import {
  IDashboardTemplate,
  IDashboardTemplateListItem,
  ITemplateActiveStatus,
} from '@/types/template'
import { toast } from 'sonner'

export type ITemplateSectionConfig = {
  type: ITemplateSection
  label?: string
  width?: EditBoxSize
}

export type IReorderAndUpdateSectionPropertyPayload = {
  order: ITemplateSection[]
  sections?: ITemplateSectionConfig[]
}

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

          const sections: EditableSection[] = data?.sections?.map((item) => ({
            id: item.type,
            type: item.type,
            label: item.label,
            order: item.order,
            changedFields: [],
            style: {
              width: item?.style?.width ?? 'full',
            },
          }))

          dispatch(setInitialTemplateData({ sections }))
        } catch (error) {
          toast.error('Failed to load Template data', { description: getErrorMessage(error) })
        }
      },
    }),
    hardDeleteSingleDashboardTemplate: builder.mutation<WithApiStatus<void>, { id: string }>({
      query: ({ id }) => ({
        url: `/dashboard-templates/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Templates'],
    }),
    toggleTemplateStatus: builder.mutation<WithApiStatus<void>, { id: string }>({
      query: ({ id }) => ({
        url: `/dashboard-templates/${id}/toggle-status`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Templates'],
    }),
    // updateSectionLayout: builder.mutation<void, { id: string; data: IUpdateSectionStylePayload }>({
    //   query: ({ id, data }) => ({
    //     url: `/dashboard-templates/${id}/sections/layout`,
    //     method: 'PATCH',
    //     body: data,
    //   }),
    //   invalidatesTags: ['Templates'],
    // }),
    // updateSectionOrder: builder.mutation<
    //   void,
    //   { id: string; data: { sections: ITemplateSection[] } }
    // >({
    //   query: ({ id, data }) => ({
    //     url: `/dashboard-templates/${id}/sections/reorder`,
    //     method: 'PATCH',
    //     body: data,
    //   }),
    //   // invalidatesTags: ['Templates'],
    // }),
    reorderAndUpdateSectionProperties: builder.mutation<
      void,
      { id: string; data: IReorderAndUpdateSectionPropertyPayload }
    >({
      query: ({ id, data }) => ({
        url: `/dashboard-templates/${id}/sections`,
        method: 'PATCH',
        body: data,
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
  useToggleTemplateStatusMutation,
  useReorderAndUpdateSectionPropertiesMutation,
} = templateManagementApi
export default templateManagementApi
