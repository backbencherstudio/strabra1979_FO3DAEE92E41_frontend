'use client'

import { LinkIcon } from '@/components/icons/LinkIcon'
import { ShareIcon } from '@/components/icons/ShareIcon'
import { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import { Popover, PopoverContent, PopoverHeader, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EllipsisVerticalIcon } from 'lucide-react'
import { useState } from 'react'

type PropertyViewAccess = 'authorized-viewer' | 'only-me'

export default function PropertySharePopover() {
  const [viewAccess, setViewAccess] = useState<PropertyViewAccess>('only-me')
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <ShareIcon />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="text-foreground w-full min-w-150" align="end">
        <PopoverHeader className="flex flex-1 flex-col">
          <SectionTitle className="text-foreground md:text-2xl">Sunset Office Complex</SectionTitle>
        </PopoverHeader>

        <hr className="border-gray-black-50 my-4" />

        <div className="space-y-3">
          <section className="flex items-center justify-between">
            <span className="text-base font-medium">Share the dashboard</span>
            <Button size="default" className="text-[#4988C4]" variant="link">
              <LinkIcon />
              Copy Link
            </Button>
          </section>

          <section className="flex gap-1">
            <InputGroup className="bg-normal-25 h-11">
              <InputGroupInput placeholder="Add an email address or name" />
            </InputGroup>
            <Button size="lg" className="px-4" variant="muted">
              Invite
            </Button>
          </section>

          <section className="pt-3">
            <section className="flex items-center justify-between">
              <span className="text-base font-medium">Who has view access</span>
              <Select
                value={viewAccess}
                onValueChange={(v) => setViewAccess(v as PropertyViewAccess)}
              >
                <SelectTrigger size="sm" className="bg-hover-50">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectGroup>
                    <SelectItem value="only-me">Only me</SelectItem>
                    <SelectItem value="authorized-viewer">Authorized Viewer</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </section>

            {viewAccess == 'authorized-viewer' ? (
              <section className="divide-hover-50 mt-3 divide-y">
                <PropertyAccessUserListItem />
                <PropertyAccessUserListItem />
              </section>
            ) : null}
          </section>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const PropertyAccessUserListItem = () => {
  return (
    <div className="flex justify-between py-1">
      <div>
        <h6 className="text-sm font-medium">Gustavo Xavier</h6>
        <p className="text-gray-black-300 text-xs">manhhachkt08@gmail.com</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative -right-3" variant="ghost">
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem>Remove</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
