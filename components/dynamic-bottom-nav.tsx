"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  ShoppingBag,
  Search,
  User,
  Heart,
  Package,
  CreditCard,
  Settings,
  TrendingUp,
  Star,
  Grid,
  List,
  Sparkles,
  Tag,
} from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = {
  id: string
  label: string
  icon: React.ElementType
  subItems?: SubNavItem[]
}

type SubNavItem = {
  id: string
  label: string
  icon: React.ElementType
}

const mainNavigation: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    subItems: [
      { id: "featured", label: "Featured", icon: Star },
      { id: "trending", label: "Trending", icon: TrendingUp },
      { id: "new", label: "New", icon: Sparkles },
      { id: "favorites", label: "Saved", icon: Heart },
    ],
  },
  {
    id: "shop",
    label: "Shop",
    icon: ShoppingBag,
    subItems: [
      { id: "categories", label: "Categories", icon: Grid },
      { id: "deals", label: "Deals", icon: Tag },
      { id: "orders", label: "Orders", icon: Package },
      { id: "cart", label: "Cart", icon: ShoppingBag },
    ],
  },
  {
    id: "search",
    label: "Search",
    icon: Search,
    subItems: [
      { id: "all", label: "All", icon: Grid },
      { id: "recent", label: "Recent", icon: TrendingUp },
      { id: "saved-searches", label: "Saved", icon: Heart },
      { id: "filters", label: "Filters", icon: List },
    ],
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    subItems: [
      { id: "favorites", label: "Favorites", icon: Heart },
      { id: "my-orders", label: "Orders", icon: Package },
      { id: "payment", label: "Payment", icon: CreditCard },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
]

export function DynamicBottomNav() {
  const [activeMainNav, setActiveMainNav] = useState<string | null>(null)
  const [activeSubNav, setActiveSubNav] = useState<string | null>(null)
  const [showSubNav, setShowSubNav] = useState(false)

  const currentNavItem = mainNavigation.find((item) => item.id === activeMainNav)

  const handleMainNavClick = (navId: string) => {
    if (activeMainNav === navId) {
      // Toggle off if clicking the same item
      setShowSubNav(false)
      setTimeout(() => {
        setActiveMainNav(null)
        setActiveSubNav(null)
      }, 200)
    } else {
      // Switch to new nav item
      setActiveMainNav(navId)
      setActiveSubNav(null)
      setShowSubNav(true)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-t border-border" />

      {/* Navigation Container */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {showSubNav && currentNavItem?.subItems ? (
            // Sub Navigation View
            <motion.div
              key="subnav"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="px-4 py-3"
            >
              {/* Active page indicator */}
              <div className="flex items-center gap-2 mb-3 px-2">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {currentNavItem.icon && <currentNavItem.icon className="w-4 h-4 text-primary" />}
                </motion.div>
                <span className="text-sm font-medium text-foreground">{currentNavItem.label}</span>
                <motion.div
                  className="ml-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <button
                    onClick={() => handleMainNavClick(currentNavItem.id)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              </div>

              {/* Sub navigation items */}
              <div className="grid grid-cols-4 gap-2">
                {currentNavItem.subItems.map((subItem, index) => (
                  <motion.button
                    key={subItem.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      delay: index * 0.05,
                    }}
                    onClick={() => setActiveSubNav(subItem.id)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200",
                      "hover:bg-accent/50 active:scale-95",
                      activeSubNav === subItem.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted/50 text-foreground",
                    )}
                  >
                    <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.4 }}>
                      <subItem.icon className="w-5 h-5" />
                    </motion.div>
                    <span className="text-xs font-medium">{subItem.label}</span>

                    {/* Active indicator dot */}
                    {activeSubNav === subItem.id && (
                      <motion.div
                        layoutId="activeSubDot"
                        className="w-1 h-1 rounded-full bg-primary-foreground"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            // Main Navigation View
            <motion.div
              key="mainnav"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="px-4 py-3"
            >
              <div className="flex items-center justify-around gap-2">
                {mainNavigation.map((item, index) => {
                  const isActive = activeMainNav === item.id
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        delay: index * 0.05,
                      }}
                      onClick={() => handleMainNavClick(item.id)}
                      className={cn(
                        "relative flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-300",
                        "hover:bg-accent/50 active:scale-95",
                        "min-w-[70px]",
                        isActive && "bg-primary/10",
                      )}
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? [1, 1.2, 1] : 1,
                          rotate: isActive ? [0, -5, 5, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                      >
                        <item.icon
                          className={cn(
                            "w-6 h-6 transition-colors duration-300",
                            isActive ? "text-primary" : "text-muted-foreground",
                          )}
                        />

                        {/* Notification badge example */}
                        {item.id === "shop" && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full border-2 border-background"
                          />
                        )}
                      </motion.div>

                      <span
                        className={cn(
                          "text-xs font-medium transition-colors duration-300",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {item.label}
                      </span>

                      {/* Active indicator line */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute -bottom-1 left-1/2 w-8 h-1 bg-primary rounded-full"
                            initial={{ opacity: 0, scale: 0.5, x: "-50%" }}
                            animate={{ opacity: 1, scale: 1, x: "-50%" }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
