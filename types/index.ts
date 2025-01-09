export type User = {
    email?: string;
    token?: string | null | undefined;
    name?: string;
    role?: string;
    phoneNumber: string;
    avatar?: {
      public_id: string;
      url: string;
    };
    isBlocked?: boolean;
  };
  