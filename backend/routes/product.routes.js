import express from "express" ;
import { deleteProduct, getProducts, postProducts, updateProduct } from "../controller/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/",postProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


export default router;
