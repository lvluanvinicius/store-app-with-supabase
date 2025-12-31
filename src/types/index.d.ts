type TypeFormMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ActionsResponse<T> {
  message: string;
  status: boolean;
  type: string;
  data: T;
  errors?: {
    [key: string]: string;
  };
}
