import axios from "../utills/interceptor";

export const getPayment = async (params) => {
  return await axios.get("/payments", { params });
};

export const initiatePayment = async (id,method) => {
  return axios.get(`/payments/${id}/initiate/${method}`);
};

export const verifyPayment = async (id) => {
  return axios.get(`/payments/${id}/verify`);
};


export const getPaidPayment = async (id) => {
  return await axios.get(`/payments/paid/${id}`);
}