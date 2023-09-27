const CONFIG = {
    SERVER_IP: process.env.REACT_APP_SERVER_URL,
    HTTP: {
      GET: "GET",
      POST: "POST",
      PUT: "PUT",
      DELETE: "DELETE",
    },
    API: {
      URL: `http://${process.env.REACT_APP_SERVER_URL}`,
      PORT: process.env.REACT_APP_API_PORT,
      VERSION: process.env.REACT_APP_API_VERSION || "ms4m/api/tps/v1",
      LOGIN: "user/auth/login",
      MONITORING: "api/v1/monitoring/current",
      MAP: "api/v1/map",
      NORMAL_GET_SHIFTS: "api/v1/validation/shift/startDate",
      NORMAL_GET_FLEETS: "api/v1/validation/fleets/startDate",
      NORMAL_GET_EQUIPMENTS: "api/v1/validation/equipments/startDate",
      NORMAL_GET_TOTAL_EVENTS: "api/v1/validation/totalEventsUnrejected",
      PROCESS_NORMAL_EVENTS: "api/v1/validation/process",
      GET_EQUIPMENT_SSH: "api/v1/connection",
      GET_MATRIX_DATA: "api/v1/matrix/confusion",
      GET_MATRIX_HISTORY: "api/v1/matrix/history",
      EQUIPMENT: "api/v1/equipment",
      EQUIPMENT_CS: "api/v1/cs/equipment/list",
      EVENTS: "events",
      EVENTS_SEARCH_HOURS: "api/v1/events/search/hours",
      SETTINGS: "api/v1/settings",
      FLEET: {
        BASE: "api/v1/fleet",
        GET_FLEET_LIST_CS: "api/v1/cs/fleet/list",
      },
    },
  };
  
  export default CONFIG;
  