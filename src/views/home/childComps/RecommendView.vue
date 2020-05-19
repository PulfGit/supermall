<template>
  <div class="recommend">
    <div v-for="item in recommands" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommands:{
        type: Array,
        default(){
          return []
        }

      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 14px;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;

  }

  .recommend-item img {
    width: 85px;
    height: 85px;
    margin-bottom: 8px;

  }

</style>
