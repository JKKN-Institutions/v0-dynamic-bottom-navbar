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
  MoreHorizontal,
  Bell,
  MessageCircle,
  Map,
  Calendar,
  BookOpen,
  Video,
  Music,
  Camera,
  Briefcase,
  Zap,
  Gift,
  Trophy,
  ChevronDown,
  X,
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
      { id: "wishlist", label: "Wishlist", icon: Heart },
      { id: "rewards", label: "Rewards", icon: Gift },
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

const moreNavigation: NavItem[] = [
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    subItems: [
      { id: "all-notifs", label: "All", icon: Bell },
      { id: "unread", label: "Unread", icon: Sparkles },
      { id: "mentions", label: "Mentions", icon: MessageCircle },
      { id: "settings-notif", label: "Settings", icon: Settings },
    ],
  },
  {
    id: "messages",
    label: "Messages",
    icon: MessageCircle,
    subItems: [
      { id: "inbox", label: "Inbox", icon: MessageCircle },
      { id: "sent", label: "Sent", icon: TrendingUp },
      { id: "archived", label: "Archived", icon: Package },
      { id: "groups", label: "Groups", icon: Grid },
    ],
  },
  {
    id: "media",
    label: "Media",
    icon: Video,
    subItems: [
      { id: "videos", label: "Videos", icon: Video },
      { id: "music", label: "Music", icon: Music },
      { id: "photos", label: "Photos", icon: Camera },
      { id: "live", label: "Live", icon: Zap },
      { id: "gallery", label: "Gallery", icon: Grid },
      { id: "albums", label: "Albums", icon: BookOpen },
    ],
  },
  {
    id: "events",
    label: "Events",
    icon: Calendar,
    subItems: [
      { id: "upcoming", label: "Upcoming", icon: Calendar },
      { id: "past", label: "Past", icon: BookOpen },
      { id: "my-events", label: "My Events", icon: Star },
      { id: "saved-events", label: "Saved", icon: Heart },
    ],
  },
  {
    id: "places",
    label: "Places",
    icon: Map,
    subItems: [
      { id: "nearby", label: "Nearby", icon: Map },
      { id: "saved-places", label: "Saved", icon: Heart },
      { id: "visited", label: "Visited", icon: Trophy },
      { id: "explore", label: "Explore", icon: Sparkles },
    ],
  },
  {
    id: "work",
    label: "Work",
    icon: Briefcase,
    subItems: [
      { id: "projects", label: "Projects", icon: Briefcase },
      { id: "tasks", label: "Tasks", icon: List },
      { id: "team", label: "Team", icon: Grid },
      { id: "calendar-work", label: "Calendar", icon: Calendar },
      { id: "files", label: "Files", icon: BookOpen },
      { id: "meetings", label: "Meetings", icon: Video },
    ],
  },
]

