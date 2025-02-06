import axios from "../utills/interceptor";

export const loginUser = async (data) => {
  return await axios.post("/login", data);
};
export const AddCandidate = async (data) => {
  return await axios.post("/add-candidate", data);
};
export const getAllCandidates = async (limit,page,application_state) => {
  return await axios.get(`/candidates?limit=${limit}&page=${page}&application_state=${application_state}`);
};
export const getAllPayments = async (limit,page) => {
  return await axios.get(`/payments?limit=${limit}&page=${page}`);
};

export const getCandidatesById = async (id) => {
  return await axios.get(`/candidates/${id}`);
};

export const updateCandidatesById = async (id,data) => {
  return await axios.put(`/candidates/${id}`,data);
};

export const Payment = async (data) => {
  return await axios.post(`/payments`,data);
};


export const getCandidates = async (params) => {
  return await axios.get("/candidates", { params });
};

export const getCandidateDetails = async (id) => {
  return await axios.get(`/candidates/${id}`);
};


export const updateCandidate = async (id, data) => {
  return await axios.put(`/candidates/${id}`, data);
};


export const getNotificationList = async () => {
  return await axios.get("/important-links");
}