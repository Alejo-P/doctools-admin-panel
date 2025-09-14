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

        if (error.response?.data?.detail === "Usuario inactivo"){
            // Peticion POST para cerrar sesión
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`, {}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            });
            localStorage.removeItem('isAuth');
            window.location.href = '/';
            import.meta.env.VITE_ENV === ENV.DEV && console.warn('Usuario inactivo, redirigiendo a la página de inicio');
            return Promise.reject(error);
        }

        // Si ya intentamos refrescar, no lo volvemos a hacer
        if ((error.response?.data?.detail === "Token faltante" || error.response?.data?.detail === "Token inválido" || error.response?.data?.detail === "Token expirado") && !originalRequest._retry) {
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
                import.meta.env.VITE_ENV === ENV.DEV && console.error('Error al refrescar el token', refreshError);
                
                return Promise.reject(refreshError);
            }
        }

        if (error.code === 'ECONNABORTED') {
            import.meta.env.VITE_ENV === ENV.DEV && console.warn('⏱️ La solicitud se canceló por timeout.');
            // Acá también podés notificar visualmente
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;