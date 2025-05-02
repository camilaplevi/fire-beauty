<script lang="ts">
import { defineComponent, ref, onMounted, computed, onBeforeUnmount } from 'vue';

interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  featured_media: number;
  media_url?: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

interface WordPressPostResponse {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

export default defineComponent({
  name: 'BlogPage',
  setup() {
    const news = ref('news');
    const posts = ref<BlogPost[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);
    const slide = ref(0);
    const currentImageIndex = ref(0);
    const layoutDirection = ref<'row' | 'column'>('row');
    const columnsLayout = ref<'row' | 'column'>('row');
    const isMobile = ref(false);

    const checkMobile = () => {
      isMobile.value = window.innerWidth < 768;
    };

    const currentFeaturedPost = computed(() => {
      if (posts.value.length > 7 + currentImageIndex.value) {
        return posts.value[7 + currentImageIndex.value];
      }
      return null;
    });

    const formatDate = (dateString: string): string => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    const fetchWordPressPosts = async (): Promise<BlogPost[]> => {
      try {
        const response = await fetch('http://firebeautyblog.local/wp-json/wp/v2/posts?_embed');
        if (!response.ok) {
          throw new Error('Erro ao buscar posts');
        }
        const data: WordPressPostResponse[] = await response.json();

        return data.map((post: WordPressPostResponse) => ({
          ...post,
          media_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
        }));
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
        throw error;
      }
    };

    const fetchPosts = async (): Promise<void> => {
      try {
        loading.value = true;
        error.value = null;
        const data = await fetchWordPressPosts();

        posts.value = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } catch (err) {
        error.value = 'Erro ao carregar posts';
        console.error('Erro:', err);
      } finally {
        loading.value = false;
      }
    };

    const getPostSafe = (index: number) => {
      return posts.value.length > index ? posts.value[index] : null;
    };

    const getPostsForColumn = (startIndex: number, count: number) => {
      return posts.value.slice(startIndex, startIndex + count);
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        layoutDirection.value = 'column';
        columnsLayout.value = 'column';
      } else {
        layoutDirection.value = 'row';
        columnsLayout.value = 'row';
      }
    };

    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkMobile);
    });

    onMounted(() => {
      handleResize();
      checkMobile();
      window.addEventListener('resize', handleResize);
      void fetchPosts();
    });

    return {
      news,
      posts,
      loading,
      error,
      slide,
      currentImageIndex,
      formatDate,
      getPostSafe,
      getPostsForColumn,
      currentFeaturedPost,
      layoutDirection,
      columnsLayout,
      checkMobile,
      isMobile,
    };
  },
});
</script>

