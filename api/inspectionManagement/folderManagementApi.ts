import { baseApi } from '@/api/baseApi'
import type {
  ICreateNewFolderWithInspectionPayload,
  IDashboardInspectionListItem,
  IFilterPayload,
  IFolderInspectionReportSelectItem,
  IFolderItem,
  ISingleFolderInfo,
  WithApiStatus,
} from '@/types'

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
    getinspectionProperty: builder.query<WithApiStatus<IFolderItem[]>, { dashboardId: string }>({
      query: ({ dashboardId }) => ({
        url: `/inspections/property/${dashboardId}`,
      }),
      providesTags: ['Folders'],
    }),
    getInspectionReportsWithDashboardId: builder.query<
      WithApiStatus<IFolderInspectionReportSelectItem[]>,
      { dashboardId: string } & IFilterPayload
    >({
      query: ({ dashboardId, ...params }) => ({
        url: `/dashboards/${dashboardId}/inspections`,
        params: params,
      }),
    }),
    createNewFolderWithInspectionData: builder.mutation<
      WithApiStatus<void>,
      { dashboardId: string; data: ICreateNewFolderWithInspectionPayload }
    >({
      query: ({ dashboardId, data }) => ({
        url: `/dashboards/${dashboardId}/folders`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Folders'],
    }),
    getSingleFolderInfo: builder.query<
      WithApiStatus<ISingleFolderInfo>,
      { dashboardId: string; folderId: string }
    >({
      query: ({ dashboardId, folderId }) => ({
        url: `/dashboards/${dashboardId}/folders/${folderId}`,
      }),
      providesTags: (_, __, arg) => [{ type: 'Folders', id: arg?.folderId }],
    }),
    deleteSingleFolder: builder.mutation<
      WithApiStatus<void>,
      { dashboardId: string; folderId: string }
    >({
      query: ({ dashboardId, folderId }) => ({
        url: `/dashboards/${dashboardId}/folders/${folderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Folders'],
    }),
    renameFolderName: builder.mutation<
      WithApiStatus<void>,
      { dashboardId: string; folderId: string; data: { name: string } }
    >({
      query: ({ dashboardId, folderId, data }) => ({
        url: `/dashboards/${dashboardId}/folders/${folderId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Folders'],
    }),
    addInspectionsToAFolder: builder.mutation<
      WithApiStatus<void>,
      {
        dashboardId: string
        folderId: string
        data: { inspectionIds: ICreateNewFolderWithInspectionPayload['inspectionIds'] }
      }
    >({
      query: ({ dashboardId, folderId, data }) => ({
        url: `/dashboards/${dashboardId}/folders/${folderId}/inspections`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Folders'],
    }),
    removeAnInspectionFromAFolder: builder.mutation<
      WithApiStatus<void>,
      { dashboardId: string; folderId: string; inspectionId: string }
    >({
      query: ({ dashboardId, folderId, inspectionId }) => ({
        url: `/dashboards/${dashboardId}/folders/${folderId}/inspections/${inspectionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Folders'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllFolderWithDashboardIdQuery,
  useGetinspectionPropertyQuery,
  useGetInspectionReportsWithDashboardIdQuery,
  useCreateNewFolderWithInspectionDataMutation,
  useLazyGetSingleFolderInfoQuery,
  useDeleteSingleFolderMutation,
  useRenameFolderNameMutation,
  useRemoveAnInspectionFromAFolderMutation,
  useAddInspectionsToAFolderMutation,
} = folderManagementApi
export default folderManagementApi
