import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {rql} from "javascript-rql";

let $axios: AxiosInstance

export function getAuthHeader(): { Authorization: string } | {} {
	const accessToken = localStorage.getItem("access-token")
	if (!accessToken)
		return {}
	return {"Authorization": "Bearer " + accessToken};
}

export function getAxiosConfig(baseUrl: string): AxiosRequestConfig {
	return {
		baseURL: baseUrl,
		timeout: 60000,
		maxRedirects: 10,
		paramsSerializer: rql,
	}
}

export function requestInterceptor(config: AxiosRequestConfig) {
	config.headers = {...config.headers, ...getAuthHeader()}
	return config
}

export function initializeAxiosInstance(baseUrl: string, config?: AxiosRequestConfig) {
	$axios = axios.create({...getAxiosConfig(baseUrl), ...config})
	$axios.interceptors.request.use(requestInterceptor);
	return $axios
}

export {$axios}