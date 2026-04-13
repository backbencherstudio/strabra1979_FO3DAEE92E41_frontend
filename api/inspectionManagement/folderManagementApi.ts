import { baseApi } from '@/api/baseApi'
import type { IFolderInspectionReportSelectItem, IFolderItem, WithApiStatus } from '@/types'

const folderManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFolderWithDashboardId: builder.query<
      WithApiStatus<IFolderItem[]>,
      { dashboardId: string }
    >({
      query: ({ dashboardId }) => ({
        url: `/dashboards/${dashboardId}/folders`,
      }),
      providesTags: ['Folders'],
    }),
    getInspectionReportsWithDashboardId: builder.query<
      WithApiStatus<IFolderInspectionReportSelectItem[]>,
      { dashboardId: string }
    >({
      query: ({ dashboardId }) => ({
        url: `/dashboards/${dashboardId}/inspections`,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllFolderWithDashboardIdQuery, useGetInspectionReportsWithDashboardIdQuery } =
  folderManagementApi
export default folderManagementApi
