import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { LineChartIcon } from '../icons/LineChartIcon'
import { Property } from '../icons/SideBarIcons'
import SignUpForm from './SignUpForm'
import { Edit, EditDocIcon } from '../icons/Edit'

const tabs = [
  {
    lable: 'Property Manager',
    value: 'property-manager',
    icon: Property,
  },
  {
    lable: 'Authorized Viewer',
    value: 'authorized-viewer',
    icon: LineChartIcon,
  },
  {
    lable: 'Operational',
    value: 'operational',
    icon: EditDocIcon,
  },
]

export function AccountTypeTabs() {
  return (
    <Tabs defaultValue="property-manager" className="mt-4.5 w-full">
      {/* Responsive TabsList - stacks vertically on mobile, row on desktop */}
      <TabsList className="grid h-fit! w-full grid-cols-1 gap-3 md:grid-cols-3">
        {tabs.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className={cn(
              'text-foreground h-12 w-full justify-start md:h-14 md:px-3',
              'bg-[#fcfbfa] outline outline-[#ede9df]',
              'hover:text-gray-900 data-[state=active]:bg-[#edf3f9] data-[state=active]:text-[#284b6c] data-[state=active]:outline-2 data-[state=active]:outline-[#427cb2]',
            )}
          >
            <item.icon className="size-6" />
            {item.lable}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Property Manager Tab Content - Responsive Form */}
      <TabsContent value="property-manager">
        <SignUpForm />
      </TabsContent>

      {/* Authorized Viewer Tab Content - Responsive Card */}
      <TabsContent value="authorized-viewer">
        <SignUpForm />
      </TabsContent>

      {/* Operational Tab Content - Responsive Card */}
      <TabsContent value="operational">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  )
}