export function DynamicBottomNav() {
  const [activeMainNav, setActiveMainNav] = useState<string | null>(null)
  const [activeSubNav, setActiveSubNav] = useState<string | null>(null)
  const [showSubNav, setShowSubNav] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [selectedSubItem, setSelectedSubItem] = useState<SubNavItem | null>(null)

  const currentNavItem =
    mainNavigation.find((item) => item.id === activeMainNav) || moreNavigation.find((item) => item.id === activeMainNav)

  const handleMainNavClick = (navId: string) => {
    if (activeMainNav === navId) {
      setShowSubNav(false)
      setTimeout(() => {
        setActiveMainNav(null)
        setActiveSubNav(null)
      }, 200)
    } else {
      setActiveMainNav(navId)
      setActiveSubNav(null)
      setShowSubNav(true)
      setShowMore(false)
    }
  }

  const handleMoreClick = () => {
    if (showMore) {
      setShowMore(false)
    } else {
      setShowMore(true)
      setShowSubNav(false)
      setActiveMainNav(null)
      setActiveSubNav(null)
    }
  }

  const handleSubNavClick = (subItem: SubNavItem) => {
    setActiveSubNav(subItem.id)
    setSelectedSubItem(subItem)
    setIsMinimized(true)
  }

  const handleCloseMinimized = () => {
    setIsMinimized(false)
    setSelectedSubItem(null)
  }

  return (
    <>
      <div className="h-20 md:hidden" />

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80 backdrop-blur-2xl border-t border-border/50 shadow-2xl" />

        {/* Navigation Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {isMinimized && selectedSubItem && currentNavItem ? (
              <motion.div
                key="minimized"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className="px-4 py-3"
              >
                <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 rounded-2xl px-4 py-3 border border-primary/20 shadow-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="p-2.5 rounded-xl bg-primary/20 shadow-sm"
                    >
                      <selectedSubItem.icon className="w-5 h-5 text-primary" strokeWidth={2.5} />
                    </motion.div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-muted-foreground font-medium">{currentNavItem.label}</span>
                      <span className="text-sm font-bold text-foreground">{selectedSubItem.label}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCloseMinimized}
                    className="p-2 rounded-xl bg-muted/80 hover:bg-muted transition-colors shadow-sm"
                  >
                    <X className="w-5 h-5 text-foreground" strokeWidth={2.5} />
                  </motion.button>
                </div>
              </motion.div>
            ) : showMore ? (
              <motion.div
                key="more"
                initial={{ y: 100, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 100, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="px-3 py-4 max-h-[65vh] overflow-y-auto scrollbar-hide"
              >
                <div className="flex items-center justify-between mb-4 px-3 sticky top-0 bg-gradient-to-b from-background via-background to-background/80 backdrop-blur-xl pb-3 z-10">
                  <div className="flex items-center gap-2">
                    <motion.div animate={{ rotate: [0, 180, 360] }} transition={{ duration: 0.6, ease: "easeInOut" }}>
                      <Grid className="w-5 h-5 text-primary" />
                    </motion.div>
                    <span className="text-base font-semibold text-foreground">More Options</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleMoreClick}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted text-xs font-medium text-foreground transition-colors"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                    Close
                  </motion.button>
                </div>

                <div className="grid grid-cols-3 gap-3 px-2 pb-2">
                  {moreNavigation.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ scale: 0, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 25,
                        delay: index * 0.05,
                      }}
                      onClick={() => handleMainNavClick(item.id)}
                      className="flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-gradient-to-br from-muted/80 to-muted/40 hover:from-primary/10 hover:to-primary/5 active:scale-95 transition-all shadow-sm hover:shadow-md border border-border/50"
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -12, 12, -12, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                      >
                        <div className="p-2.5 rounded-xl bg-background/80 shadow-sm">
                          <item.icon className="w-6 h-6 text-primary" strokeWidth={2.5} />
                        </div>
                      </motion.div>
                      <span className="text-xs font-semibold text-foreground text-center leading-tight">
                        {item.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : showSubNav && currentNavItem?.subItems ? (
              <motion.div
                key="subnav"
                initial={{ y: 100, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 100, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="px-3 py-4 max-h-[65vh] overflow-y-auto scrollbar-hide"
              >
                <div className="flex items-center justify-between mb-4 px-3 sticky top-0 bg-gradient-to-b from-background via-background to-background/80 backdrop-blur-xl pb-3 z-10">
                  <div className="flex items-center gap-2.5">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      className="p-2 rounded-xl bg-primary/10"
                    >
                      {currentNavItem.icon && (
                        <currentNavItem.icon className="w-5 h-5 text-primary" strokeWidth={2.5} />
                      )}
                    </motion.div>
                    <span className="text-base font-semibold text-foreground">{currentNavItem.label}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMainNavClick(currentNavItem.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted text-xs font-medium text-foreground transition-colors"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                    Close
                  </motion.button>
                </div>

                <div className="grid grid-cols-3 gap-3 px-2 pb-2">
                  {currentNavItem.subItems.map((subItem, index) => (
                    <motion.button
                      key={subItem.id}
                      initial={{ scale: 0, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 25,
                        delay: index * 0.06,
                      }}
                      onClick={() => handleSubNavClick(subItem)}
                      className={cn(
                        "flex flex-col items-center gap-2.5 p-4 rounded-2xl transition-all duration-200 border",
                        "active:scale-95 shadow-sm hover:shadow-md",
                        activeSubNav === subItem.id
                          ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-primary shadow-lg shadow-primary/20"
                          : "bg-gradient-to-br from-muted/80 to-muted/40 hover:from-accent/50 hover:to-accent/30 text-foreground border-border/50",
                      )}
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -12, 12, -12, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                      >
                        <div
                          className={cn(
                            "p-2 rounded-xl shadow-sm transition-colors",
                            activeSubNav === subItem.id ? "bg-primary-foreground/20" : "bg-background/80",
                          )}
                        >
                          <subItem.icon
                            className={cn(
                              "w-5 h-5",
                              activeSubNav === subItem.id ? "text-primary-foreground" : "text-primary",
                            )}
                            strokeWidth={2.5}
                          />
                        </div>
                      </motion.div>
                      <span className="text-xs font-semibold text-center leading-tight">{subItem.label}</span>

                      {activeSubNav === subItem.id && (
                        <motion.div
                          layoutId="activeSubDot"
                          className="w-1.5 h-1.5 rounded-full bg-primary-foreground shadow-lg"
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
              <motion.div
                key="mainnav"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="px-2 py-4"
              >
                <div className="flex items-center justify-between gap-1 max-w-md mx-auto">
                  {mainNavigation.map((item, index) => {
                    const isActive = activeMainNav === item.id
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ scale: 0, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 25,
                          delay: index * 0.06,
                        }}
                        onClick={() => handleMainNavClick(item.id)}
                        className={cn(
                          "relative flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-2xl transition-all duration-300",
                          "hover:bg-accent/50 active:scale-95 flex-1 min-w-0",
                          isActive && "bg-primary/15 shadow-md",
                        )}
                      >
                        <motion.div
                          animate={{
                            scale: isActive ? [1, 1.15, 1] : 1,
                            rotate: isActive ? [0, -8, 8, 0] : 0,
                          }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="relative"
                        >
                          <motion.div
                            className={cn(
                              "p-2 rounded-xl transition-all duration-300",
                              isActive ? "bg-primary/20 shadow-sm" : "bg-transparent",
                            )}
                            whileHover={{ scale: 1.05 }}
                          >
                            <item.icon
                              className={cn(
                                "w-6 h-6 transition-colors duration-300",
                                isActive ? "text-primary" : "text-muted-foreground",
                              )}
                              strokeWidth={isActive ? 2.5 : 2}
                            />
                          </motion.div>

                          {item.id === "shop" && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: [0, 1.2, 1] }}
                              transition={{ delay: 0.5 }}
                              className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-destructive to-destructive/80 rounded-full border-2 border-background flex items-center justify-center shadow-lg"
                            >
                              <span className="text-[8px] font-bold text-destructive-foreground">3</span>
                            </motion.div>
                          )}
                        </motion.div>

                        <span
                          className={cn(
                            "text-[11px] font-semibold transition-colors duration-300 truncate w-full text-center",
                            isActive ? "text-primary" : "text-muted-foreground",
                          )}
                        >
                          {item.label}
                        </span>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute -bottom-1 left-1/2 w-10 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full shadow-lg shadow-primary/30"
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

                  <motion.button
                    initial={{ scale: 0, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 25,
                      delay: mainNavigation.length * 0.06,
                    }}
                    onClick={handleMoreClick}
                    className={cn(
                      "relative flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-2xl transition-all duration-300",
                      "hover:bg-accent/50 active:scale-95 flex-1 min-w-0",
                      showMore && "bg-primary/15 shadow-md",
                    )}
                  >
                    <motion.div
                      animate={{
                        scale: showMore ? [1, 1.15, 1] : 1,
                        rotate: showMore ? 90 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <motion.div
                        className={cn(
                          "p-2 rounded-xl transition-all duration-300",
                          showMore ? "bg-primary/20 shadow-sm" : "bg-transparent",
                        )}
                        whileHover={{ scale: 1.05 }}
                      >
                        <MoreHorizontal
                          className={cn(
                            "w-6 h-6 transition-colors duration-300",
                            showMore ? "text-primary" : "text-muted-foreground",
                          )}
                          strokeWidth={showMore ? 2.5 : 2}
                        />
                      </motion.div>
                    </motion.div>

                    <span
                      className={cn(
                        "text-[11px] font-semibold transition-colors duration-300 truncate w-full text-center",
                        showMore ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      More
                    </span>

                    <AnimatePresence>
                      {showMore && (
                        <motion.div
                          className="absolute -bottom-1 left-1/2 w-10 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full shadow-lg shadow-primary/30"
                          initial={{ opacity: 0, scale: 0.5, x: "-50%" }}
                          animate={{ opacity: 1, scale: 1, x: "-50%" }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
