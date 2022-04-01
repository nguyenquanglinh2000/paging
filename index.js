// const arr1 = ['o', 'k', 'e']
// const arr2 = ['e', 'k', 'o']

// function check (arr1, arr2) {
//   let cout1 = 0
//   let cout2 = 0
//   let result = 0
//   const temp = []
//   arr1.forEach((e) => {
//     cout1 = cout1 + 1
//   })
//   arr2.forEach((e) => {
//     cout2 = cout2 + 1
//   })

//   if (cout1 === cout2) {
//     let cout = cout1
//     arr2.forEach((e) => {
//       temp[cout - 1] = e
//       cout--
//     })
//     arr1.forEach((e, index) => {
//       if (e === temp[index]) {
//         result += 1
//       }
//     })
//     if (result === cout1) {
//       return true
//     } else {
//       return false
//     }
//   }
// }
// console.log(check(arr1, arr2))
// function swap (arr1, arr2, idx) {
//   let temp = null
//   let num = 0
//   let num2 = 0
//   arr1.forEach((e) => {
//     num += 1
//   })
//   arr2.forEach((e) => {
//     num2 += 1
//   })
//   if (idx < num && idx < num2) {
//     temp = arr1[idx]
//     arr1[idx] = arr2[idx]
//     arr2[idx] = temp
//     return { arr1, arr2 }
//   } else {
//     return 'Index khong dung'
//   }
// }
// const arr1 = ['a', 'b', 'c', 'd']
// const arr2 = ['e', 'f', 'g', 'h', 'k']
// console.log(swap(arr1, arr2, 3))

function check (arr) {
  console.log(typeof arr)
  const temp = {}
  arr.forEach((e) => {
    temp[e] = 0
  })
  arr.forEach((e) => {
    temp[e] += 1
  })
  return temp
}
const arr = [5, 8, 1, 4, 9, 0, 5, 1, 7, 4, 2, 1, 7, 0]
console.log(check(arr))
