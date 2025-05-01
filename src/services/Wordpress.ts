// src/services/wordpress.js
import axios from 'axios';

// URL temporária para desenvolvimento local
const LOCAL_WP_URL = 'http://localhost/firebeauty-blog/wp-json';

const wpApi = axios.create({
  baseURL: process.env.VUE_APP_WP_API_URL || LOCAL_WP_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Interceptor para JWT
wpApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('wp_jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  async getPosts(params = {}) {
    try {
      const response = await wpApi.get('/wp/v2/posts', {
        params: {
          _embed: true,
          ...params,
        },
      });
      return {
        posts: response.data,
        headers: response.headers,
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  // Outros métodos...
};
