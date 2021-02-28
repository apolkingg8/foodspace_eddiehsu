import Product from "./Product";

describe("Product", ()=> {

    test("constructor()", async ()=> {
        expect(new Product({})).toBeInstanceOf(Product)
    })

    test("constructor() with props", async ()=> {
        let prod1 = new Product({
            id: '1',
            name: '1',
            pricing: 1,
            discount: 1,
        })

        expect(prod1.id).toEqual('1')
        expect(prod1.name).toEqual('1')
        expect(prod1.pricing).toEqual(1)
        expect(prod1.discount).toEqual(1)
        expect(prod1.appliedDiscountIds).toEqual([])
    })
})
