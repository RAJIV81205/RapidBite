import React from 'react';

// Product Card Skeleton
export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-[0_3px_15px_rgba(0,0,0,0.07)] flex-shrink-0 w-[180px] border-2 border-gray-200 animate-pulse">
    <div className="h-32 bg-gray-200" />
    <div className="p-3">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-6 bg-gray-200 rounded w-16" />
      </div>
    </div>
  </div>
);

// Category Card Skeleton
export const CategoryCardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-[0_3px_15px_rgba(0,0,0,0.07)] cursor-pointer border-2 border-gray-200 animate-pulse">
    <div className="h-32 bg-gray-200" />
    <div className="p-4 text-center">
      <div className="h-8 w-8 bg-gray-200 rounded-full mx-auto mb-2" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
    </div>
  </div>
);

// Banner Skeleton
export const BannerSkeleton = () => (
  <div className="relative h-[300px] sm:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-200 animate-pulse">
    <div className="relative h-full flex items-center p-6 sm:p-12">
      <div className="w-full sm:w-1/2 space-y-4 sm:space-y-6">
        <div className="h-12 bg-gray-300 rounded w-3/4" />
        <div className="h-6 bg-gray-300 rounded w-1/2" />
        <div className="h-10 bg-gray-300 rounded w-32" />
      </div>
    </div>
  </div>
);

// Feature Card Skeleton
export const FeatureCardSkeleton = () => (
  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] text-center animate-pulse">
    <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-3" />
    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
    <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto" />
  </div>
);

// Promotional Banner Skeleton
export const PromotionalBannerSkeleton = () => (
  <div className="bg-gray-200 rounded-xl sm:rounded-2xl overflow-hidden relative h-[180px] sm:h-[220px] animate-pulse">
    <div className="p-6 sm:p-8 h-full flex flex-col justify-between">
      <div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
      </div>
      <div className="h-8 bg-gray-300 rounded w-24" />
    </div>
  </div>
);

// Order Card Skeleton
export const OrderCardSkeleton = () => (
  <div className="bg-white rounded-xl p-4 shadow-md animate-pulse">
    <div className="flex justify-between items-center mb-4">
      <div className="h-4 bg-gray-200 rounded w-24" />
      <div className="h-4 bg-gray-200 rounded w-20" />
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
    </div>
  </div>
);

// Profile Section Skeleton
export const ProfileSectionSkeleton = () => (
  <div className="bg-white rounded-xl p-6 shadow-md animate-pulse">
    <div className="flex items-center space-x-4 mb-6">
      <div className="h-16 w-16 bg-gray-200 rounded-full" />
      <div>
        <div className="h-5 bg-gray-200 rounded w-32 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-24" />
      </div>
    </div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-4 bg-gray-200 rounded w-4/6" />
    </div>
  </div>
);

// Table Row Skeleton
export const TableRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-24" />
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-16" />
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-20" />
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-24" />
    </td>
  </tr>
);

// Header Skeleton
export const HeaderSkeleton = () => (
  <div className="fixed top-0 left-0 right-0 bg-white shadow-sm w-full h-16 z-50">
    <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-2xl mx-4 sm:mx-8 hidden sm:block">
        <div className="relative">
          <div className="w-full h-12 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Location */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2">
          <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
        </div>

        {/* Search Button for Mobile */}
        <div className="sm:hidden w-9 h-9 bg-gray-200 rounded-full animate-pulse" />

        {/* Notifications */}
        <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse relative">
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-300 rounded-full animate-pulse" />
        </div>

        {/* Cart */}
        <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse relative">
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-300 rounded-full animate-pulse" />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          <div className="hidden md:block h-4 bg-gray-200 rounded w-16 animate-pulse" />
        </div>
      </div>
    </div>
  </div>
); 