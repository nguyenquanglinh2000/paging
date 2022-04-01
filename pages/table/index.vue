<template>
  <div class="sommer-tableProduct">
    <div class="sommer-table">
      <v-simple-table
        fixed-header
        height="400"
      >
        <template #default>
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên Sản Phẩm</th>
              <th>Thương Hiệu</th>
              <th>Giá bán</th>
              <th>Tồn Kho</th>
              <th>Trạng Thái</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in pagingData" :key="index">
              <td><v-img :src="item.image" max-width="200" width="100" /></td>
              <td>{{ item.name }}</td>
              <td>{{ item.made }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.amount }}</td>
              <td>{{ item.status }}</td>
              <td>
                <v-btn>
                  <v-icon color="blue">
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn>
                  <v-icon color="red">
                    mdi-delete
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-card v-if="loading" flat class="sommer-loading">
        <v-layout justify-center align-center fill-height>
          <v-progress-circular
            :size="70"
            :width="7"
            color="pink"
            indeterminate
          />
        </v-layout>
      </v-card>

      <!-- paging -->
      <div v-if="maxPaging !== 1" class="paging">
        <v-row>
          <v-col cols="4" offset-sm="4">
            <v-pagination
              v-model="page"
              class="my-4"
              :length="maxPaging"
            />
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- <v-btn @click="previousPage">
      Previous
    </v-btn>
    <v-btn @click="nextPage">
      Next
    </v-btn> -->
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'TableProduct',
  loading: true,
  // middleware: 'getData',
  data () {
    return {
      page: 1,
      loading: true
    }
  },
  computed: {
    ...mapState('product', ['pagingData', 'maxPaging']),
    ...mapGetters('product', ['numPaging'])
  },
  watch: {
    page (newValue) {
      this.loading = true
      this.$store.dispatch('product/getDataPaging', newValue)
    },
    pagingData () {
      this.loading = false
    }
  },
  created () {
    this.$store.dispatch('product/getDataPaging', this.page)
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start()
    //   setTimeout(() => this.$nuxt.$loading.finish(), 500)
    // })
  },
  methods: {
    ...mapActions('product', ['getDataPaging'])
  }

}
</script>
<style scoped>
html{
  position: relative;
}
.sommer-loading{
  width: 90%;
  position: absolute;
  z-index: 1;
  text-align: center;
}
</style>
