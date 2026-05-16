//
// uploadApi.ts
//

import { baseApi } from '../baseApi'

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface IInitiateMultipartUploadPayload {
  fileName: string
  mimeType: string
  fileSize: number
}

export interface IInitiateMultipartUploadResponse {
  sessionId: string
  uploadId: string
}

export interface IGetPresignedUrlPayload {
  sessionId: string
  partNumber: number
}

export interface IGetPresignedUrlResponse {
  url: string
}

export interface IUploadMediaChunkPayload {
  url: string
  chunk: Blob
}

export interface IUploadMediaChunkResponse {
  eTag: string
}

export interface ISaveUploadedPartPayload {
  sessionId: string
  partNumber: number
  eTag: string
}

export interface ISaveUploadedPartResponse {
  success: boolean
  message: string
}

export interface ICompleteMultipartUploadPayload {
  sessionId: string
}

export interface ICompleteMultipartUploadResponse {
  location: string
  key: string
  fileName: string
  success: boolean
  url: string
  fileSize: number
  fileType: 'PHOTO' | 'VIDEO' | 'EMBED' | 'PDF'
}

export interface IAbortMultipartUploadPayload {
  sessionId: string
}

export interface IAbortMultipartUploadResponse {
  success: boolean
  message: string
}

export interface IGetUploadStatusPayload {
  sessionId: string
}

export interface IGetUploadStatusResponse {
  status: string
  progress: number
  uploadedParts: number
  totalParts: number
}

/* -------------------------------------------------------------------------- */
/*                                    API                                     */
/* -------------------------------------------------------------------------- */

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiateMultipartUpload: builder.mutation<
      IInitiateMultipartUploadResponse,
      IInitiateMultipartUploadPayload
    >({
      query: (body) => ({
        url: '/uploads/minio/initiate',
        method: 'POST',
        body,
      }),
    }),

    getPresignedUrl: builder.query<IGetPresignedUrlResponse, IGetPresignedUrlPayload>({
      query: ({ sessionId, partNumber }) => ({
        url: `/uploads/minio/${sessionId}/presigned-url/${partNumber}`,
        method: 'GET',
      }),
    }),

    uploadMediaChunk: builder.mutation<IUploadMediaChunkResponse, IUploadMediaChunkPayload>({
      // arg, api, extraOptions, baseQuery
      async queryFn({ url, chunk }) {
        try {
          const response = await fetch(url, {
            method: 'PUT',
            body: chunk,
            headers: {
              'Content-Type': 'application/octet-stream',
            },
          })

          if (!response.ok) {
            return {
              error: {
                status: response.status,
                data: 'Failed to upload chunk',
              },
            }
          }

          const eTag = response.headers.get('ETag') ?? ''

          return {
            data: {
              eTag,
            },
          }
        } catch (error: unknown) {
          return {
            error: {
              status: 'FETCH_ERROR',
              error: error instanceof Error ? error.message : 'Unknown error',
            },
          }
        }
      },
    }),

    saveUploadedPart: builder.mutation<ISaveUploadedPartResponse, ISaveUploadedPartPayload>({
      query: ({ sessionId, partNumber, eTag }) => ({
        url: `/uploads/minio/${sessionId}/part/complete`,
        method: 'POST',
        body: {
          partNumber,
          eTag,
        },
      }),
    }),

    completeMultipartUpload: builder.mutation<
      ICompleteMultipartUploadResponse,
      ICompleteMultipartUploadPayload
    >({
      query: ({ sessionId }) => ({
        url: `/uploads/minio/${sessionId}/complete`,
        method: 'POST',
      }),
    }),

    abortMultipartUpload: builder.mutation<
      IAbortMultipartUploadResponse,
      IAbortMultipartUploadPayload
    >({
      query: ({ sessionId }) => ({
        url: `/uploads/minio/${sessionId}`,
        method: 'DELETE',
      }),
    }),

    getUploadStatus: builder.query<IGetUploadStatusResponse, IGetUploadStatusPayload>({
      query: ({ sessionId }) => ({
        url: `/uploads/${sessionId}/status`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useInitiateMultipartUploadMutation,
  useLazyGetPresignedUrlQuery,
  useUploadMediaChunkMutation,
  useSaveUploadedPartMutation,
  useCompleteMultipartUploadMutation,
  useAbortMultipartUploadMutation,
  useLazyGetUploadStatusQuery,
} = uploadApi
