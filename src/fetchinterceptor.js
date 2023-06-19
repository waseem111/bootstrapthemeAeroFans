import axios from "axios";

const FetchInterceptor = axios.create({
  timeout: 900000,
  headers: {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS,HEAD",
    "Accept-Language": "en-US,en;q=0.5,ar-EG,ar;q=0.5",
    "Content-Type": "application/json",
    "Content-Language": "en"
  },
});

// Config
const TOKEN_PAYLOAD_KEY = "authorization";
const PUBLIC_REQUEST_KEY = "public-request";

// API Request interceptor
FetchInterceptor.interceptors.request.use(
  (config) => {
    if (!config.url) {
      return config;
    }
    const currentUrl = new URL(config.url, config.baseURL);
    // parse pathName to implement variables
    Object.entries(config.urlParams || {}).forEach(([k, v]) => {
      currentUrl.pathname = currentUrl.pathname.replace(
        `:${k}`,
        encodeURIComponent(v)
      );
    });

    // const jwtToken = localStorage.getItem("auth_token");

    // if (jwtToken) {
    //   config.headers[TOKEN_PAYLOAD_KEY] = "Bearer " + jwtToken;
    // }

    return {
      ...config,
      baseURL: `${currentUrl.protocol}//${currentUrl.host}`,
      url: currentUrl.pathname,
    };
  },
  (error) => {
    Promise.reject(error);
  }
);

// API respone interceptor
FetchInterceptor.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data); 
  },
  (error) => {
    let responseObj = {
        "is_success" : false,
        "message" : "",
        "description" : ""
    };

    if (error.response.status === 401) {
      window.location.replace("/unauthorize");
    }
    else if (error.response.status === 403) {
      responseObj.message = "Unauthorized access";
      responseObj.description = "Please login again";
    }
    else if (error.response.status === 404) {
      responseObj.message = "Not Found";
    }
    else if (error.response.status === 500) {
      responseObj.message = "Internal Server Error";
    }
    else if (error.response.status === 508) {
      responseObj.message = "Time Out";
    }
    else
    {
      responseObj.message = "Something went wrong, please try again...!";
    }
    
    return Promise.reject(responseObj);
  }
);

export default FetchInterceptor;
