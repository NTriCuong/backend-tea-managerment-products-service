import express from 'express' //sử dụng cú pháp import thay vì require do đã khai báo "type": "module" trong package.json
import morgan from 'morgan' //import morgan để log các request HTTP
import productRouter from './routers/productRouter.js' //import router sản phẩm
import toppingRouter from './routers/toppingRouter.js' //import router topping
import categoryRouter from './routers/categoryRouter.js' //import router danh mục
import bodyParser from 'body-parser'

const app = express() // thực thi express và nó sẻ trả về 1 đối tượng app 
// đối tượng này với những phương thức để xây dựng ứng dụng web
app.use(morgan('combined')) // xử dụng để xem log của resquest HTTP
app.use(bodyParser.urlencoded({ extended: false })) // Sử dụng body-parser để phân tích cú pháp URL-encoded trong các yêu cầu đến
app.use(bodyParser.json()) // Sử dụng body-parser để phân tích cú pháp JSON trong các yêu cầu đến

app.use('/products/', productRouter) // sử dụng router sản phẩm với tiền tố là /product
app.use('/toppings/', toppingRouter) // sử dụng router topping với tiền tố là /topping
app.use('/categories/', categoryRouter) // sử dụng router danh mục với tiền tố là /category

app.listen(3001,()=>{
    console.log('Product service is running on localhost:3001');
}); // lắng nghe cổng 3001
