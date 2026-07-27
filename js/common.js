Vue.component('header-component', {
    props: {
        isNavOpen: Boolean,
        menuLinks: Array,
    },
    template: `
<header class="header" :class="{ 'open': isNavOpen }">
<div class="container">
<h1 class="header-logo">
<a href="index.html"><img src="./images/logo_gray.svg" alt="Mie Togo Portfolio" class="logo"></a>
</h1>
<nav class="nav">
<ul class="nav-list">
    <li v-for="menu in menuLinks" :key="menu.title" class="nav-item">
        <a :href="menu.path" @click="isNavOpen = false">{{menu.title}}</a>
    </li>
</ul>
</nav>
<button type="button" @click="$emit('toggle-nav')" :class="{ 'is-active': isNavOpen }" class="hamburger" aria-label="メニューを開く">
        <span class="line line1"></span>
        <span class="line line2"></span>
        <span class="line line3"></span>
</button>
</div>
</header>
`,
});

Vue.component('item-card', {
    props: {
        items: Array,
    },
    data() {
        return {
            selectedItem: null,
            isModalOpen: false,
        };
    },
    methods: {
        openModal(item) {
            this.selectedItem = item;
            this.isModalOpen = true;
            this.$nextTick(() => {
                // ブラウザ標準の <dialog> を表示
                this.$refs.dialog.showModal();
            });
        },
        closeModal() {
            this.$refs.dialog.close();
            this.selectedItem = null;
        },
        getCategoryLabel(cat) {
            return Array.isArray(cat) ? cat.join(', ') : cat;
        },
    },
    template: `
    <div class="works-list">
    <a href="#" class="works-item" v-for="item in items" :key="item.id" @click.prevent="openModal(item)">
        <div class="works-img">
            <img :src="'./images/' + item.img" :alt="item.title">
        </div>
        <div class="works-body">
            <p>{{ item.title }}</p>
            <ul class="tech-list">
                    <template v-if="Array.isArray(item.category)">
                        <li v-for="tech in item.category" :key="tech" class="tech-tag">{{ tech }}</li>
                    </template>
                    <template v-else>
                        <li class="tech-tag">{{ item.category }}</li>
                    </template>
                </ul>
        </div>
    </a>
  <dialog class="works-modal" ref="dialog">
        <div class="works-modal__inner" v-if="selectedItem">
            <button type="button" class="works-modal__close" aria-label="Close" @click="closeModal">✕</button>
            <div class="works-img">
                <img :src="'./images/' + selectedItem.img" :alt="selectedItem.title">
            </div>
            <div class="works-modal__content">
                <h2 class="works-modal__title">{{ selectedItem.title }}</h2>  
                <div class="tech-container">
                    <span class="tech-tag">{{ getCategoryLabel(selectedItem.category) }}</span>
                </div>
                <p class="works-modal__description" style="margin-top: 15px;">{{ selectedItem.description }}</p>
                <ul class="works-modal__link">   
                <li class="btn-link"><a :href="selectedItem.url" target="_blank">URL→</a></li>
                <li class="btn-link"><a :href="selectedItem.github" target="_blank">GitHub→</a></li>
                </ul>
            </div>
        </div>
    </dialog>
</div>
</div>
    `,
});


new Vue({
    el: '#app',
    data() {
        return {
            isNavOpen: false,
            site: [],
            itemList: [],
            selectedItem: null,
            isModalOpen: false,
        }
    },
    methods: {
        toggleNav() {
            this.isNavOpen = !this.isNavOpen;
        },
        navigate(path) {
            this.isNavOpen = false;
            setTimeout(() => {
                window.location.href = path;
            }, 300);
                },
            },
    async created() {
        try {
            const response = await fetch('./data/works.json');
            console.log(response);
            if (!response.ok) {
                throw new Error('作品データの取得に失敗しました。');
            }
            const data = await response.json();
            this.itemList = data.works ? data.works : data;
            console.log('data.works', this.itemList);
        } catch (e) {
            console.error(e);
        }
        try {
            const response = await fetch('./data/site.json');
            console.log(response);
            if (!response.ok) {
                throw new Error('サイトデータの取得に失敗しました。');
            }
            const data = await response.json();
            this.site = data;
        } catch (e) {
            console.error(e);
        }
    },
    computed: {
        headerMenu() {
            return this.site;
        },
        sortedItemList() {
            return [...this.itemList].sort((a, b) => {
            // 日付を比較して新しい順（降順）にする
            return new Date(b.date) - new Date(a.date);
            });
        },
    },
});
