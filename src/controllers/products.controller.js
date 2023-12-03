import ProductService from '../services/ProductService.js';
const productService = new ProductService();

export async function getProductsController(req, res) {

    try {
        if (!req.session.email) {
            res.redirect("/login")
        }

        let allProducts = await productService.getProducts();
        allProducts = allProducts.map(product => product.toJSON())
        const userData = {
            name: req.session.name,
            surname: req.session.surname,
            email: req.session.email,
            role: req.session.role
        }

        res.render("home", {
            title: "Segunda Pre Entrega",
            products: allProducts,
            user: userData

        })
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}



export async function getProductById(req, res) {
    try {
        const prodId = req.params.pid;
        const prod = await productService.getProductById(prodId);
        const productDetail = prod.toObject();
        res.render("prod", {
            title: "Detalle de Producto",
            product: productDetail
        })
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto 2' });
    }
}

export async function createProduct(req, res) {
    let {
        name, description, price, category, stock, thumbnail } = req.body;

    if (!name || !description || !price || !category || !stock || !thumbnail) {
        return res.send({ status: "error", error: "Incomplete values" })
    }
    let result = await productModel.create({
        name,
        description,
        price,
        category,
        stock,
        thumbnail
    })
    res.send({ result: "success", payload: result })
}

export async function updateProduct(req, res) {
    let { pid } = req.params;
    let productToReplace = req.body;
    if (!productToReplace.name || !productToReplace.description || !productToReplace.price || !productToReplace.category || !productToReplace.stock || !productToReplace.thumbnail) {
        return res.send({ status: "error", error: "Incomplete values" })
    }
    let result = await productModel.updateOne({ _id: pid }, productToReplace);
    res.send({ result: "success", payload: result })
}

export async function deleteProduct(req, res) {
    let { pid } = req.params;
    let result = await productModel.deleteOne({ _id: pid });
    res.send({ result: "success", payload: result })
}

export async function getProductByLimit(req, res) {
    let limit = parseInt(req.params.limit)
    if (isNaN(limit) || limit <= 0) {
        limit = 10
    } res.send(await getProductByLimit(limit))
}

export async function getProductByPage(req, res) {
    let page = parseInt(req.params.page)
    if (isNaN(page) || page <= 0) {
        page = 1
    }
    const productsPerPage = 1
    res.send(await getProductByPage(page, productsPerPage))
}

export async function getProductByQuery(req, res) {
    let query = req.params.query
    res.send(await getProductByQuery(query))
}

