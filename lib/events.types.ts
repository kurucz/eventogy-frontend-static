export type EventData = {
  location_name?: string; // Optional because not all events have location data
  location_address?: string; // Optional because not all events have location data
  scheduled_dates?: string[]; // Optional because it might not exist in some cases
};

export type Event = {
  id: string;
  name: string;
  slug: string;
  is_published: number;
  is_public: number;
  is_guestlist_only: number;
  created_at: string; // ISO string date
  updated_at: string; // ISO string date
  deleted_at: string | null; // Null if not deleted
  data: EventData | null; // Can be null if no additional data exists
};

export type Pagination = {
  perPage: number;
  currentPage: number;
  lastPage: number;
  total: number;
};

export type EventsResponse = {
  success: boolean;
  code: number;
  message: string;
  data: {
    events: Event[];
    pagination: Pagination;
  };
};
