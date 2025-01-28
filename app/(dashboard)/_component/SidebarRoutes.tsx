'use client'
import { BarChart, List } from 'lucide-react'
import React from 'react'
import SidebarItem from './SidebarItem'

const teacherRoutes = [
    {
      icon: List,
      label: 'Courses',
      href: '/courses'
    },
    {
      icon: BarChart,
      label:"Total Section",
      href: '/section'
    }
  ]
const SidebarRoutes = () => {
  return (
    <div className='flex flex-col w-full'>
    {teacherRoutes.map((route)=> (
      <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href}/>
    ))}
  </div>
  )
}

export default SidebarRoutes
