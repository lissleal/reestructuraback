export async function getCarts(req, res) {
    try {
        let carts = await cartModel.find();
        res.send({ result: "success", payload: carts })
    }
    catch (error) {
        console.log("Cannot get carts with mongoose: ", error);
    }
}

//Obtiene carrito con sus productos
export async function getCart(req, res) {
    const cartId = req.params.cid;

    try {
        const cart = await cartModel.findById(cartId).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.json(cart);
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
}

export async function createCart(req, res) {
    let { name, description, products } = req.body;

    if (!name || !description || !products) {
        return res.send({ status: "error", error: "Incomplete values" })
    }
    let result = await cartModel.create({
        name,
        description,
        products
    })
    res.send({ result: "success", payload: result })
}

//Actualiza carrito

export async function updateCart(req, res) {
    let { cid } = req.params;
    let cartToReplace = req.body;
    if (!cartToReplace.name || !cartToReplace.description || !cartToReplace.products) {
        return res.send({ status: "error", error: "Incomplete values" })
    }
    let result = await cartModel.updateOne({ _id: cid }, cartToReplace);
    res.send({ result: "success", payload: result })
}

//Elimina carrito
export async function deleteCart(req, res) {
    let { cid } = req.params;
    let result = await cartModel.deleteOne({ _id: cid });
    res.send({ result: "success", payload: result })
}

//Productos dentro del carrito
export async function getProductsInCart(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    try {
        const result = await carts.existProductInCart(cartId, productId);
        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
}

//Agrega producto al carrito
export async function addProductInCart(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    try {
        const result = await carts.addProductInCart(cartId, productId);
        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
}

//Actualiza cantidad de productos 
export async function updateQuantityOfProduct(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const newQuantity = req.body.quantity;

    try {
        const result = await carts.updateQuantityOfProduct(cartId, productId, newQuantity);
        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
}

//Elimina del carrito el producto seleccionado
export async function deleteProductInCart(req, res) {
    let cartId = req.params.cid;
    let productId = req.params.pid;

    try {
        const result = await carts.deleteProductInCart(cartId, productId);
        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }

}

