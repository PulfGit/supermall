<template>
  <div class="wapper" ref="aaa">

    <ul class="content">
      <li>column1</li>
      <li>column2</li>
      <li>column3</li>
      <li>column4</li>
      <li>column5</li>
      <li>column6</li>
      <li>column7</li>
      <li>column8</li>
      <li>column9</li>
      <li>column10</li>
      <li>column11</li>
      <li>column12</li>
      <li>column13</li>
      <li>column14</li>
      <li>column15</li>
      <li>column16</li>
      <li>column17</li>
      <li>column18</li>
      <li>column19</li>
      <li>column20</li>
      <li>column21</li>
      <li>column22</li>
      <li>column23</li>
      <li>column24</li>
      <li>column25</li>
      <li>column26</li>
      <li>column27</li>
      <li>column28</li>
      <li>column29</li>
      <li>column30</li>
      <li>column31</li>
      <li>column32</li>
      <li>column33</li>
      <li>column34</li>
      <li>column35</li>
      <li>column36</li>
      <li>column37</li>
      <li>column38</li>
      <li>column39</li>
      <li>column40</li>
      <li>column41</li>
      <li>column42</li>
      <li>column43</li>
      <li>column44</li>
      <li>column45</li>
      <li>column46</li>
      <li>column47</li>
      <li>column48</li>
      <li>column49</li>
      <li>column50</li>
      <li>column51</li>
      <li>column52</li>
      <li>column53</li>
      <li>column54</li>
      <li>column55</li>
      <li>column56</li>
      <li>column57</li>
      <li>column58</li>
      <li>column59</li>
      <li>column60</li>
      <li>column61</li>
      <li>column62</li>
      <li>column63</li>
      <li>column64</li>
      <li>column65</li>
      <li>column66</li>
      <li>column67</li>
      <li>column68</li>
      <li>column69</li>
      <li>column70</li>
      <li>column71</li>
      <li>column72</li>
      <li>column73</li>
      <li>column74</li>
      <li>column75</li>
      <li>column76</li>
      <li>column77</li>
      <li>column78</li>
      <li>column79</li>
      <li>column80</li>
      <li>column81</li>
      <li>column82</li>
      <li>column83</li>
      <li>column84</li>
      <li>column85</li>
      <li>column86</li>
      <li>column87</li>
      <li>column88</li>
      <li>column89</li>
      <li>column90</li>
      <li>column91</li>
      <li>column92</li>
      <li>column93</li>
      <li>column94</li>
      <li>column95</li>
      <li>column96</li>
      <li>column97</li>
      <li>column98</li>
      <li>column99</li>
      <li>column100</li>
    </ul>


  </div>
</template>

<script>
  import BScroll from 'better-scroll'


  export default {
    name: "Category",
    data() {
      return {
        scroll: null
      }
    },
    // 不能在create()声明周期里进行标签获取,因为组件建好后template还没完成挂载
    // mounted()的生命周期是渲染的时候,template中的内容已经完成了挂载
    mounted() {
      // console.log(this.$refs.aaa)
      // console.log(document.querySelector('.wapper'))

      // 创建一个better-scroll的实例,并保存
      this.scroll = new BScroll(document.querySelector('.wapper'), {
        probeType: 3,      // 开启位置监听
        pullUpLoad: true   // 开启上拉到底提示
        // scrollY: true,
        // wheel: true,

      })
      // 捕获sroll的位置,并打印
      // this.scroll.on('scroll', position => {
      //   console.log(position);
      // })

      // 捕获scroll是否拉到底了,并打印
      this.scroll.on('pullingUp', ()=>{
        console.log('上拉加载更多')
      })

    }
  }
</script>

<style scoped>
  .wapper {
    height: 250px;
    background-color: plum;

    overflow: hidden;

    /*vue原生的scroll,在手持端时据说会卡*/
    /*overflow-y: scroll;*/
  }

</style>
