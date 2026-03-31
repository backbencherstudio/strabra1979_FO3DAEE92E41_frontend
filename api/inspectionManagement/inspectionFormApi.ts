import { baseApi } from '@/api/baseApi'
import type { IPropertyInspectionFormData, WithApiStatus } from '@/types'

const inspectionFormApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPropertyInspectionForm: builder.query<WithApiStatus<IPropertyInspectionFormData>, string>({
      query: (dashboardId) => `/inspections/property/${dashboardId}/form`,
    }),
  }),
  overrideExisting: false,
})

export const { useGetPropertyInspectionFormQuery } = inspectionFormApi
export default inspectionFormApi
