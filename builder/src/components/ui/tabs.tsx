"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

// const Tabs = React.forwardRef<
//     React.ElementRef<typeof TabsPrimitive.Root>,
//     React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
// >(({ className, ...props }, ref) => (
//     <TabsPrimitive.Root
//         orientation="vertical"
//         ref={ref}
//         className={cn("border-3 text-muted-foreground flex gap-1 rounded-md border-white p-1", className)}
//         {...props}
//     />
// ))
// Tabs.displayName = TabsPrimitive.List.displayName

// const TabsList = React.forwardRef<
//     React.ElementRef<typeof TabsPrimitive.List>,
//     React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
// >(({ className, ...props }, ref) => (
//     <TabsPrimitive.List
//         ref={ref}
//         className={cn(
//             "bg-muted text-muted-foreground flex h-auto flex-col items-center justify-start rounded-md p-1",
//             className
//         )}
//         {...props}
//     />
// ))

// TabsList.displayName = TabsPrimitive.List.displayName

// const TabsTrigger = React.forwardRef<
//     React.ElementRef<typeof TabsPrimitive.Trigger>,
//     React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
// >(({ className, ...props }, ref) => (
//     <TabsPrimitive.Trigger
//         ref={ref}
//         className={cn(
//             "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground flex items-center justify-start whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
//             className
//         )}
//         {...props}
//     />
// ))

// TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

// const TabsContent = React.forwardRef<
//     React.ElementRef<typeof TabsPrimitive.Content>,
//     React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
// >(({ className, ...props }, ref) => (
//     <TabsPrimitive.Content
//         ref={ref}
//         className={cn(
//             "ring-offset-background focus-visible:ring-ring ml-4 mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
//             className
//         )}
//         {...props}
//     />
// ))

// TabsContent.displayName = TabsPrimitive.Content.displayName

// export { Tabs, TabsContent, TabsList, TabsTrigger }

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-12 items-center justify-center rounded-lg bg-white border border-neutral-100 px-1.5 py-1 text-black dark:bg-slate-800 dark:text-slate-400",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "lowercase inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