<template>
  <q-page class="page-container">
    <div class="main-content">
      <div class="section-news" :style="{ flexDirection: layoutDirection }">
        <div class="news-column">
          <div class="news-headers-container">
            <div v-for="n in 3" :key="n" class="news-header">
              <p class="news-text">{{ news.toUpperCase() }}</p>
            </div>
          </div>
        </div>

        <div class="posts-container">
          <div v-if="loading" class="loading-container">
            <div v-for="n in 3" :key="n" class="post-card loading">
              <div class="horizontal-loading">
                <q-skeleton height="150px" width="120px" />
                <div class="loading-content">
                  <q-skeleton type="text" width="100%" />
                  <q-skeleton type="text" width="80%" />
                  <q-skeleton type="text" width="60%" />
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="error" class="error-message">Erro ao carregar posts: {{ error }}</div>
          <div v-else class="posts-grid">
            <div v-for="post in posts.slice(0, 3)" :key="post.id" class="post-card">
              <div class="post-wrapper">
                <div class="image">
                  <img
                    v-if="post.media_url"
                    :src="post.media_url"
                    :alt="post.title.rendered"
                    class="post-image"
                  />
                </div>
                <div class="post-content">
                  <div>
                    <h2 class="post-title" v-html="post.title.rendered"></h2>
                    <div class="post-excerpt" v-html="post.excerpt.rendered"></div>
                  </div>
                  <div class="post-date">{{ formatDate(post.date) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="carousel-section">
        <q-carousel
          v-model="slide"
          animated
          infinite
          class="custom-carousel"
          :arrows="false"
          :navigation="true"
        >
          <q-carousel-slide
            v-for="(post, index) in posts.slice(3, 6)"
            :key="post.id"
            :name="index"
            class="carousel-slide"
          >
            <div class="carousel-item">
              <img
                v-if="post.media_url"
                :src="post.media_url"
                :alt="post.title.rendered"
                class="carousel-image"
              />
              <div class="carousel-overlay"></div>
              <div class="carousel-content">
                <h2 class="carousel-title" v-html="post.title.rendered"></h2>
                <div class="carousel-excerpt" v-html="post.excerpt.rendered"></div>
              </div>
            </div>
          </q-carousel-slide>

          <template v-slot:control>
            <q-carousel-control position="left" class="carousel-arrow left-arrow">
              <q-btn
                flat
                round
                dense
                icon="chevron_left"
                @click="slide = (slide - 1 + 3) % 3"
                class="arrow-btn"
              />
            </q-carousel-control>
            <q-carousel-control position="right" class="carousel-arrow right-arrow">
              <q-btn
                flat
                round
                dense
                icon="chevron_right"
                @click="slide = (slide + 1) % 3"
                class="arrow-btn"
              />
            </q-carousel-control>
          </template>
        </q-carousel>
      </div>

      <!-- Seção Mista (Texto + Carrossel) -->
      <div class="mixed-section">
        <div class="mixed-container" :style="{ flexDirection: layoutDirection }">
          <div class="mixed-content">
            <div class="text-content" v-if="!loading && currentFeaturedPost && !isMobile">
              <h3 class="mixed-post-title" v-html="currentFeaturedPost.title.rendered"></h3>
              <div class="mixed-post-excerpt" v-html="currentFeaturedPost.excerpt.rendered"></div>
            </div>
          </div>

          <div class="image-carousel-wrapper">
            <q-carousel
              v-model="currentImageIndex"
              animated
              infinite
              class="image-carousel"
              arrows
              :navigation="true"
              height="auto"
            >
              <q-carousel-slide
                v-for="(post, index) in posts.slice(7, 10)"
                :key="post.id"
                :name="index"
                class="image-slide"
                style="padding: 0"
              >
                <img
                  v-if="post.media_url"
                  :src="post.media_url"
                  :alt="post.title.rendered"
                  class="carousel-image-only"
                />
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>
      </div>

      <!-- Seção de Colunas -->
      <div class="columns-section">
        <div class="columns-container" :style="{ flexDirection: columnsLayout }">
          <!-- Coluna esquerda -->
          <div class="second-column">
            <div v-for="post in getPostsForColumn(0, 2)" :key="post.id" class="vertical-post">
              <img
                v-if="post.media_url"
                :src="post.media_url"
                :alt="post.title.rendered"
                class="post-image-vertical"
              />
              <div class="post-content-vertical">
                <h3 class="post-title-vertical" v-html="post.title.rendered"></h3>
                <div class="post-excerpt-vertical" v-html="post.excerpt.rendered"></div>
              </div>
            </div>
          </div>

          <!-- Coluna direita -->
          <div class="first-column">
            <div v-for="post in getPostsForColumn(2, 3)" :key="post.id" class="horizontal-post">
              <img
                v-if="post.media_url"
                :src="post.media_url"
                :alt="post.title.rendered"
                class="post-image-horizontal"
              />
              <div class="post-content-horizontal">
                <h3 class="post-title-horizontal" v-html="post.title.rendered"></h3>
                <div class="post-excerpt-horizontal" v-html="post.excerpt.rendered"></div>
                <div class="post-date-horizontal">{{ formatDate(post.date) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.page-container {
  display: flex;
  justify-content: center;
  width: 100%;
  background: #f9f9f9;
}

.main-content {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.section-news {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-top: 58px;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 30px;
    margin-bottom: 40px;
  }
}

.news-column {
  .news-headers-container {
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      flex-direction: row;
      justify-content: center;
      width: 100%;
      margin-bottom: 20px;
    }
  }

  .news-header {
    .news-text {
      font-family: 'IvyMode';
      font-size: 49.991px;
      font-style: italic;
      font-weight: 250;
      line-height: 54.259px;
      text-transform: uppercase;
      margin: 0;
      color: $middle-grey;

      @media (max-width: 1024px) {
        font-size: 40px;
        line-height: 44px;
      }

      @media (max-width: 768px) {
        font-size: 24px;
        line-height: 28px;
        white-space: nowrap;
      }
    }
  }
}

.posts-container {
  display: flex;
  gap: 20px;
  height: auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.loading-container {
  display: flex;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.posts-grid {
  display: flex;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
}

.post-card {
  min-width: 300px;
  flex: 1;
  display: flex;

  .post-wrapper {
    display: flex;
    align-items: flex-end;
    width: 100%;

    @media (max-width: 768px) {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  .image {
    height: 150px;
    display: flex;
    align-items: flex-end;

    .post-image {
      object-fit: cover;
      width: 190px;
      height: 158px;

      @media (max-width: 768px) {
        width: 161px;
        height: 158px;
        max-height: 200px;
      }
    }
  }

  .post-content {
    margin-left: 17px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 768px) {
      margin-left: 0;
      margin-left: 7px;
      height: auto;
    }

    .post-title {
      font-family: Poppins;
      font-size: 13px;
      font-weight: 400;
      line-height: 15px;
      margin: 0;
      text-transform: uppercase;
      color: $title-post;
    }

    .post-excerpt {
      font-family: Poppins;
      font-size: 13px;
      font-weight: 700;
      line-height: 15px;
      margin-top: 7px;
      color: $button-dark;

      :deep(p) {
        margin: 0;
      }
    }

    .post-date {
      font-family: Poppins;
      font-size: 10px;
      font-weight: 400;
      text-transform: uppercase;
      color: $very-ligth-grey;
    }
  }
}

.carousel-section {
  max-width: 1300px;
  margin: 80px auto 0;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    margin: 40px auto 0;
  }
}

.custom-carousel {
  border-radius: 8px;
  overflow: hidden;
  max-width: 1300px;
  margin: 0 auto;
  height: auto !important;

  &:hover {
    .carousel-arrow {
      opacity: 1;
    }
  }
}

.carousel-slide {
  padding: 0;
}

.carousel-item {
  position: relative;
  width: 100%;
  height: 100%;

  .carousel-image {
    width: 100%;
    height: 669px;
    object-fit: cover;

    @media (max-width: 1024px) {
      height: 500px;
    }

    @media (max-width: 768px) {
      height: 350px;
    }
  }

  .carousel-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      transparent 100%
    );
  }

  .carousel-content {
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
    color: white;
    z-index: 2;
    text-align: center;
    padding: 0px 40px 16px;

    @media (max-width: 768px) {
      bottom: 20px;
      padding: 0 20px;
    }

    .carousel-title {
      font-family: 'Poppins';
      font-size: 46.386px;
      font-weight: 700;
      margin-bottom: 15px;
      text-transform: none;
      margin: 0;

      @media (max-width: 1024px) {
        font-size: 36px;
      }

      @media (max-width: 768px) {
        font-size: 28px;
      }
    }

    .carousel-excerpt {
      text-align: center;
      font-family: Poppins;
      font-size: 29.326px;
      font-style: normal;
      font-weight: 400;
      line-height: 31.829px;
      margin: 0 20%;

      @media (max-width: 1024px) {
        font-size: 22px;
        line-height: 26px;
        margin: 0 10%;
      }

      @media (max-width: 768px) {
        font-size: 16px;
        line-height: 20px;
        margin: 0;
      }

      :deep(p) {
        margin: 0;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }
}

.carousel-arrow {
  opacity: 0;
  transition: opacity 0.3s ease;

  .arrow-btn {
    color: white;
    background: rgba(0, 0, 0, 0.3);
    width: 50px;
    height: 50px;
    font-size: 24px;

    &:hover {
      background: rgba(0, 0, 0, 0.5);
    }

    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
      font-size: 20px;
    }
  }
}

.left-arrow {
  left: 20px;

  @media (max-width: 768px) {
    left: 10px;
  }
}

.right-arrow {
  right: 20px;

  @media (max-width: 768px) {
    right: 10px;
  }
}

.mixed-section {
  max-width: 1300px;
  margin: 80px auto 0;

  @media (max-width: 768px) {
    margin: 0;
  }
}

.mixed-container {
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.mixed-content {
  flex: 1;

  .text-content {
    .mixed-post-title {
      font-family: Poppins;
      font-size: 92.966px;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 20px;
      margin-right: 5%;
      color: $primary-dark;

      @media (max-width: 1024px) {
        font-size: 60px;
      }

      @media (max-width: 768px) {
        font-size: 36px;
        margin-right: 0;
      }
    }

    .mixed-post-excerpt {
      font-family: Poppins;
      font-size: 23px;
      font-style: normal;
      font-weight: 400;
      line-height: 38.736px;
      margin-bottom: 20px;
      margin-right: 5%;
      color: $middle-grey;

      @media (max-width: 1024px) {
        font-size: 18px;
        line-height: 28px;
      }

      @media (max-width: 768px) {
        font-size: 16px;
        line-height: 24px;
        margin-right: 0;
      }
    }
  }
}

.image-carousel-wrapper {
  min-width: 0;
  flex: 1;

  .image-carousel {
    max-width: 600px;
    width: 100%;

    @media (max-width: 1024px) {
      max-width: 100%;
    }
  }

  .carousel-image-only {
    width: 100%;
    height: 669px;
    border-radius: 8px;
    object-fit: cover;

    @media (max-width: 1024px) {
      height: 500px;
    }

    @media (max-width: 768px) {
      height: 350px;
    }
  }
}

.columns-section {
  max-width: 1300px;
  margin: 80px auto 0;

  @media (max-width: 768px) {
    margin: 40px auto 0;
  }
}

.columns-container {
  display: flex;
  gap: 111px;

  @media (max-width: 1024px) {
    gap: 60px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
}

.second-column {
  flex: 2;

  .vertical-post {
    margin-bottom: 40px;

    @media (max-width: 768px) {
      margin-bottom: 30px;
    }

    .post-image-vertical {
      width: 100%;
      height: 495px;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 20px;

      @media (max-width: 1024px) {
        height: 400px;
      }

      @media (max-width: 768px) {
        height: 300px;
        margin: 0;
      }
    }

    .post-content-vertical {
      .post-title-vertical {
        font-family: Poppins;
        font-size: 47.344px;
        font-weight: 700;
        margin-bottom: 15px;
        margin: 0;
        color: $primary-dark;

        @media (max-width: 1024px) {
          font-size: 36px;
        }

        @media (max-width: 768px) {
          font-size: 20px;
        }
      }

      .post-excerpt-vertical {
        font-family: Poppins;
        font-size: 23px;
        line-height: 1.5;
        margin-bottom: 77px;
        margin-top: 12px;
        color: $middle-grey;

        @media (max-width: 1024px) {
          font-size: 18px;
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          font-size: 14px;
          margin-bottom: 0;
        }
      }
    }
  }
}

.first-column {
  flex: 1;

  .horizontal-post {
    display: flex;
    gap: 20px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
      margin-bottom: 30px;
    }

    .post-image-horizontal {
      width: 219px;
      height: 416px;
      object-fit: cover;
      border-radius: 4px;

      @media (max-width: 1024px) {
        width: 141.684px;
        height: 219.11px;
      }

      @media (max-width: 768px) {
        width: 141.684px;
        height: 219.11px;
      }
    }

    .post-content-horizontal {
      flex: 1;

      .post-title-horizontal {
        font-family: Poppins;
        font-size: 19.496px;
        line-height: 25px;
        font-weight: 400;
        margin-bottom: 10px;
        text-transform: uppercase;
        margin: 0;
        color: $title-post;

        @media (max-width: 768px) {
          font-size: 11px;
          line-height: 20px;
        }
      }

      .post-excerpt-horizontal {
        font-family: Poppins;
        font-size: 30.796px;
        font-weight: 700;
        line-height: 35.534px;
        margin-bottom: 10px;
        color: $primary-dark;

        @media (max-width: 1024px) {
          font-size: 16px;
          line-height: 28px;
        }

        @media (max-width: 768px) {
          font-size: 16px;
          line-height: 24px;
        }
      }

      .post-date-horizontal {
        font-family: Poppins;
        font-size: 12px;
        color: $very-ligth-grey;

        @media (max-width: 768px) {
          font-size: 5.039px;
        }
      }
    }
  }
}

.error-message {
  color: red;
  text-align: center;
  padding: 20px;
  font-family: Poppins;
}

:deep(.q-carousel__navigation) {
  bottom: 10px;
  padding: 0 40px 10px;

  @media (max-width: 768px) {
    padding: 0 20px 10px;
  }
}

:deep(.q-carousel__navigation-inner) {
  justify-content: center;
}

:deep(.q-carousel__navigation-icon) {
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
  margin: 0 4px;
}

:deep(.q-carousel__navigation-icon--active) {
  color: white;
}
</style>
