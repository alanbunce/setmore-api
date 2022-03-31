export type Service = {
  key: string;
  service_name: string;
  staff_keys: string[];
  duration: number;
  buffer_duration: number;
  cost: number;
  currency: string;
  image_url?: string;
};

export type ServicesResponse = {
  response: boolean;
  msg: string;
  error: string;
  data: {
    services: Service[];
  };
};

export type ServiceCategory = {
  key: string;
  categoryName: string;
  companyId: string;
  serviceIdList: string[];
  createdDate: number;
  deleteFlag: boolean;
  isNew: string;
};

export type ServiceCategoryResponse = {
  response: boolean;
  msg: string;
  error: string;
  data: {
    service_categories: ServiceCategory[];
  };
};
