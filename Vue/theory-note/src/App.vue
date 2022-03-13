<template>
  <div id="app">
    <h1>Routing</h1>
    <first-component />
    <router-view></router-view>
    <h1>{{title}}</h1>

    <ul>

      <list-item
      v-for="post in posts"
      :key="post.id"
      :text="post.text" 
      :icon="post.icon"/>
      <!-- <list-item :text="posts[1].text" :icon="posts[1].icon"/>
      <list-item :text="posts[2].text" :icon="posts[2].icon"/>
      <list-item text="текст четвертый" icon="user.png"/> -->
    </ul>
    <span class="total">Всего строк: {{totalCount}}</span>
  </div>
</template>

<script>
import FirstComponent from './components/FirstComponent'
import ListItem from '@/components/ListItem'

import { v4 as uuidv4 } from 'uuid';



export default {
  components: {FirstComponent, ListItem},

  data() {
    return {
      title: 'Data, Computed',
      posts: [
        {
          id: 0,
          text: 'текст первый',
          icon: 'setting.png',
          checked: true
        },
        {
          id: 1,
          text: 'текст второй',
          icon: 'user.png',
          checked: false
        },
        {
          id: 2,
          text: 'текст третий',
          icon: 'phone.png',
          checked: false
        },
      ],
    };
  },
  computed: {
    totalCount() {
      return this.posts.length + ' stuffs'
    }
  }
};
</script>
<style lang="scss">
ul {
  list-style: none;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    img {
      margin-right: 10px;
    }

    &:hover {
      color: rgb(48, 19, 177);
    }

    &.checked {
      color: red;
    }
  }
}

.total {
  padding-left: 40px;
}

</style>



