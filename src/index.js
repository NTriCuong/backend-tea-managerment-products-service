import express from 'express' //sử dụng cú pháp import thay vì require do đã khai báo "type": "module" trong package.json

const app = express() // thực thi express và nó sẻ trả về 1 đối tượng app 
// đối tượng này với những phương thức để xây dựng ứng dụng web
const port = 3000

//route cơ bản khi truy cập vào localhost:3000 thì server sẻ trả về chuỗi 'Hello World!'
app.get('/', (req, res) => { //nhận vào "/" route và 1 funtion
  res.send('Hello World!')
})

app.listen(port, () => {// lắng nghe port 3000 và in ra thông báo khi server đã chạy
  console.log(`Example app listening on port ${port}`)
})
