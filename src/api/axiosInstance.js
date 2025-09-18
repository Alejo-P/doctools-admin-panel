import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 5000, // Tiempo de espera de 5 segundos
});

// Interceptor de respuesta
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Si el error es 401 y el detalle es "Usuario inactivo", cerrar sesión, o, si el detalle de la respuesta es "Token faltante", "Token inválido" o "Token expirado", y ya se ha intentado refrescar el token, cerrar sesión
        if (error.response?.data?.detail === "Usuario inactivo" || (error.response?.status === 401 && originalRequest._retry)) {
            // Peticion POST para cerrar sesión
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`, {}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            });
            localStorage.removeItem('isAuth');
            localStorage.removeItem('user');
            window.location.href = '/';
            return Promise.reject(error);
        }

        // Si ya intentamos refrescar, no lo volvemos a hacer
        if (
            (error.response?.data?.detail === "Token faltante" || error.response?.data?.detail === "Token inválido" || error.response?.data?.detail === "Token expirado") && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/refresh`, {}, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                });

                // Volver a intentar la petición
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('isAuth');
                localStorage.removeItem('user');
                window.location.href = '/';
                console.error('Error al refrescar el token', refreshError);
                
                return Promise.reject(refreshError);
            }
        }

        // Si la solicitud ya ha sido reintentada, rechazar la promesa
        return Promise.reject(error);
    }
);

export default axiosInstance;