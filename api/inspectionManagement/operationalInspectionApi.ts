import { baseApi } from '@/api/baseApi'
import type {
  IFilterPayload,
  IInspectionScoreCheckboxValue,
  IOperationalInspectionTableItem,
  IPaginationPayload,
  WithApiStatus,
  WithPaginationAndStatus,
} from '@/types'

export type IInspectionFormData = {
  headerData: {
    [key: string]: string
  }
  scores: {
    [key: string]: IInspectionScoreCheckboxValue
  }
  embedFields: {
    [key: string]: string
  }
  repairItems?: Array<{
    title: string
    status: string
    description: string
  }>
  nteValue: number
  additionalComments: string
  inspectedAt: string
  mediaFieldKeys: Array<string>
}
interface ISubmitInspectionDataPayload {
  scheduledInspectionId: string
  dashboardId: string
  data: IInspectionFormData
  files: File[]
}

const operationalInspectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSheduledInspectionsAssignedToMe: builder.query<
      WithPaginationAndStatus<IOperationalInspectionTableItem[]>,
      (IPaginationPayload & IFilterPayload<undefined>) | void
    >({
      query: (args) => ({
        url: `/inspections/scheduled/my`,
        params: args ?? undefined,
      }),
      providesTags: ['InspectionManagement'] as const,
    }),
    startAScheduledInspectionToChangeStatus: builder.mutation<
      WithApiStatus<{ scheduledInspectionId: string; dashboardId: string }>,
      { scheduledInspectionId: string }
    >({
      query: ({ scheduledInspectionId }) => ({
        url: `/inspections/scheduled/${scheduledInspectionId}/start`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Overview'],
    }),
    submitAllInspectionFormData: builder.mutation<
      WithApiStatus<void>,
      ISubmitInspectionDataPayload
    >({
      query: ({ dashboardId, scheduledInspectionId, data, files }) => {
        const jsonData = JSON.stringify(data)

        // Prepare FormData for sending
        const formData = new FormData()
        formData.append('data', jsonData)

        files.forEach((file) => {
          formData.append('files', file)
        })

        console.log(formData)

        return {
          url: `/inspections/property/${dashboardId}/submit/${scheduledInspectionId}`,
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['Overview', 'InspectionManagement'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllSheduledInspectionsAssignedToMeQuery,
  useStartAScheduledInspectionToChangeStatusMutation,
  useSubmitAllInspectionFormDataMutation,
} = operationalInspectionApi
export default operationalInspectionApi
