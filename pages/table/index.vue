<template>
  <div class="sommer-tableProduct">
    <v-simple-table
      fixed-header
      height="800"
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
            <td><v-img src="https://s3.amazonaws.com/coursesity-blog/2020/05/6.png" max-width="200" width="100" /></td>
            <td>{{ item.name }}</td>
            <td>{{ item.made }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.calories }}</td>
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

    <!-- paging -->
    <div class="paging">
      <v-row>
        <v-col cols="4" offset-sm="4">
          <v-pagination
            v-model="page"
            class="my-4"
            :length="10"
          />
        </v-col>
      </v-row>
    </div>
    <v-btn @click="getDataPaging(page)">
      Paging
    </v-btn>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'TableProduct',
  data () {
    return {
      page: 1
    }
  },
  computed: {
    ...mapState('product', ['listProduct', 'pagingData'])
  },
  watch: {
    page (newValue) {
      this.$store.dispatch('product/getDataPaging', newValue)
    }
  },
  created () {
  },
  mounted () {
    console.log('mounted')
    this.$store.dispatch('product/getProduct')
    this.$store.dispatch('product/getDataPaging', this.page)
  },
  methods: {
    ...mapActions('product', ['getProduct', 'getDataPaging'])
  }

}
</script>
<style scoped>
</style>
