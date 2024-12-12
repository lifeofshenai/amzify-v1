export interface MenuItem {
  label: string;
  icon: string;
  path: string;
}

export interface VendorStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  activeListings: number;
}