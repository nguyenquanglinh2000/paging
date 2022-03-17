<template>
  <div class="sommer-createProduct">
    <h1>Create Product</h1>
    <v-row>
      <v-col cols="6" class="image">
        <v-img :src="image" max-height="300" max-width="500" />
        <v-btn class="ml-10">
          <v-icon color="black">
            mdi-camera
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="6">
        <div v-for="(item, index) in listDetail" :key="index" class="sommer-addProduct">
          <label>{{ item.title }} </label>
          <v-text-field v-model="item.value" outlined />
        </div>
        <v-autocomplete
          v-model="valueThuongHieu"
          :items="made"
          outlined
          label="Thương Hiệu"
        />
        <v-btn
          @click="addProduct(
            {
              name: listDetail[0].value,
              price: listDetail[1].value,
              idProduct: listDetail[2].value,
              made: valueThuongHieu
            }
          )"
        >
          Lưu
        </v-btn>
        <v-btn @click="getProduct">
          getProduct
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Camera_Icon.jpg',
      listDetail: [
        {
          title: 'Tên Sản Phẩm',
          value: ''
        },
        {
          title: 'Giá Bán',
          value: ''
        },
        {
          title: 'Mã Sản Phẩm',
          value: ''
        }
      ],
      made: [
        'Abc',
        'cdr',
        'yut',
        'poi'
      ],
      valueThuongHieu: ''
    }
  },
  methods: {
    ...mapActions('product', ['addProduct', 'getProduct'])
  }
}
</script>
<style scoped>
.image {
  display: flex;
  justify-content: center;
}

</style>
