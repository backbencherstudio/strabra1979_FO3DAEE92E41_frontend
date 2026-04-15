"use client";

import SharedPropertyCardListActions from "@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions";
import PaginationControls from "@/components/reusable/Pagination/Pagination";
import PropertyCard, {
  PropertyCardSkeleton,
} from "@/components/reusable/PropertyCard/PropertyCard";
import SectionCard from "@/components/reusable/SectionCard/SectionCard";
import {
  SharedPropertyCardListContextProvider,
  useSharedPropertyCardListContext,
} from "@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListContext";

import {
  useGetPropertiesQuery,
  useGetPropertyCheckQuery,
  useGetPropertyDashboardDetailsQuery,
} from "@/api/dashboard/properties/propertiesApi";

import {
  usePaginationPage,
  usePaginatedQuery,
  PaginationPageProvider,
} from "@/components/reusable/Pagination/PaginationPageProvider";

import { addDaysBy, naIfEmpty } from "@/lib/farmatters";
import { PropertyCardAdminInfoList } from "@/components/reusable/PropertyCard/PropertyCardAdminInfoList";
import { routes } from "@/constant";

export default function AutorizedViewerLandingPage() {
  return (
    <SharedPropertyCardListContextProvider>
      <PaginationPageProvider>
        <AutorizedViewerLandingPageContent />
      </PaginationPageProvider>
    </SharedPropertyCardListContextProvider>
  );
}

function AutorizedViewerLandingPageContent() {
  const { sortOrder, dateFrom, search } =
    useSharedPropertyCardListContext();

  const { page } = usePaginationPage();

  const {
    data: { data: properties = [], meta } = {},
    isLoading,
  } = useGetPropertiesQuery({
    page,
    sortOrder,
    search,
    limit: 9,
    dateFrom: dateFrom?.formatted,
    dateTo: dateFrom?.raw ? addDaysBy(dateFrom.raw, 1) : undefined,
    
  });

  usePaginatedQuery({ meta_data: meta });
  console.log(properties,"-=-=-=-=-=-=");

  return (
    <div className="grid grid-cols-1 gap-6">
      <SectionCard>
        <SharedPropertyCardListActions
          showSearch
          showDateFilter
          showSortOrder
          title="Shared Property Dashboards"
        />

        <div className="mt-4.5 grid gap-x-5 gap-y-4.5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))
            : properties.map((p: any) => (
                <PropertyCardWrapper key={p.id} p={p} />
              ))}
        </div>
      </SectionCard>

      <PaginationControls />
    </div>
  );
}

function PropertyCardWrapper({ p }: any) {
  const { data, isLoading } = useGetPropertyCheckQuery(
    p?.dashboard?.id,
    {
      skip: !p?.dashboard?.id,
    }
  );

  const hasAccess = data?.hasAccess ?? false;

  if (isLoading) return <PropertyCardSkeleton />;

  return (
    <PropertyCard
      {...p}
      slug={
        hasAccess
          ? routes.viewer.propertyDetail.build({
              dashboardId: p?.dashboard?.id,
            })
          : "#"
      }
      dashboardId={p?.dashboard.id}
      hasAccess={hasAccess}
      propertyName={p.name}
      address={naIfEmpty(p.address)}
      score={p?.dashboard?.latestInspection?.overallScore}
    >
      <PropertyCardAdminInfoList property={p} />
    </PropertyCard>
  );
}