// No longer used TODO: REMOVE
const config = {
    development: {
      api: {
        url: import.meta.env.VITE_APP_API_URL,
        authorization: "eyJhbGciOiJIUzI1NiJ9.IU1sX01PQVVHOFgpa1RrYmt1RjZdSmt5UkFPL1NELUs.6wuklfS6qogS2a4x9p5e_c17bqfMaGVNa-x5GxtQVJ4"
      },
    },
    production: {
      api: {
        url: import.meta.env.VITE_APP_API_URL,
        authorization: import.meta.env.VITE_APP_API_AUTH,
      },
    },
  };
  
  export default config[import.meta.env.VITE_APP_ENV];
  