import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image"
import buildingImg from '@/public/building.svg'
import analyticsImg from '@/public/analytics.svg'
import viewerImg from '@/public/document.svg'
 import SignUpForm from "./SignUpForm"

export function AccountTypeTabs() {
  return (
    <Tabs defaultValue="property-manager" className="w-full mt-4.5">
      {/* Responsive TabsList - stacks vertically on mobile, row on desktop */}
      <TabsList className="w-full flex flex-col sm:flex-row gap-3 h-auto bg-transparent">
        <TabsTrigger 
          value="property-manager"  
          className="w-full sm:w-1/3 data-[state=active]:border-[#427cb2] data-[state=active]:bg-[#edf3f9] 
            data-[state=active]:border-2 data-[state=active]:text-[#284b6c] data-[state=active]:font-semibold 
            text-[#4a4c56] text-sm sm:text-base border border-[#ede9df] bg-[#fcfbfa] 
            hover:text-gray-900 py-4 sm:py-6 flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4"
        >
          <Image src={buildingImg} alt="building img" className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="truncate">Property Manager</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="authorized-viewer" 
          className="w-full sm:w-1/3 data-[state=active]:border-[#427cb2] data-[state=active]:bg-[#edf3f9] 
            data-[state=active]:border-2 data-[state=active]:text-[#284b6c] data-[state=active]:font-semibold 
            text-[#4a4c56] text-sm sm:text-base border border-[#ede9df] bg-[#fcfbfa] 
            hover:text-gray-900 py-4 sm:py-6 flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4"
        >
          <Image src={analyticsImg} alt="analytics img" className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="truncate">Authorized Viewer</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="operational" 
          className="w-full sm:w-1/3 data-[state=active]:border-[#427cb2] data-[state=active]:bg-[#edf3f9] 
            data-[state=active]:border-2 data-[state=active]:text-[#284b6c] data-[state=active]:font-semibold 
            text-[#4a4c56] text-sm sm:text-base border border-[#ede9df] bg-[#fcfbfa] 
            hover:text-gray-900 py-4 sm:py-6 flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4"
        >
          <Image src={viewerImg} alt="viewer img" className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="truncate">Operational</span>
        </TabsTrigger>
      </TabsList>
      
      {/* Property Manager Tab Content - Responsive Form */}
      <TabsContent value="property-manager">
        <div className="space-y-4 sm:space-y-5 mt-4.5 px-2 sm:px-0">
        
        </div>
        <div className="mt-4 sm:mt-5 px-2 sm:px-0">
          <SignUpForm />
        </div>
      </TabsContent>

      {/* Authorized Viewer Tab Content - Responsive Card */}
      <TabsContent value="authorized-viewer">
      <SignUpForm/>
      </TabsContent>

      {/* Operational Tab Content - Responsive Card */}
      <TabsContent value="operational">
        <SignUpForm/>
      </TabsContent>
    </Tabs>
  )
}