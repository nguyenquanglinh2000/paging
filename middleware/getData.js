export default ({ store }) => {
  console.log('Midd')
  store.dispatch('product/getProduct')
  store.dispatch('product/getDataPaging')
}
