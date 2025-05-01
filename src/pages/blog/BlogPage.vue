<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';

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
                day: 'numeric'
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
                    media_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
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

                posts.value = data.sort((a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                );
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

        onMounted(() => {
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
            currentFeaturedPost
        };
    }
});
</script>

<template>
    <q-page style="background-color: #F9F9F9;">
        <div class="main-content">
            <div class="section-news"
                style="display: flex; align-items: center; max-width: 1300px; margin: 0 auto; gap: 20px; padding-top: 58px;">
                <div class="news-column">
                    <div v-for="n in 3" :key="n" class="news-header">
                        <p class="news-text"
                            style="font-family: 'IvyMode'; font-size: 49.991px; font-style: italic; font-weight: 250; line-height: 54.259px; text-transform: uppercase; margin: 0;">
                            {{ news.toUpperCase() }}
                        </p>
                    </div>
                </div>

                <div class="posts-container" style="display: flex; gap: 20px; height: auto;">
                    <div v-if="loading" style="display: flex; gap: 20px;">
                        <div v-for="n in 3" :key="n" class="post-card loading" style="min-width: 300px;">
                            <div class="horizontal-loading" style="display: flex; align-items: flex-end;">
                                <q-skeleton height="150px" width="120px" />
                                <div class="loading-content" style="margin-left: 17px;">
                                    <q-skeleton type="text" width="100%" />
                                    <q-skeleton type="text" width="80%" />
                                    <q-skeleton type="text" width="60%" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="error" class="error-message">
                        Erro ao carregar posts: {{ error }}
                    </div>
                    <div v-else style="display: flex; gap: 20px;">
                        <div v-for="post in posts.slice(0, 3)" :key="post.id" class="post-card"
                            style="min-width: 300px;">
                            <div style="display: flex; align-items: flex-end;">
                                <div class="image" style="height: 150px; display: flex; align-items: flex-end;">
                                    <img v-if="post.media_url" :src="post.media_url" :alt="post.title.rendered"
                                        class="post-image" style="object-fit: cover; width: 190px; height: 158px;">
                                </div>
                                <div class="post-content"
                                    style="margin-left: 17px; height: 150px; display: flex; flex-direction: column; justify-content: space-between;">
                                    <div>
                                        <h2 class="post-title" v-html="post.title.rendered"
                                            style="font-family: Poppins; font-size: 13px; font-weight: 400; line-height: 15px; margin: 0;text-transform: uppercase;">
                                        </h2>
                                        <div class="post-excerpt" v-html="post.excerpt.rendered"
                                            style="font-family: Poppins; font-size: 13px; font-weight: 700; line-height: 15px; margin-top: 7px;">
                                        </div>
                                    </div>
                                    <div class="post-date"
                                        style="font-family: Poppins; font-size: 10px; font-weight: 400; text-transform: uppercase;">
                                        {{ formatDate(post.date) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="carousel-section"
                style="max-width: 1300px; margin: 80px auto 0; position: relative; overflow: hidden;">
                <q-carousel v-model="slide" animated infinite class="custom-carousel" :arrows="false"
                    :navigation="false">
                    <q-carousel-slide v-for="(post, index) in posts.slice(3, 6)" :key="post.id" :name="index"
                        class="carousel-slide" style="padding: 0;">
                        <div class="carousel-item" style="position: relative; width: 100%; height: 100%;">
                            <img v-if="post.media_url" :src="post.media_url" :alt="post.title.rendered"
                                class="carousel-image" style=" width: 1300px; height: 669px; object-fit: cover;">
                            <div class="carousel-overlay"
                                style=" position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);">
                            </div>
                            <div class="carousel-content"
                                style="position: absolute; bottom: 40px; left: 0; right: 0; color: white; z-index: 2; text-align: center; padding: 0px 40px 16px;">
                                <h2 class="carousel-title" v-html="post.title.rendered"
                                    style="font-family: 'Poppins'; font-size: 46.386px; font-weight: 700; margin-bottom: 15px; text-transform: none; margin: 0;">
                                </h2>
                                <div class="carousel-excerpt" v-html="post.excerpt.rendered"></div>
                            </div>
                        </div>
                    </q-carousel-slide>

                    <template v-slot:control>
                        <q-carousel-control position="left" class="carousel-arrow left-arrow">
                            <q-btn flat round dense icon="chevron_left" @click="slide = (slide - 1 + 3) % 3"
                                class="arrow-btn" />
                        </q-carousel-control>
                        <q-carousel-control position="right" class="carousel-arrow right-arrow">
                            <q-btn flat round dense icon="chevron_right" @click="slide = (slide + 1) % 3"
                                class="arrow-btn" />
                        </q-carousel-control>
                    </template>
                </q-carousel>
            </div>

            <div class="mixed-section" style="max-width: 1300px; margin: 80px auto 0;">
                <div class="mixed-container" style="display: flex;">
                    <div class="mixed-content" style="flex: 1;">
                        <div class="text-content" v-if="!loading && currentFeaturedPost">
                            <h3 class="mixed-post-title" v-html="currentFeaturedPost.title.rendered"
                                style="font-family: Poppins; font-size: 92.966px; font-weight: 700; line-height: 1.2; margin-bottom: 20px; margin-right: 5%;">
                            </h3>
                            <div class="mixed-post-excerpt" v-html="currentFeaturedPost.excerpt.rendered"
                                style="font-family: Poppins; font-size: 23px; font-style: normal; font-weight: 400; line-height: 38.736px; margin-bottom: 20px; margin-right: 5%; ">
                            </div>
                        </div>
                    </div>

                    <div class="image-carousel-wrapper" style="min-width: 0;">
                        <q-carousel v-model="currentImageIndex" animated infinite class="image-carousel" arrows
                            :navigation="false" height="auto" style="max-width: 600px;">
                            <q-carousel-slide v-for="(post, index) in posts.slice(7, 10)" :key="post.id" :name="index"
                                class="image-slide" style="padding: 0;">
                                <img v-if="post.media_url" :src="post.media_url" :alt="post.title.rendered"
                                    class="carousel-image-only"
                                    style="width: 518px; height: 669px; border-radius: 8px; object-fit: cover;">
                            </q-carousel-slide>
                        </q-carousel>
                    </div>
                </div>
            </div>

            <div class="columns-section" style="max-width: 1300px; margin: 80px auto 0;">
                <div class="columns-container" style="display: flex; gap: 111px;">
                    <!-- Coluna esquerda -->
                    <div class="second-column">
                        <div v-for="post in getPostsForColumn(0, 2)" :key="post.id" class="vertical-post"
                            style="margin-bottom: 40px;">
                            <img v-if="post.media_url" :src="post.media_url" :alt="post.title.rendered"
                                class="post-image-vertical"
                                style="width: 620px; height: 495px; object-fit: cover; border-radius: 4px; margin-bottom: 20px;">
                            <div class="post-content-vertical">
                                <h3 class="post-title-vertical" v-html="post.title.rendered"
                                    style="font-family: Poppins; font-size: 47.344px; font-weight: 700; margin-bottom: 15px; margin: 0">
                                </h3>
                                <div class="post-excerpt-vertical" v-html="post.excerpt.rendered"
                                    style="font-family: Poppins; font-size: 23px; line-height: 1.5; margin-bottom: 77px; margin-top: 12px;">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Coluna direita -->
                    <div class="first-column" style="flex: 1;">
                        <div v-for="post in getPostsForColumn(2, 3)" :key="post.id" class="horizontal-post"
                            style="display: flex; gap: 20px; margin-bottom: 40px;">
                            <img v-if="post.media_url" :src="post.media_url" :alt="post.title.rendered"
                                class="post-image-horizontal"
                                style="width: 219px; height: 416px; object-fit: cover; border-radius: 4px;">
                            <div class="post-content-horizontal">
                                <h3 class="post-title-horizontal" v-html="post.title.rendered"
                                    style="font-family: Poppins; font-size: 19.496px; line-height: 25px; font-weight: 400; margin-bottom: 10px; text-transform: uppercase; margin: 0;">
                                </h3>
                                <div class="post-excerpt-horizontal" v-html="post.excerpt.rendered"
                                    style="font-family: Poppins; font-size: 30.796px; font-weight: 700; line-height: 35.534px; margin-bottom: 10px;">
                                </div>
                                <div class="post-date-horizontal" style="font-family: Poppins; font-size: 12px;">
                                    {{ formatDate(post.date) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<style lang="scss" scoped>
.post-title {
    color: $title-post;
}

.post-excerpt {
    color: $button-dark;
}

.post-date {
    color: $very-ligth-grey;
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

.carousel-excerpt {
    text-align: center;
    font-family: Poppins;
    font-size: 29.326px;
    font-style: normal;
    font-weight: 400;
    line-height: 31.829px;
    margin: 0 20%;

    :deep(p) {
        margin: 0;
        color: rgba(255, 255, 255, 0.9);
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
    }
}

.left-arrow {
    left: 20px;
}

.right-arrow {
    right: 20px;
}

/* Loading State */
.carousel-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
}

:deep(.q-carousel__navigation) {
    bottom: 10px;
    padding: 0 40px 10px;
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

.mixed-post-title {
    color: $primary-dark;
}

.mixed-post-excerpt {
    color: $middle-grey;
}

.post-title-horizontal {
    color: $title-post;
}

.post-excerpt-horizontal {
    color: $primary-dark;
}

.post-date-horizontal {
    color: $very-ligth-grey;
}
</style>