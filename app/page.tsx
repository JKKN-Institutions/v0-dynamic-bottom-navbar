"use client"

import { DynamicBottomNav } from "@/components/dynamic-bottom-nav"

export default function Page() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Demo Content */}
      <div className="px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">Dynamic Bottom Nav</h1>
        <p className="text-muted-foreground mb-8">Tap any nav item to see contextual sub-navigation appear</p>

        {/* Example sections */}
        <div className="space-y-8">
          <section id="home" className="min-h-[60vh]">
            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-2xl font-semibold mb-3">Home Section</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome! Select "Home" in the bottom nav to see featured, trending, and new sub-items.
              </p>
            </div>
          </section>

          <section id="shop" className="min-h-[60vh]">
            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-2xl font-semibold mb-3">Shop Section</h2>
              <p className="text-muted-foreground leading-relaxed">
                Browse products with contextual filters for categories, deals, and orders.
              </p>
            </div>
          </section>

          <section id="search" className="min-h-[60vh]">
            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-2xl font-semibold mb-3">Search Section</h2>
              <p className="text-muted-foreground leading-relaxed">
                Find anything with smart filters and saved searches.
              </p>
            </div>
          </section>

          <section id="profile" className="min-h-[60vh]">
            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-2xl font-semibold mb-3">Profile Section</h2>
              <p className="text-muted-foreground leading-relaxed">
                Manage your account with quick access to favorites, settings, and orders.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Dynamic Bottom Navigation */}
      <DynamicBottomNav />
    </div>
  )
}
