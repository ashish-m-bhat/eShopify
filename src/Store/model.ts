
export interface Product {
    id: number;
    category: string
    description: string,
    image: string,
    price: number,
    title: string,
    rating: {
        count: number,
        rate: number,
    },
}

export interface CartItem {
    id: number;
    title: string;
    email: string;
    price: number;
    image: string;
    href: string;
    count: number;
    removeItemCompletely?: boolean;
}

export interface OrderItem {
    count: number;
    email: string;
    title: string;
    id: number;
    totalItemPrice: number;
    totalBill?: number // If there are multiple items in an order, totalBill is added to the 1st item in the cart
}

