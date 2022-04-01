<template>
  <div class="sommer-createProduct">
    <h1>Create Product</h1>
    <v-row class="sommer-detail">
      <v-col cols="6" class="sommer-image">
        <v-img :src="url" :lazy-src="lazyImage" max-height="400" max-width="600" />
        <input ref="file" type="file" hidden @change="handleUpload">
        <v-btn class="mt-10" outlined @click="$refs.file.click()">
          <v-icon>mdi-camera</v-icon>
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
          v-if="!alert"
          :disabled="url === '' "
          @click="addProduct(
                    {
                      name: listDetail[0].value,
                      price: listDetail[1].value,
                      amount: listDetail[2].value,
                      made: valueThuongHieu,
                      image: url
                    }
                  ),
                  alert = true,
                  listDetail[0].value = '',
                  listDetail[1].value = '',
                  listDetail[2].value = '',
                  valueThuongHieu = ''
                  clearUrl()"
        >
          Lưu
        </v-btn>
        <v-sheet>
          <v-alert
            v-model="alert"
            outlined
            type="success"
            text
            dismissible
          >
            Add Product Success
          </v-alert>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      listDetail: [
        {
          title: 'Tên Sản Phẩm',
          value: '',
          type: 'text'
        },
        {
          title: 'Giá Bán',
          value: '',
          type: 'number'
        },
        {
          title: 'Số Lượng Sản Phẩm',
          value: '',
          type: 'number'
        }
      ],
      made: [
        'ELISE',
        'VASCARA',
        'JUNO',
        'GUMAC'
      ],
      alert: false,
      urlCom: '',
      valueThuongHieu: '',
      fileImage: '',
      lazyImage: 'https://firebasestorage.googleapis.com/v0/b/hand-1e0c4.appspot.com/o/images%2Fdefault-image%20.jpeg?alt=media&token=5e8922c0-cbf6-4681-b407-56718963bfe6'
    }
  },
  computed: {
    ...mapState('product', ['url'])
  },
  watch: {
  },
  methods: {
    ...mapActions('product', ['addProduct', 'getProduct', 'upLoadImage', 'clearUrl']),
    handleUpload (e) {
      this.fileImage = e.target.files[0]
      this.$store.dispatch('product/upLoadImage', this.fileImage)
    }
  }
}
</script>
<style scoped>
.sommer-image {
  text-align: center;
}
.sommer-detail{
  margin-top: 50px;
}

</style>
