<template>
  <van-cell-group>
    <van-cell
      icon="search"
      :key="index"
      v-for="(item, index) in suggestions"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </van-cell-group>
</template>

<script>
import { debounce } from 'lodash'
import { getSuggestions } from '@/api/search'

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    q: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想数据
    }
  },
  computed: {},
  watch: {
    q: {
      handler: debounce(async function () {
        const q = this.q
        if (!q) {
          return
        }
        const { data } = await getSuggestions(q)
        this.suggestions = data.data.options
      }, 1000),
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    // 搜索关键字，高亮处理
    highlight (str) {
      return str.toLowerCase().replace(
        this.q.toLowerCase(),
        `<span style="color: red;">${this.q}</span>`
      )
    }
  }
}
</script>

<style scoped></style>
